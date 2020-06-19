const express = require("express");
const router = express.Router();
const { makePacket } = require("../../../../lib/tcp/util");

function reservationRouter(apiGateway) {
  router.post("/ready", (req, res, next) => {
    const { userId, reservationInfo } = req.body;

    req.packet = makePacket(
      "POST",
      "apigateway",
      "addReservation",
      "updateGroupReserved",
      {
        userId,
        reservationInfo
      },
      {},
      req.resKey,
      apiGateway.context
    );
    next();
  });

  router.get("/:groupId", (req, res, next) => {
    req.packet = makePacket(
      "GET",
      "apigateway",
      "findByGroupId",
      "findByGroupId",
      {
        groupId: req.params.groupId
      },
      {},
      req.resKey,
      apiGateway.context
    );
    next();
  });

  return router;
}

module.exports = reservationRouter;
