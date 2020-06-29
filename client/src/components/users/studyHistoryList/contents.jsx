import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import StudyHistory from "./studyHistory";
const StyledTabContainer = styled.div`
  display: ${(props) => props.display};
  flex-wrap: wrap;
  min-height: 15rem;
`;

const isDisplay = (arg1, arg2) => {
  if (arg1 === arg2) return "flex";
  else return "none";
};

const Content = ({ tabName, tab, userHistories }) => {
  return (
    <StyledTabContainer display={isDisplay(tabName, tab)}>
      {userHistories.map((history) => {
        return <StudyHistory userHistory={history} />;
      })}
    </StyledTabContainer>
  );
};

export default Content;
