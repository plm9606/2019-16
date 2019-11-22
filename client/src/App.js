import React from "react";
import GroupDetail from "./pages/users/groupDetail";
import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  @import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);
  @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');
  font-family: "Nanum Gothic", sans-serif;
`;

// const data = {
//   src:
//     "https://nicholashowlett.com.au/wp-content/uploads/2016/05/coding-cat-768x512.jpg",
//   alt: "img",
//   title: "필수 표현으로 마스터하는 비즈니스 영어",
//   subtitle:
//     "10여 년의 해외 근무 경험으로 쌓은 실전 비즈니스 영어 노하우를 배울 수 있는 스터디입니다.",
//   location: "강남",
//   time: "월수 | 20:00 ~ | 2시간",
//   nowCnt: 8,
//   maxCnt: 10
// };

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Header></Header>
      <GroupDetail />
    </div>
  );
}

export default App;
