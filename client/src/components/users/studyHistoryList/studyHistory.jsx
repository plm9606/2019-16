import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { coordToAddress } from "../../../lib/kakaoMapUtils";
import moment from "moment";

const StyledStudyHistory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 7rem;
  // box-shadow: inset 0px 0px 277px 3px #65656573;

  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${(props) => props.url});

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  .study-history-background {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url(${(props) => props.url});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }
  .study-history-title {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .study-history-date {
  }
`;

const parseUTC = (utc) => {
  return moment(utc).format("YYYY/MM/DD (ddd)");
};

const StudyHistory = ({ userHistory }) => {
  const [address, setAddress] = useState("");
  useEffect(async () => {
    const arr = await coordToAddress(
      userHistory.studyRoom.location.coordinates[0],
      userHistory.studyRoom.location.coordinates[1]
    );

    setAddress(arr[0].road_address.address_name);
  }, []);
  return (
    <StyledStudyHistory url={userHistory.studyGroup.thumbnail}>
      {/* <div className="study-history-background"></div> */}
      <div className="study-history-title">{userHistory.studyGroup.title}</div>
      <div className="study-history-date">
        {parseUTC(userHistory.dates[0].date)}~
        {parseUTC(userHistory.dates[userHistory.dates.length - 1].date)}
        {parseUTC(userHistory.startDate)}~{parseUTC(userHistory.endDate)}
      </div>
      <div>{address}</div>
    </StyledStudyHistory>
  );
};

export default StudyHistory;
