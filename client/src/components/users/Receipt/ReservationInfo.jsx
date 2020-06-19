import React from "react";
import styled from "styled-components";
import { reservationDays } from "./util";

const ReservationInfoWrapper = styled.div`
  width: 50%;
  padding: 1.5rem;
`;

const ReservationInfo = ({ info }) => {
  return (
    <ReservationInfoWrapper>
      <h3 className="subtitle is-3">예약 정보</h3>
      <div className="table-container">
        <table className="table is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>No.</th>
              <th>모임 날짜</th>
              <th>시작 시간</th>
              <th>종료 시간</th>
            </tr>
          </thead>
          <tbody>
            {info.map((date, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{date.date.split("T")[0]}</td>
                <td>{date.start}시</td>
                <td>{date.end}시</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ReservationInfoWrapper>
  );
};

export default ReservationInfo;
