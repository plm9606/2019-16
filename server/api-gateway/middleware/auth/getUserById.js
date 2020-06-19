const User = require("../../models/user");
const { jwtGenerator } = require("./util");

<<<<<<< HEAD
module.exports = async function (req, res) {
=======
module.exports = async function(req, res) {
>>>>>>> fork/release
  const { userId } = req.params;
  const result = await User.findOne({ userId });

  if (result === null) res.json(null);
  const {
    userEmail,
    userGender,
    userAgeRange,
    userName,
    kakaoAccessToken,
    profileImage,
    userLocation,
    ownGroups,
    joiningGroups,
    history
  } = result;

  res
    .cookie("access_token", jwtGenerator({ id: userId, role: "user" }), {
<<<<<<< HEAD
      // httpOnly: false,
      domain: "", // "studycombined.shop",
      // secure: true,
=======
      httpOnly: false,
      domain: "studycombined.shop",
      secure: true,
>>>>>>> fork/release
      maxAge: 24 * 60 * 60 * 1000 // 1일
    })
    .json({
      userId,
      userEmail,
      userGender,
      userAgeRange,
      userName,
      kakaoAccessToken,
      profileImage,
      userLocation,
      ownGroups,
      joiningGroups,
      history
    });
};
