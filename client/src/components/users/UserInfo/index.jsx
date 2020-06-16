import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../pages/users";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  .profile-image {
    border-radius: 50%;
    height: 2.5rem;
    margin-right: 1rem;
  }

  .right-block {
    display: flex;
    flex-direction: column;
  }
`;

const UserInfo = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <StyledUserInfo>
      <div>
        <Link to="/mypage">
          <span class="tag is-white">마이페이지</span>
        </Link>
      </div>
      {userInfo.userEmail ? (
        <>
          <img
            src={userInfo.profileImage}
            alt="profile"
            className="profile-image"
          />
          <div className="right-block">
            <LogoutButton />
          </div>
        </>
      ) : (
        <LoginButton />
      )}
    </StyledUserInfo>
  );
};

export default UserInfo;
