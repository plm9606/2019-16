/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { REQUEST_URL } from "../../config.json";
import useAxios from "../../lib/useAxios";
import { UserContext } from "../../pages/users";
import UserInfoCard from "../../components/users/userInfoCard";
import StudyHistoryList from "../../components/users/studyHistoryList";
import { useState } from "react";
import Spinner from "../../components/users/spinner";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

const StyledGroupDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 54rem;
  margin: 3rem auto;

  .modify-buttons {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .button:not(:first-child) {
      margin-left: 0.5rem;
    }
  }

  #mypage-button-row {
    display: flex;
    justify-content: center;
    padding: 2rem 0;
    button {
      margin-left: 1rem;
    }
  }
`;

const MyPage = ({ match, history }) => {
  const { userInfo } = useContext(UserContext);
  const { userId } = userInfo;
  const { loading, error, data, request } = useAxios(apiAxios);
  const withdraw = useAxios(axios.create({ baseURL: `${REQUEST_URL}/` }));
  const [userHistory, setUserHistory] = useState([]);
  const deleteUser = () => {
    withdraw.request("delete", `/auth/users/accounts/${userId}`);
  };
  useEffect(() => {
    if (userId) request("get", `/user/history/${userId}`);
  }, [userId]);

  useEffect(() => {
    data && setUserHistory(data.history);
  }, [data, loading]);

  useEffect(() => {
    if (withdraw.error)
      window.alert("회원 탈퇴에 실패하였습니다. 다시 시도해주세요");
    else if (withdraw.data) {
      window.location.herf = "/";
    }
  }, [withdraw.data, withdraw.error]);
  return (
    <StyledGroupDetail>
      {(() => {
        console.log(userInfo);
        if (loading) return <Spinner></Spinner>;
        if (error || data.status === 400) return <h2> 에러 발생 </h2>;
      })()}
      <div>
        <UserInfoCard userHistories={userHistory} />
        <div id="mypage-button-row">
          <button className="button  is-light" onClick={deleteUser}>
            회원 탈퇴
          </button>
          <button className="button  is-light">내 지역 수정</button>
        </div>
        <StudyHistoryList userHistories={userHistory} />
      </div>
    </StyledGroupDetail>
  );
};

export default MyPage;
