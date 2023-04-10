import React from "react";
import {Reset} from 'styled-reset';
import Header from "./Components/Header";
import {createGlobalStyle} from 'styled-components';
import Footer from "./Components/Footer";
import Feedback from "./Components/Feedback";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
  body {
    background: black;
    color: pink;
    text-decoration: none;
  }
  .feedback{
    border-radius: 8px;
    border: none;
    background-color: #c2e7fe;
  }
  .feedbackContainer{
    background-color: rgba(232,238,239,1);
    padding-bottom: 30px;
  }
`;

const FeedbackJSX = () => {
return (
    <div>
      <Reset/>
      <GlobalStyle/>
      <Header/>
      <div className="feedbackContainer">
        <Feedback />
      </div>
      <Footer />

    </div>
);
};

export default FeedbackJSX;