import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import useAxios from "../../../lib/useAxios";
import { UserContext } from "../../../pages/users/";
import axios from "axios";
import { REQUEST_URL } from "../../../config.json";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });
const StyledAccountManagementRow = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  button {
    margin-left: 1rem;
  }
`;

const AccountManagementRow = ({ userHistory }) => {
  const { userInfo } = useContext(UserContext);
  const { userId } = userInfo;
  const withdraw = useAxios(axios.create({ baseURL: `${REQUEST_URL}/` }));

  useEffect(() => {
    if (withdraw.error)
      window.alert("회원 탈퇴에 실패하였습니다. 다시 시도해주세요");
    else if (withdraw.data) {
      window.location.herf = "/";
    }
  }, [withdraw.data, withdraw.error]);

  const deleteUser = () => {
    withdraw.request("delete", `/auth/users/accounts/${userId}`);
  };

  const updateUserLocation = () => {
    const { daum } = window;
    new daum.Postcode({ oncomplete, onclose }).open();
  };

  const oncomplete = (data) => {
    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      data.address,
      async (locationResult, locationStatus) => {
        const userLocation = {
          lat: +locationResult[0].y,
          lon: +locationResult[0].x,
        };
        const url = `${REQUEST_URL}/api/user/location`;
        const data = {
          userId,
          lat: userLocation.lat,
          lon: userLocation.lon,
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(data),
        };

        await fetch(url, options);
        window.location.reload();
      }
    );
  };
  const onclose = (state) => {
    if (state === "FORCE_CLOSE") {
      alert("필수 입력 사항입니다. 다시 로그인 해주세요");
      window.location.reload();
    }
  };
  return (
    <StyledAccountManagementRow>
      <button className="button  is-light" onClick={deleteUser}>
        회원 탈퇴
      </button>
      <button className="button  is-light" onClick={updateUserLocation}>
        내 지역 수정
      </button>
    </StyledAccountManagementRow>
  );
};

export default AccountManagementRow;
