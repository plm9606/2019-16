const AWS = require("aws-sdk");

module.exports = function (accessKeyId, secretAccessKey, bucketName) {
  const bucketLink = `https://${bucketName}.s3.ap-northeast-2.amazonaws.com/`;

  const S3 = new AWS.S3({
    accessKeyId,
    secretAccessKey,
    region: "ap-northeast-2"
  });

  return { bucketLink, S3 };
};
