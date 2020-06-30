const StudyRooms = require("./models/studyrooms");

const convertKntoMile = (km) => {
  return km / 6378.1;
};

async function searchNearbyRooms(params) {
  const { geopoint, personnel, startTime, endTime } = params;
  const res = await StudyRooms.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [geopoint.longitude, geopoint.latitude]
        },
        $maxDistance: 20000
      }
    },
    max_personnel: { $gte: personnel },
    min_personnel: { $lte: personnel },
    open_time: { $lte: startTime },
    close_time: { $gte: endTime }
  });

  return res;
}

async function availableRooms(query, params) {
  const studyRooms = await searchNearbyRooms(params);

  return {
    packet: {
      method: "GET",
      curQuery: query,
      nextQuery: "filterStudyGroup",
      params: { studyRooms, studyGroup: { ...params } },
      body: {}
    },
    socket: this.appClients.reservation
  };
}

async function getRoomById(query, params) {
  const studyRoom = await StudyRooms.findById(params.studyRoomId);

  if (studyRoom === "") {
    return {
      packet: {
        method: "ERROR",
        curQuery: query,
        nextQuery: "apigateway",
        params: {},
        body: {}
      },
      socket: this.appClients.reservation
    };
  }

  return {
    packet: {
      method: "REPLY",
      curQuery: query,
      nextQuery: "apigateway",
      params: {},
      body: { studyRoomInfo: studyRoom }
    }
  };
}

module.exports = {
  searchNearbyRooms,
  availableRooms,
  getRoomById
};
