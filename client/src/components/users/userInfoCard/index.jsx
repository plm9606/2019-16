/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../pages/users";
import { wrapper, coordToAddress } from "../../../lib/kakaoMapUtils";

const StyledUserInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .profile-image {
    width: 12rem;
    border-radius: 50%;
  }

  .user-info {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .name {
      font-family: "Recipekorea";
      font-weight: bold;
      font-size: 2.3rem;
    }
  }

  .user-history-dashboard {
    display: flex;
    border-top: 1px solid;
    border-bottom: 1px solid;
    .history-card {
      padding: 1rem 2rem;
    }
    ul {
      text-align: center;
      .subject {
        font-weight: bold;
        font-size: 1.2rem;
      }
      .count {
        font-size: 1.1rem;
      }
    }
  }
`;

const UserInfoCard = ({ userHistories }) => {
  const { userInfo } = useContext(UserContext);
  const {
    userEmail,
    userName,
    profileImage,
    userLocation,
    joiningGroups,
    ownGroups,
  } = userInfo;

  const [address, setAddress] = useState("");

  useEffect(() => {
    async function getAddress() {
      if (userLocation.lat) {
        const arr = await coordToAddress(userLocation.lon, userLocation.lat);
        setAddress(
          `${arr[0].address.region_1depth_name} ${arr[0].address.region_2depth_name} ${arr[0].address.region_3depth_name}`
        );
      }
    }

    getAddress();
  }, [userLocation]);

  return (
    <StyledUserInfoCard>
      <div>
        <img
          src={profileImage}
          alt="study combined"
          className="profile-image"
        />
      </div>
      <div className="user-info">
        <div className="name">{userName}</div>
        <ul>
          <li>{userEmail}</li>
          <li>내 지역:{address} </li>
        </ul>
      </div>
      <div className="user-history-dashboard">
        <div className="history-card">
          <ul>
            <li className="subject">내가 참여한 스터디</li>
            <li className="count">{userHistories.length}개</li>
          </ul>
        </div>
        <div className="history-card">
          <ul>
            <li className="subject">현재 참여중인 스터디</li>
            <li className="count">
              {joiningGroups && ownGroups
                ? joiningGroups.length + ownGroups.length
                : 0}
              개
            </li>
          </ul>
        </div>
      </div>
    </StyledUserInfoCard>
  );
};

export default UserInfoCard;
