import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import useAxios from "../../../lib/useAxios";
import { UserContext } from "../../../pages/users";
import ReservedStudyRoom from "./ReservedStudyroom";
const apiAxios = axios.create({
  baseURL: `${process.env.REACT_APP_REQUEST_URL}/api`,
});

const StyledApplyButtons = styled.div`
  .button:not(:last-child) {
    margin-right: 0.4rem;
  }
`;

const isOudated = (date) => {
  if (moment(date).isBefore(moment())) return true;
  return false;
};

const ApplyButtons = ({
  groupData,
  onToggleReservation,
  onChangedNowPersonnel,
}) => {
  const {
    _id,
    members,
    isRecruiting,
    leader,
    now_personnel,
    max_personnel,
    min_personnel,
    isReserved,
  } = groupData;

  const { userInfo } = useContext(UserContext);
  const { request } = useAxios(apiAxios);
  const getReservationInfo = useAxios(apiAxios);
  const { userId } = userInfo;
  const [memberType, setMemberType] = useState(null); // guest, searcher, joiner, leader
  const [isCanReserve, setIsCanReserve] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [reservation, setReservation] = useState(null);
  const isSatisfyPersonnelAtReservation =
    min_personnel <= now_personnel && now_personnel <= max_personnel;
  const isPersonnelHigherThanMax = now_personnel >= max_personnel;

  const onToggleRegister = useCallback(async () => {
    if (isPersonnelHigherThanMax) return alert("인원이 꽉 찼습니다");
    if (memberType !== "joiner" && !isRecruiting)
      return alert("모집 중이 아닙니다.");
    // 사용자 DB에 해당 그룹 정보를 넣는다
    const {
      status,
      changedMemberType,
      changedNowPersonnel,
      failReason,
    } = await request("post", "/studygroup/toggleRegistration", {
      data: { userId, groupId: _id },
    });

    if (status === 200) {
      setMemberType(changedMemberType);
      onChangedNowPersonnel(changedNowPersonnel);
    }

    if (status === 400) {
      alert(failReason);
    }
  }, [userInfo.userId, memberType, isRecruiting]);

  const onToggleRecruit = useCallback(async () => {
    const { status, failReason } = await request(
      "patch",
      "/studygroup/recruit",
      {
        data: { isRecruiting, groupId: _id },
      }
    );

    if (status === 400) return alert(failReason);

    onToggleReservation(isRecruiting);
    isSatisfyPersonnelAtReservation && setIsCanReserve(true);
  }, [isRecruiting, isSatisfyPersonnelAtReservation]);

  const onCancelReservation = () => {
    axios
      .delete(`${process.env.REACT_APP_REQUEST_URL}/api/reservation/${_id}`, {
        data: { leader, members },
      })
      .then((data) => {
        window.location.reload();
      })
      .catch((err) => {
        window.alert("예약을 취소할 수 없습니다. 다시 시도해주세요.");
      });
  };

  useEffect(() => {
    if (!userId) return;
    const isJoiner = members.map((m) => m.id).some((id) => id === userId);
    let type;

    if (isJoiner) type = "joiner";
    if (!isJoiner) type = "searcher";
    if (userId === leader) {
      type = "leader";
      isSatisfyPersonnelAtReservation && setIsCanReserve(true);
    }
    setMemberType(type);
  }, [userId]);

  useEffect(() => {
    if (isReserved === true) {
      getReservationInfo.request("get", `/reservation/${_id}`);
    }
  }, [isReserved]);

  useEffect(() => {
    getReservationInfo.data &&
      getReservationInfo.data.length > 0 &&
      setReservation(getReservationInfo.data[0]);
  }, [getReservationInfo.data]);

  useEffect(() => {
    reservation && reservation.dates && setStartDate(reservation.dates[0].date);
  }, [reservation]);
  return (
    <StyledApplyButtons>
      {isReserved && isOudated(startDate) ? (
        <button className="button is-danger" disabled="true">
          모집 마감 - 예약완료
        </button>
      ) : null}
      {isReserved && !isOudated(startDate) ? (
        <button className="button is-danger" onClick={onCancelReservation}>
          예약 취소하기
        </button>
      ) : null}

      {(() => {
        if (isReserved) return;

        switch (memberType) {
          case "searcher":
            return (
              <button className="button" onClick={onToggleRegister}>
                신청하기
              </button>
            );
          case "joiner":
            return (
              <button className="button" onClick={onToggleRegister}>
                취소하기
              </button>
            );
          case "leader":
            return (
              <>
                <button className="button" onClick={onToggleRecruit}>
                  {isRecruiting ? "마감하기" : "모집하기"}
                </button>
                {isCanReserve && !isRecruiting && (
                  <Link to={`/reservation/${_id}`}>
                    <button className="button"> 예약하기 </button>
                  </Link>
                )}
              </>
            );
          default:
            return;
        }
      })()}
      {reservation ? <ReservedStudyRoom reservationData={reservation} /> : null}
    </StyledApplyButtons>
  );
};

export default ApplyButtons;
