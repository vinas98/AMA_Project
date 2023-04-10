import React from "react";
import {Reset} from 'styled-reset';
import Header from "./Components/Header";
import {createGlobalStyle} from 'styled-components';
import AskPage from "./Components/AskPage";
import Footer from "./Components/Footer";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

.askContainer{
  background-color: rgba(232,238,239,1);
  padding-bottom: 30px;
}
  
`;

const AskQuestion = () => {
return (
    <div>
      <Reset/>
      <GlobalStyle/>
      <Header/>
      <div className="askContainer">
        <AskPage />
      </div>
      <Footer />
    </div>
);
};

export default AskQuestion;