import React, { useState } from 'react';
import BlueButton from './BlueButton';
import { LoginForm } from './LoginForm';
import './LoginPage.css';
import { motion } from "framer-motion";
import styled from 'styled-components';

export const BackDrop =styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  // background: rgb(29,87,96);
  //   background: linear-gradient(180deg, rgba(29,87,96,1) 0%, rgba(226,233,235,1) 99%, rgba(232,238,239,1) 100%, rgba(255,255,255,1) 100%);
  background: rgb(29,87,96);
background: linear-gradient(58deg, rgba(29,87,96,1) 20%, rgba(232,238,239,1) 100%);
`;
function LoginPage(){

  
  return (
    
  <div className='AppContainer'>
    <div className='BoxContainer'>
      <div className='Topcontainer'>
        <BackDrop />
        <div className='HeaderContainer'>
          <h2 className='HeaderText'>Welcome</h2>
          <h2 className='HeaderText'>Back</h2>
          <h5 className='smallText'>Please Sign-in to Continue</h5>
        </div>
      </div>
      <div className='innercontainer'>
        <LoginForm/>
      </div>
    </div>
  </div>
  );
  }
export default LoginPage;
