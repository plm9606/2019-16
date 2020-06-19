const mongoose = require("mongoose");
const App = require("../../lib/tcp/App");
const {
  filterStudyGroup,
  addReservation,
  findByGroupId,
  getHistoriesByIds
} = require("./query/queries");

const { RESERVATIONS_MONGO_URL } = process.env;

mongoose
  .connect(RESERVATIONS_MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Rservation mongoDB is connected");
  })
  .catch((err) => {
    console.log("Rservation mongoDB connection fail", err);
  });

const queryMap = {
  filterStudyGroup,
  addReservation,
  findByGroupId,
  getHistoriesByIds
};

async function doJob(socket, data) {
  const { params, nextQuery } = data;
  let headers;
  let body;
  let appClient;

  try {
    let result = await queryMap[nextQuery].call(this, params);

    headers = result.headers;
    body = result.body;
    appClient = result.appClient ? result.appClient : {};
  } catch (e) {
    headers = {
      method: "ERROR",
      curQuery: nextQuery,
      nextQuery: "gateway",
      endQuery: "gateway",
      params: {}
    };
    body = e;
  } finally {
    const replyData = {
      ...data,
      ...headers,
      body,
      info: this.context
    };

    // if (replyData.nextQuery === "removeInQueue")
    //   appClient = this.appClients.payment;
    this.send(appClient, replyData);
  }
}

class Reservation extends App {
  constructor(name, host, port) {
    super(name, host, port, doJob);
  }
}
module.exports = Reservation;
