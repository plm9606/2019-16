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
      nextQuery: "addUserHistory",
      params: {}
    },
    body: { members: reservationInfo.studyGroupInfo.members, reservationId },
    appClient: this.appClients.user
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
