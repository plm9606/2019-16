import React, { useReducer } from "react";
import styled from "styled-components";
import Header from "../../components/users/groupDetail/Header";
import Main from "../../components/users/groupDetail/Main";
import Intro from "../../components/users/groupDetail/Intro";
import {
  groupDetail as groupDetailReducer,
  initialState
} from "../../reducer/users/groupDetail";

const StyledGroupDetail = styled.div`
  display: flex;
  flex-direction: column;

  width: 54rem;
  margin: 3rem auto;
`;

const GroupDetail = () => {
  const [groupData, dispatch] = useReducer(groupDetailReducer, initialState);

  return (
    <StyledGroupDetail>
      <Header groupData={groupData}></Header>
      <Main groupData={groupData} dispatch={dispatch}></Main>
      <Intro></Intro>
    </StyledGroupDetail>
  );
};

export default GroupDetail;
