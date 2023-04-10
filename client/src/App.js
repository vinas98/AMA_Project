import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import AskQuestion from './AskQuestion';
import Answer from './Answer';
import CategoryTag from './CategoryTag';
import CategoryUser from './CategoryUser';
import FeedbackJSX from './FeedbackJSX';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import SearchPage from './SearchPage';
import ForgotPassword from './Components/ForgotPassword';

function App() {

  <script src="https://kit.fontawesome.com/30b0709ba7.js" crossorigin="anonymous"></script>

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/answer' element={<Answer />} />
          <Route path='/ask' element={<AskQuestion />} />
          <Route path='/trendingTags' element={<CategoryTag />} />
          <Route path='/verifiedUsers' element={<CategoryUser />}/>
          <Route path='/feedback' element={<FeedbackJSX />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/searchedQuestion' element={<SearchPage />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          
          </Routes>
      </BrowserRouter>
     
      
    </div>
  )
  
    
    
}

export default App;
