import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../pages/users";
import Content from "./contents";
const StyledTabContainer = styled.div`
  #tab-body {
    flex-wrap: wrap;
    display: flex;
  }
`;

const TabContainer = ({ userHistories }) => {
  const { userInfo } = useContext(UserContext);
  const { joiningGroups, ownGroups, groups, history } = userInfo;
  const [inProgressStudy, setInProgressStudy] = useState([]);

  const [tab, setTab] = useState("current");

  useEffect(() => {
    if (joiningGroups && ownGroups)
      setInProgressStudy([...joiningGroups, ...ownGroups]);
  }, [joiningGroups, ownGroups]);

  const clickTab = (e) => {
    e.currentTarget.firstChild.childNodes.forEach((e) =>
      e.classList.remove("is-active")
    );
    e.target.parentElement.classList.add("is-active");
    if (e.target.id === "tab-current") setTab("current");
    else setTab("before");
  };

  return (
    <StyledTabContainer>
      <div className="tabs" onClick={clickTab}>
        <ul>
          <li className="is-active">
            <a id="tab-current">예정된 스터디</a>
          </li>
          <li>
            <a id="tab-before">완료 스터디</a>
          </li>
        </ul>
      </div>
      <div id="tab-body">
        <Content
          tabName={"current"}
          tab={tab}
          userHistories={inProgressStudy}
        />
        <Content tabName={"before"} tab={tab} userHistories={userHistories} />
      </div>
    </StyledTabContainer>
  );
};
const makeParams = (history) => {
  return {
    group_id: history.studyGroup._id,
    location: {
      lat: history.location.coordinates[0],
      lon: history.location.coordinates[1],
    },
    thumbnail: history.studyGroup.thumbnail,
    title: history.studyGroup.title,
    startDate: history.startDate,
    endDate: history.endDate,
    completed: true,
  };
};
export default TabContainer;
