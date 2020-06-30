const Reservations = require("../model/reservations");
const moment = require("moment");
const ObjectId = require("mongoose").Types.ObjectId;

exports.filterStudyGroup = async function ({ studyGroup, studyRooms }) {
  const orArray = studyGroup.dates.reduce((acc, date) => {
    acc.push({
      dates: {
        $elemMatch: {
          start: {
            $lt: date.end
          },
          end: {
            $gt: date.start
          },
          date: moment(date.date).toISOString()
        }
      }
    });

    return acc;
  }, []);

  const query = { $or: orArray };

  const reservatedInfo = await Reservations.find(query);

  const reservatedId = reservatedInfo.map((info) => info.studyRoom.id);
  const filterdRooms = studyRooms.filter(
    (room) => !reservatedId.includes(room._id)
  );

  return {
    headers: {
      method: "REPLY",
      curQuery: "filterStudyGroup",
      nextQuery: "apigateway",
      params: {}
    },
    body: filterdRooms.slice(0, 50)
  };
};

exports.addReservation = async function ({ reservationInfo, userId }) {
  // 데이터베이스에 저장
  const reservationId = await Reservations.create({
    studyGroup: reservationInfo.studyGroupInfo,
    studyRoom: reservationInfo.studyRoomInfo,
    dates: reservationInfo.dates
  });

  return {
    headers: {
      method: "PUT",
      curQuery: "addReservation",
      nextQuery: "updateGroupReserved",
      params: {
        reservationId,
        studyGroupId: reservationInfo.studyGroupInfo._id,
        isReserved: true
      }
    },
    body: {},
    appClient: this.appClients.studygroup
  };
};

exports.findByGroupId = async function ({ groupId }) {
  const query = { "studyGroup._id": new ObjectId(groupId) };
  const groupReservation = await Reservations.find(query);

  return {
    headers: {
      method: "REPLY",
      curQuery: "findByGroupId",
      nextQuery: "apigateway",
      params: {}
    },
    body: groupReservation
  };
};

exports.getHistoriesByIds = async function ({ groups }) {
  const res = await Reservations.aggregate([
    {
      $match: {
        "studyGroup._id": {
          $in: groups.map((id) => new ObjectId(id))
        }
      }
    },
    {
      $set: {
        start: { $arrayElemAt: ["$dates", 0] },
        end: { $arrayElemAt: ["$dates", -1] }
      }
    },
    {
      $project: {
        "studyGroup._id": 1,
        "studyGroup.title": 1,
        "studyRoom.location": 1,
        "studyGroup.thumbnail": 1,
        "studyGroup.leader": 1,
        startDate: "$start.date",
        endDate: "$end.date",
        startTime: "$start.start",
        endTime: "$start.end"
      }
    },
    { $sort: { startDate: -1 } }
  ]).exec();

  return {
    headers: {
      method: "REPLY",
      curQuery: "getHistoriesByIds",
      nextQuery: "apigateway",
      params: {}
    },
    body: { history: res }
  };
};

exports.deleteByGroupId = async function ({ groupId, leader, members }) {
  const res = await Reservations.deleteOne({
    "studyGroup._id": new ObjectId(groupId)
  });

  if (res.ok === 1)
    return {
      headers: {
        method: "PUT",
        curQuery: "deleteByGroupId",
        nextQuery: "toggleReserved",
        params: {
          groupId,
          leader,
          members,
          isReserved: false
        }
      },
      body: {},
      appClient: this.appClients.studygroup
    };
  else throw Error("cannot delete");
};
