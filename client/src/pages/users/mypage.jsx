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
`;

// const userHistory = [
//   {
//     studyGroup: {
//       category: ["기타", "기타"],
//       tags: [],
//       days: [2, 3, 4],
//       _id: "5edb87b0134d5705ac1deeb1",
//       location: {
//         lat: 37.4981646510326,
//         lon: 127.028307900881,
//       },
//       isRecruiting: false,
//       leader: "1374285410",
//       title: "요리 클래스",
//       subtitle: "요리",
//       intro: "요",
//       startTime: 15,
//       min_personnel: 1,
//       now_personnel: 1,
//       max_personnel: 2,
//       endTime: 18,
//       thumbnail:
//         "https://cgv-clone-build.s3.ap-northeast-2.amazonaws.com/studycombined/1591275068721c5a5a13a-e9a6-4d3f-b854-288a69b698b7_800_420.jpg",
//       members: [],
//     },
//     studyRoom: {
//       location: {
//         coordinates: [127.0281178, 37.4995484],
//         type: "Point",
//       },
//       images: [
//         "https://pds.joins.com/news/component/htmlphoto_mmdata/201902/20/b853db37-b6b2-4731-a963-8b3bfe4be1c2.jpg",
//       ],
//       _id: "5edb88ddc83c0a56dcf52199",
//       partner_id: "5de7b74cc39a82426cdba260",
//       cafe_name: "ENI<b>스터디</b>룸",
//       name: "197호",
//       price: 2397,
//       min_personnel: 1,
//       max_personnel: 10,
//       description:
//         "주소: 서울특별시 강남구 강남대로94길 9\n 링크: http://cafe.naver.com/studyeni",
//       open_time: 9,
//       close_time: 18,
//     },
//     dates: [
//       {
//         _id: "5edd0c34632f2c347867076e",
//         start: 15,
//         end: 18,
//         date: "2020-06-16T00:00:00.000Z",
//       },
//       {
//         _id: "5edd0c34632f2c347867076d",
//         start: 15,
//         end: 18,
//         date: "2020-06-23T00:00:00.000Z",
//       },
//       {
//         _id: "5edd0c34632f2c347867076c",
//         start: 15,
//         end: 18,
//         date: "2020-06-17T00:00:00.000Z",
//       },
//       {
//         _id: "5edd0c34632f2c347867076b",
//         start: 15,
//         end: 18,
//         date: "2020-06-24T00:00:00.000Z",
//       },
//       {
//         _id: "5edd0c34632f2c347867076a",
//         start: 15,
//         end: 18,
//         date: "2020-06-18T00:00:00.000Z",
//       },
//       {
//         _id: "5edd0c34632f2c3478670769",
//         start: 15,
//         end: 18,
//         date: "2020-06-25T00:00:00.000Z",
//       },
//     ],
//   },
// ];

const MyPage = ({ match, history }) => {
  const { userInfo } = useContext(UserContext);
  const { userId } = userInfo;
  const { loading, error, data, request } = useAxios(apiAxios);
  const [userHistory, setUserHistory] = useState([]);
  useEffect(() => {
    if (userId) request("get", `/user/history/${userId}`);
  }, [userId]);

  useEffect(() => {
    data && setUserHistory(data.history);
  }, [data, loading]);

  return (
    <StyledGroupDetail>
      {(() => {
        console.log(userInfo);
        if (loading) return <Spinner></Spinner>;
        if (error || data.status === 400) return <h2> 에러 발생 </h2>;
      })()}
      <div>
        <UserInfoCard userHistories={userHistory} />
        <StudyHistoryList userHistories={userHistory} />
      </div>
    </StyledGroupDetail>
  );
};

export default MyPage;
