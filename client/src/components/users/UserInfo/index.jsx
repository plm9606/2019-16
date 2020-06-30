import React, { useContext, Fragment } from "react";
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
      {userInfo.userEmail ? (
        <Fragment>
          <div>
            <Link to="/mypage">
              <span className="tag is-white">마이페이지</span>
            </Link>
          </div>
          <img
            src={userInfo.profileImage}
            alt="profile"
            className="profile-image"
          />
          <div className="right-block">
            <LogoutButton />
          </div>
        </Fragment>
      ) : (
        <LoginButton />
      )}
    </StyledUserInfo>
  );
};

export default UserInfo;
