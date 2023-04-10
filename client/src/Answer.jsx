import React from "react";
import {Reset} from 'styled-reset';
import Header from "./Components/Header";
import {createGlobalStyle} from 'styled-components';
import SearchBar from "./Components/SearchBar";
import Footer from "./Components/Footer";
import AnswerPage from './Components/AnswerPage';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
  body {
    background: black;
    color: pink;
    text-decoration: none;
  }
  .answerPageContainer{
    padding-top: 10px;
    background-color: rgba(232,238,239,1);
    font-family: sofia-pro, sans-serif;
    padding-bottom: 30px;
  }
`;

const Answer = () => {
return (
    <div className="answer">
      <Reset/>
      <GlobalStyle/>
      <Header/>
      <div className="answerPageContainer">
      {/* <SearchBar /> */}
      <AnswerPage />
      </div>
      <Footer />

    </div>
);
};

export default Answer;