import React from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import "./overlay.scss";

const CustomOverlay = ({ marker, data }) => {
  const {
    partner_id,
    cafe_name,
    name,
    images,
    price,
    min_personnel,
    max_personnel,
    _id,
    days,
    startTime,
    endTime,
    dates,
    groupId,
  } = data;
  const overlay = marker.overlay;
  const roomId = _id;
  const jwt = Cookies.get("access_token");
  const userId = jwtDecode(jwt).id;

  function closeOverlay() {
    overlay.setMap(null);
  }
  const reservationInfo = {
    days,
    roomId,
    dates,
    groupId,
  };
  reservationInfo.startTime = [];
  reservationInfo.endTime = [];
  days.forEach(() => {
    reservationInfo.startTime.push(startTime);
    reservationInfo.endTime.push(endTime);
  });

  const info = { userId, reservationInfo };
  const eleInfo = JSON.stringify(info);

  return (
    <div className="overlay">
      <div className="body">
        <div
          className="is-size-5 has-text-weight-bold cafe-name"
          dangerouslySetInnerHTML={{ __html: `${cafe_name}` }}
        ></div>
        <div>
          <span className="has-text-info has-text-weight-bold">Room </span>
          {name}
        </div>
        <div className="info-and-btn-wrapper">
          <div className="is-size-7">
            <ul>
              <li>{`인원 ${min_personnel} ~ ${max_personnel}명`}</li>
              <li>{`요금 ${price}/1인`}</li>
            </ul>
          </div>
          <button
            className="reservation-btn button is-primary is-rounded is-focused"
            data-info={`${eleInfo}`}
          >
            예약하기
          </button>
        </div>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default CustomOverlay;
