const Users = require("../model/user");

exports.updateJoiningGroups = async ({ userId, joiningGroup, addMode }) => {
  joiningGroup.group_id = joiningGroup._id;
  if (addMode) {
    Users.updateOne(
      { userId: userId },
      { $push: { joiningGroups: joiningGroup, groups: joiningGroup.group_id } },
      (err) => {
        if (err) throw new Error(err);
      }
    );
  } else {
    Users.updateOne(
      { userId: userId },
      {
        $pull: {
          joiningGroups: { group_id: joiningGroup._id },
          groups: joiningGroup._id
        }
      },
      (err) => {
        if (err) throw new Error(err);
      }
    );
  }

  return {
    method: "REPLY",
    curQuery: "updateJoiningGroups",
    nextQuery: "apigateway",
    params: {},
    body: {}
  };
};

exports.updateOwnGroups = async ({ userId, ownGroup }) => {
  await Users.updateOne(
    { userId: userId },
    { $push: { ownGroups: ownGroup, groups: ownGroup.group_id } }
  );

  return {
    method: "REPLY",
    curQuery: "updateOwnGroups",
    nextQuery: "apigateway",
    params: {},
    body: { status: 200, id: ownGroup.group_id }
  };
};

exports.modifyOwnGroupInfo = async ({ userId, studyGroup }) => {
  await Users.updateOne(
    { userId: userId },
    { $push: { ownGroups: studyGroup } }
  );

  return {
    method: "REPLY",
    curQuery: "modifyOwnGroupInfo",
    nextQuery: "apigateway",
    params: {},
    body: { status: 200, id: studyGroup._id }
  };
};

/**
 *
 * @param {*boolean} isJoiningGroups
 * true : update joiningGroups / false: update ownGroups
 */
exports.modifyRecruitInfo = async ({
  userId,
  groupId,
  isRecruit,
  isJoiningGroups
}) => {
  if (isJoiningGroups) {
    await Users.updateOne(
      { userId: userId, "joiningGroups.group_id": groupId },
      {
        $set: {
          "joiningGroups.$.isRecruiting": isRecruit
        }
      }
    );
  } else {
    await Users.updateOne(
      { userId: userId, "ownGroups.group_id": groupId },
      {
        $set: {
          "ownGroups.$.isRecruiting": isRecruit
        }
      }
    );
  }

  return {
    method: "REPLY",
    curQuery: "ModifyJoiningGroupInfo",
    nextQuery: "apigateway",
    params: {},
    body: { status: 200 }
  };
};

exports.modifyReservedInfo = async ({
  leader,
  members,
  groupId,
  isReserved
}) => {
  members.forEach(async (id) => {
    await Users.updateOne(
      { userId: id, "joiningGroups.group_id": groupId },
      {
        $set: {
          "joiningGroups.$.isReserved": isReserved
        }
      },
      { upsert: true }
    );
  });

  await Users.updateOne(
    { userId: leader, "ownGroups.group_id": groupId },
    {
      $set: {
        "ownGroups.$.isReserved": isReserved
      }
    },
    { upsert: true }
  );

  return {
    method: "REPLY",
    curQuery: "modifyReservedInfo",
    nextQuery: "apigateway",
    params: {},
    body: { status: 200, groupId }
  };
};

exports.deleteGroupInUsers = async ({ group }) => {
  const userIds = group.members.map((member) => member.id);

  await userIds.forEach(async (userId) => {
    await Users.updateOne(
      { userId: userId },
      {
        $pull: {
          joiningGroups: { group_id: group._id },
          groups: group._id
        }
      },
      (err) => {
        if (err) throw new Error(err);
      }
    );
  });

  await Users.updateOne(
    { userId: group.leader },
    { $pull: { ownGroups: { group_id: group._id }, groups: group._id } },
    (err) => {
      if (err) throw new Error(err);
    }
  );

  return {
    method: "REPLY",
    curQuery: "deleteGroupInUsers",
    nextQuery: "apigateway",
    params: {},
    body: { status: 200 }
  };
};

exports.addUserHistory = async function ({ reservationInfo }) {
  const { members, reservationId } = reservationInfo;

  // update users reservation list

  return {
    method: "REPLY",
    curQuery: "addUserHistory",
    nextQuery: "apigateway",
    params: {},
    body: {}
  };
};

exports.getUserHistoryAll = async ({ userId }) => {
  const res = await Users.findOne({ userId });

  return {
    method: "GET",
    curQuery: "getUserHistoryAll",
    nextQuery: "getHistoriesByIds",
    params: { groups: res.groups },
    body: {}
  };
};

exports.updateUserLocation = async ({ userId, lat, lon }) => {
  const res = await Users.updateOne(
    { userId },
    { "userLocation.lat": lat, "userLocation.lon": lon }
  );

  return {
    method: "REPLY",
    curQuery: "updateUserLocation",
    nextQuery: "apigateway",
    params: {},
    body: {}
  };
};
