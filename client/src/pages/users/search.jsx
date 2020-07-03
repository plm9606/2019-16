import React, { useState, useEffect, useContext } from "react";
import queryString from "query-string";
import styled from "styled-components";

import StudyGroupCard from "../../components/users/groupCard";
import Spinner from "../../components/users/spinner";

import useInfiniteScroll from "../../lib/useInfiniteScroll";
import useCoord2String from "../../lib/coord2string";

import { UserContext } from "./index";
import axios from "axios";
import useAxios from "../../lib/useAxios";
const apiAxios = axios.create({
  baseURL: `${process.env.REACT_APP_REQUEST_URL}/api`,
});

const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;

  .main-jumbotron {
    display: flex;
    justify-content: center;

    margin: 0 auto;
    font-family: "Black Han Sans", sans-serif;
    color: #000000;
    padding-left: 5%;
    padding: 5%;
    align-self: start;
    display: flex;

    .main-title {
      font-size: 3.7em;
      border-bottom: 0.2px solid black;

      &.highlight {
        color: #e41d60;
      }
    }
  }

  .location-info-block {
    display: flex;
    justify-content: center;
    font-weight: bold;
    align-self: center;
    margin: 0 0 1em 0;
    padding: 0.1em 1em;
    border-radius: 5px;

    font-size: 0.8rem;
  }

  .study-group-list {
    align-self: center;
    min-height: 200px;

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    background-color: #f8f0ee;
    width: 68rem;
    flex-wrap: wrap;
    padding: 0 1rem;
    margin: 0 10%;
    .study-group-card {
      margin: 2em;
    }
  }

  .no-result {
    align-self: center;
  }
`;

function isLastPagenation(takenGroups) {
  const takenLength = takenGroups.length || 0;
  if (!takenGroups || !takenLength || takenLength < 6) return true;
  return false;
}

const Search = ({ location, match, history }) => {
  const query = queryString.parse(location.search).query;

  const pathname = location.pathname;

  const { userInfo } = useContext(UserContext);
  const { userLocation } = userInfo;
  let { lat, lon } = userLocation;

  const { request, data, loading, error } = useAxios(apiAxios);

  const [searchState, setSearchState] = useState({
    isLoading: true,
    searchData: [],
  });

  const [curLocation] = useCoord2String(window.kakao, lat, lon);
  const [isFetching, setIsFetching] = useInfiniteScroll(loadAdditionalItems);

  const [pageState, setpageState] = useState({
    page_idx: 1,
    isLastItem: false,
  });

  function loadAdditionalItems() {
    const { page_idx, isLastItem } = pageState;
    if (isLastItem || !lat || !lon) return;

    request(
      "get",
      `/search/query/${query}/location/${lat}/${lon}/page/${page_idx}/true`
    );
  }

  useEffect(() => {
    if (!lat || !lon) return;
    setSearchState({
      isLoading: true,
      searchData: [],
    });
    request("get", `/search/query/${query}/location/${lat}/${lon}/page/0/true`);
  }, [query, userLocation]);

  useEffect(() => {
    if (!data || !pageState) return;

    const additionalGroups = data;
    const changedPageNationState = {
      ...pageState,
      page_idx: pageState.page_idx + 1,
    };

    if (isLastPagenation(additionalGroups)) {
      changedPageNationState.isLastItem = true;
    }

    const newData = [...searchState.searchData, ...additionalGroups];
    const newSearchData = {
      isLoading: false,
      searchData: newData,
    };
    setpageState(changedPageNationState);
    setSearchState(newSearchData);
    setIsFetching(false);
  }, [data]);

  return (
    <StyledSearch>
      <div className="main-jumbotron">
        <div className="main-title highlight">
          🔍 {pathname === "/search" ? query : `#${query}`}
        </div>
      </div>

      <div className="location-info-block">
        {curLocation && (
          <span>
            🚩<strong className="has-text-info"> {curLocation} </strong> 근처
          </span>
        )}
      </div>

      <div className="study-group-list">
        {(() => {
          if (loading) return <Spinner />;
          if (error) return <h3> 에러 발생 </h3>;
          if (!searchState.searchData.length)
            return (
              <div className="is-size-4 no-result">
                주변에 모집중인 스터디 그룹이 없네요!🥺 <br />
                직접 모집해보는건 어떤가요?😊
              </div>
            );
          return searchState.searchData.map((groupData) => {
            return (
              <StudyGroupCard
                key={groupData.id}
                groupData={groupData}
                history={history}
              ></StudyGroupCard>
            );
          });
        })()}
      </div>
    </StyledSearch>
  );
};

export { Search, StyledSearch, isLastPagenation };
