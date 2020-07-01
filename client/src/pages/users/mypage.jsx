/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import useAxios from "../../lib/useAxios";
import { UserContext } from "../../pages/users";
import UserInfoCard from "../../components/users/userInfoCard";
import TabContainer from "../../components/users/studyHistoryList/tabcontainer";
import AccountManagementRow from "../../components/users/mypage.accountManagement";
import moment from "moment";
const apiAxios = axios.create({
  baseURL: `${process.env.REACT_APP_REQUEST_URL}/api`,
});

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
`;

const MyPage = () => {
  const { userInfo } = useContext(UserContext);
  const { userId } = userInfo;
  const { loading, error, data, request } = useAxios(apiAxios);
  const [userHistory, setUserHistory] = useState([]);

  useEffect(() => {
    if (userId) request("get", `/user/history/${userId}`);
  }, [userId]);

  useEffect(() => {
    data &&
      setUserHistory(
        data.history.reduce((acc, history) => {
          if (moment(history.endDate).isBefore(moment())) {
            acc.push(makeParams(history));
          }
          return acc;
        }, [])
      );
  }, [data, loading]);

  return (
    <StyledGroupDetail>
      {(() => {
        // if (loading) return <Spinner></Spinner>;
        // if (error || data.status === 400) return <h2> 에러 발생 </h2>;
      })()}
      <div>
        <UserInfoCard userHistories={userHistory} />
        <AccountManagementRow />
        <TabContainer userHistories={userHistory} />
      </div>
    </StyledGroupDetail>
  );
};

export default MyPage;
const makeParams = (history) => {
  return {
    group_id: history.studyGroup._id,
    location: {
      lat: history.studyRoom.location.coordinates[1],
      lon: history.studyRoom.location.coordinates[0],
    },
    thumbnail: history.studyGroup.thumbnail,
    title: history.studyGroup.title,
    startDate: history.startDate,
    endDate: history.endDate,
    completed: true,
    leader: history.studyGroup.leader,
  };
};
