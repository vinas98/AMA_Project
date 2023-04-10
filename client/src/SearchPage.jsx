import React from "react";
import {Reset} from 'styled-reset';
import Header from "./Components/Header";
import {createGlobalStyle} from 'styled-components';
import Footer from "./Components/Footer";
import SearchedQuestion from "./Components/SearchedQuestions";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
  body {
    background: black;
    color: pink;
    text-decoration: none;
  }
  .searchPageContainer{
    padding-top: 10px;
    background-color: rgba(232,238,239,1);
    font-family: sofia-pro, sans-serif;
    padding-bottom: 30px;
  }
`;

const SearchPage = () => {
return (
    <div>
      <Reset/>
      <GlobalStyle/>
      <Header/>
      <div className="searchPageContainer">
      {/* <SearchBar /> */}
      <SearchedQuestion />
      </div>
      <Footer />

    </div>
);
};

export default SearchPage;