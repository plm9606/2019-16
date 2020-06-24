import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import StudyHistory from "./studyHistory";
import moment from "moment";
import { UserContext } from "../../../pages/users";
const StyledStudyHistoryList = styled.div`
  display: flex;
  padding: 4rem 0;
  flex-direction: column;
  align-items: center;

  .title {
    font-weight: bold;
    font-size: 1.7rem;
  }
`;

const makeParams = (history) => {
  return {
    group_id: history.studyGroup._id,
    location: {
      lat: history.location.coordinates[0],
      lon: history.location.coordinates[1],
    },
    thumbnail: history.studyGroup.thumbnail,
    title: history.studyGroup.title,
    startDate: history.startDate,
    endDate: history.endDate,
    completed: true,
  };
};
const StudyHistoryList = ({ userHistories }) => {
  const { userInfo } = useContext(UserContext);
  const { userId, joiningGroups, ownGroups } = userInfo;
  const [inProgressStudy, setInProgressStudy] = useState([]);

  useEffect(() => {
    if (joiningGroups && ownGroups)
      setInProgressStudy([...joiningGroups, ...ownGroups]);
  }, [joiningGroups, ownGroups]);
  return (
    <StyledStudyHistoryList>
      <div className="title">내가 참여한 스터디</div>
      {userHistories.map((history) => {
        if (moment(history.endDate).isBefore(moment())) {
          return <StudyHistory userHistory={makeParams(history)} />;
        }
      })}
      {inProgressStudy.length > 0
        ? inProgressStudy.map((history) => {
            console.log(history);
            return <StudyHistory userHistory={history} />;
          })
        : null}
    </StyledStudyHistoryList>
  );
};

export default StudyHistoryList;
