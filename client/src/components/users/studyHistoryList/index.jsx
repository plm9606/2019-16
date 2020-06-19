import React, { useReducer, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import StudyHistory from "./studyHistory";

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

const { kakao } = window;

const StudyHistoryList = ({ userHistories }) => {
  return (
    <StyledStudyHistoryList>
      <div className="title">내가 참여한 스터디</div>
      {userHistories.map((history) => {
        return <StudyHistory userHistory={history} />;
      })}
    </StyledStudyHistoryList>
  );
};

export default StudyHistoryList;
