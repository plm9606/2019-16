const Users = require("../model/user");
const user = require("../model/user");

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
          groups: { group_id: joiningGroup._id }
        }
      },
      (err) => {
        if (err) throw new Error(err);
      }
    );
  }
};

exports.updateOwnGroups = async ({ userId, ownGroup }) => {
  Users.updateOne(
    { userId: userId },
    { $push: { ownGroups: ownGroup, groups: ownGroup.group_id } },
    (err) => {
      if (err) throw new Error(err);
    }
  );
};

exports.deleteGroupInUsers = async ({ group }) => {
  const userIds = group.members.map((member) => member.id);

  userIds.forEach((userId) => {
    Users.updateOne(
      { userId: userId },
      {
        $pull: {
          joiningGroups: { group_id: group._id },
          groups: { group_id: group._id }
        }
      },
      (err) => {
        if (err) throw new Error(err);
      }
    );
  });

  Users.updateOne(
    { userId: group.leader },
    { $pull: { ownGroups: { group_id: group._id } } },
    (err) => {
      if (err) throw new Error(err);
    }
  );
};

exports.addUserHistory = async function ({ reservationInfo }) {
  const { members, reservationId } = reservationInfo;

  // update users reservation list

  return {
    headers: {
      method: "REPLY",
      curQuery: "addUserHistory",
      nextQuery: "apigateway",
      params: {}
    },
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
