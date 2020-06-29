import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { coordToAddress } from "../../../lib/kakaoMapUtils";
import moment from "moment";
import { UserContext } from "../../../pages/users/";
const StyledStudyHistory = styled.div`
  border-radius: 15px;
  width: 22rem;
  margin: 1.2rem;
  cursor: pointer;

  img {
    border-radius: 15px 15px 0 0;
  }
  .study-history-title {
    padding-bottom: 1rem;
  }
`;

const parseUTC = (utc) => {
  return moment(utc).format("YYYY/MM/DD (ddd)");
};

const StudyHistory = ({ userHistory }) => {
  const { userInfo } = useContext(UserContext);
  const { userId } = userInfo;
  const [address, setAddress] = useState("");
  const clickCard = () => {
    window.location.href = `/group/detail/${userHistory.group_id}`;
  };
  useEffect(async () => {
    const arr = await coordToAddress(
      userHistory.location.lon,
      userHistory.location.lat
    );

    setAddress(arr[0].road_address.address_name);
  }, []);

  return (
    <StyledStudyHistory className="card" onClick={clickCard}>
      {console.log(userHistory)}

      {userHistory.completed ? (
        <div className="has-background-danger has-text-white completed-group">
          참여완료
        </div>
      ) : (
        ""
      )}
      <div class="card-image">
        <figure class="image is-4by3">
          <img src={userHistory.thumbnail} alt="group image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <div className="has-text-weight-bold is-size-5 study-history-title">
            {userHistory.title}
          </div>
          <div>
            {userId && userHistory.leader === userId ? (
              <span class="tag is-danger">그룹장</span>
            ) : null}
            <span class="tag is-light">
              {userHistory.isRecruiting ? "모집중" : "모집 완료"}
            </span>
            {userHistory.isReserved ? (
              <span class="tag is-primary">예약 완료</span>
            ) : null}
          </div>
          {userHistory.startDate ? (
            <div className="study-history-date">
              {parseUTC(userHistory.startDate)}~{parseUTC(userHistory.endDate)}
            </div>
          ) : (
            ""
          )}
          <div>{address}</div>
        </div>
      </div>
    </StyledStudyHistory>
  );
};

export default StudyHistory;
