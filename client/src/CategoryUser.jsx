import React, { useState } from "react";
import {Reset} from 'styled-reset';
import Header from "./Components/Header";
import {createGlobalStyle} from 'styled-components';
import VerifiedUsers from './Components/VerifiedUsers';
import Footer from "./Components/Footer";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
  body {
    background: black;
    color: pink;
    text-decoration: none;
  }
  .category{
    color: white !important;
    border-radius: 8px;
    border: none;
    background-color: #c2e7fe;
  }
  .categoryContainer{
    background-color: rgba(232,238,239,1);
//     background: rgb(233,239,241);
// background: linear-gradient(180deg, rgba(233,239,241,1) 0%, rgba(255,255,255,1) 100%);
    font-family: sofia-pro, sans-serif;
    padding-bottom: 30px;
  }
`;


const CategoryUser = () => {
  // const urlPath = window.location.href;
  // const [isTag, setTag] = useState(false);
  // const [isUser, setUser] = useState(false);

  // if(urlPath == 'trendingTags'){
  //   console.log(urlPath);
  //   setTag(true);
  //   setUser(false);
  // }else{
  //   setTag(false);
  //   setUser(true);
  // }
return (
    <div>
      <Reset/>
      <GlobalStyle/>
      <Header/>
      <div className="categoryContainer">
        <VerifiedUsers />
      </div>
      <Footer />

    </div>
);
};

export default CategoryUser;