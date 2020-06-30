const App = require("../../lib/tcp/App");
const {
  availableRooms,
  getRoomById,
  searchNearbyRooms
} = require("./queryResolver");

const queryMap = { availableRooms, getRoomById, searchNearbyRooms };

async function jobEexcutor(_socket, data) {
  let socket = {};
  const { params, nextQuery } = data;
  let queryResult;

  try {
    queryResult = await queryMap[nextQuery].call(this, nextQuery, params);
  } catch (error) {
    queryResult.packet = { method: "ERROR", body: { error } };
  } finally {
    if (queryResult.socket) {
      socket = queryResult.socket;
    }
    this.send(socket, {
      ...data,
      ...queryResult.packet
    });
  }
}

class StudyRoom extends App {
  constructor(name, host, port) {
    super(name, host, port, jobEexcutor);
  }
}

module.exports = StudyRoom;
