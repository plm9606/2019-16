import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import UserPage from "./pages/users";
import PartnerPage from "./pages/partners";

const GlobalStyle = createGlobalStyle`
@font-face { 
  font-family: 'Recipekorea'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Recipekorea.woff') format('woff'); 
  font-weight: normal; 
  font-style: normal; 
}
@font-face { font-family: 'InfinitySans-RegularA1'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff') format('woff'); font-weight: normal; font-style: normal; }
  @import "bulmaCarousel.sass";
  @import url("https://fonts.googleapis.com/earlyaccess/nanumgothic.css");
  @import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap');
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Route path="/" component={UserPage} />
        <Route path="/partners" component={PartnerPage} />
      </Router>
    </div>
  );
}

export default App;
