import React from "react";
import {Reset} from 'styled-reset';
import Header from "./Components/Header";
import {createGlobalStyle} from 'styled-components';
import QuestionPage from './Components/QuestionPage';
import SearchBar from "./Components/SearchBar";
import Footer from "./Components/Footer";
import { useLocation } from "react-router-dom";


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
  body {
    background: black;
    color: pink;
    text-decoration: none;
  }
  .home{
    border-radius: 8px;
    border: none;
    background-color: #c2e7fe;
  }
  .homeContainer{
    background-color: rgba(232,238,239,1);
    padding-bottom: 120px;
  }
`;

const Home = () => {

  // const { state } = useLocation();
  // const data = state && state.token;
  // console.log(data.length);
  // const user


return (
    <div className="home">
      <Reset/>
      <GlobalStyle/>
      <Header />
      <div className="homeContainer">
      <SearchBar/>
      <QuestionPage/>
      </div>
      <Footer />

    </div>
);
};

export default Home;