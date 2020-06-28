import React, { useState, useEffect, useContext, useRef } from "react";
import { StyledSearch, isLastPagenation } from "./search";
import { UserContext } from "./index";

import StudyGroupCard from "../../components/users/groupCard";
import useInfiniteScroll from "../../lib/useInfiniteScroll";
import useCoord2String from "../../lib/coord2string";
import Spinner from "../../components/users/spinner";

import { REQUEST_URL } from "../../config.json";
import axios from "axios";
import useAxios from "../../lib/useAxios";

const apiAxios = axios.create({ baseURL: `${REQUEST_URL}/api` });

const CategorySearch = ({ match, history }) => {
  const { category } = match.params;

  const { userInfo } = useContext(UserContext);
  const { userLocation } = userInfo;
  let { lat, lon } = userLocation;
  const [curLocation] = useCoord2String(window.kakao, lat, lon);

  const { request, data, loading, error } = useAxios(apiAxios);
  const [isFetching, setIsFetching] = useInfiniteScroll(loadAdditionalItems);

  const [searchState, setSearchState] = useState({
    isLoading: true,
    searchData: [],
  });

  const [pageState, setpageState] = useState({
    page_idx: 1,
    isLastItem: false,
  });

  function loadAdditionalItems() {
    const { page_idx, isLastItem } = pageState;

    if (isLastItem || !lat || !lon) return;
    request(
      "get",
      `/search/all${
        category == "all" ? "" : "/category/" + category
      }/location/${lat}/${lon}/page/${page_idx}/true`
    );
  }

  useEffect(() => {
    if (!lat || !lon) return;

    request(
      "get",
      `/search/all${
        category == "all" ? "" : "/category/" + category
      }/location/${lat}/${lon}/page/0/true`
    );
  }, [userLocation]);

  useEffect(() => {
    if (!lat || !lon) return;

    setSearchState({
      isLoading: true,
      searchData: [],
    });

    setpageState({
      page_idx: 1,
      isLastItem: false,
    });
    request(
      "get",
      `/search/all${
        category == "all" ? "" : "/category/" + category
      }/location/${lat}/${lon}/page/0/true`
    );
  }, [category]);

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
          카테고리: {category === "all" ? "전체" : category}
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
          if (error) return <div> 에러 발생 </div>;
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

export default CategorySearch;
