/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../pages/users";
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

const UserInfoCard = ({ match, history }) => {
  const { userInfo } = useContext(UserContext);
  const { userEmail, userName, profileImage, userLocation } = userInfo;
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
          <li>
            내 지역: {userLocation.lat},{userLocation.lon}
          </li>
        </ul>
      </div>
      <div className="user-history-dashboard">
        <div className="history-card">
          <ul>
            <li className="subject">내가 참여한 스터디</li>
            <li className="count">8개</li>
          </ul>
        </div>
        <div className="history-card">
          <ul>
            <li className="subject">현재 진행중인 스터디</li>
            <li className="count">9개</li>
          </ul>
        </div>
      </div>
    </StyledUserInfoCard>
  );
};

export default UserInfoCard;
