import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { coordToAddress } from "../../../lib/kakaoMapUtils";
import moment from "moment";

const StyledReservedStudyRoom = styled.div`
  padding: 2rem 0 0 0;
  .tag {
    margin: 0 0 0.5rem;
  }
  .study-start {
    font-weight: 900;
  }
`;

const ReservedStudyRoom = ({ reservationData }) => {
  const { studyRoom, dates } = reservationData;
  const [address, setAddress] = useState(null);
  useEffect(async () => {
    const arr = await coordToAddress(
      studyRoom.location.coordinates[0],
      studyRoom.location.coordinates[1]
    );
    setAddress(
      arr[0].road_address
        ? arr[0].road_address.address_name
        : arr[0].address.address_name
    );
  }, []);
  return (
    <StyledReservedStudyRoom>
      <span className="is-size-6 is-warning tag">스터디룸 예약정보</span>
      <div>
        <span className="study-start">
          {moment(dates[0].date).format("YYYY년 M월 D일")}
        </span>
        에 시작해요.
      </div>
      <div>
        {studyRoom.cafe_name} / {studyRoom.name}
      </div>
      <div>{address}</div>
    </StyledReservedStudyRoom>
  );
};

export default ReservedStudyRoom;
