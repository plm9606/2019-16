import React from "react";
import styled from "styled-components";
// import { StyledHeader } from "./Header";
import { UserContext } from "../../pages/users/index";
import { useContext } from "react";
const StyledReservationHeader = styled.div`
  height: 85px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 0 0 2em;
  justify-content: center;

  .logo {
    width: 85px;
    height: 68px;
    position: absolute;
    left: 30px;
  }
`;
const ReservationHeader = ({ history }) => {
  const { groupInBooking } = useContext(UserContext);
  const { title, personnel, dates } = groupInBooking;
  debugger;
  return (
    <StyledReservationHeader>
      <img
        src="/image/new-logo-mini.png"
        alt="study combined"
        className="logo"
      />
      <div class="buttons has-addons">
        <button class="button is-danger is-selected">{title}</button>
        <button class="button ">{dates}</button>
        <button class="button is-primary is-selected">{personnel}명</button>
      </div>
    </StyledReservationHeader>
  );
};

export default ReservationHeader;
