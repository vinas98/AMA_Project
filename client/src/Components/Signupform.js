import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import './LoginPage.css';
import { motion } from "framer-motion";
import styled from 'styled-components';

export const Submitbutton = styled.button`

    width: 100%;
    padding: 11px 40%;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    margin-top: 10px;
    transition: all, 240ms ease-in-out;
    background: rgb(139,210,150);
background: linear-gradient(58deg, rgba(139,210,150,1) 20%, rgba(119,167,118,1) 100%);

&:hover{
    filter: brightness(1.03);
`;
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
  background: rgb(139,210,150);
background: linear-gradient(58deg, rgba(139,210,150,1) 20%, rgba(119,167,118,1) 100%);
`;
function Signupform(){

  //this is for registration of user
  const [register , setRegister] = useState(false);
  const [email , setEmail] = useState("")
  const [fname , setFname] = useState("")
  const [passwrd , setPasswd ] = useState("")
  const [cpasswrd , setCpasswrd] = useState("")
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState("")


  //this is for form handling js for an error like all fied is required
  const handleSignup = (e) => {
    e.preventDefault()
    setError("")
    setLoading(false)
    if(fname === "" || email === "" || passwrd ==="" || cpasswrd === "")  
    {
      setError("This field is required");
      setLoading(false);
    }
    else{
      createUserWithEmailAndPassword(auth, email, passwrd).then((res) => {
        console.log(res)
        setLoading(false)
      }).catch((error) => {
        console.log(error.code)
        setError(error.message)
        setLoading(false)
      })
    }
  };
    return(
        
  <div className='AppContainer'>
  <div className='BoxContainer'>
    <div className='Topcontainer'>
      <BackDrop />
      <div className='HeaderContainer'>
        <h2 className='HeaderText'>Welcome</h2>
        <h2 className='HeaderText'></h2>
        <h5 className='smallText'>Please Sign-up to Continue</h5>
      </div>
    </div>
    <div className='innercontainer'>
    <div className="boxcontainer">
            <div className="FormContainer">
                <input classname = "input1" onChange={(e) => setFname(e.target.value)} type="text" placeholder="Full Name"/>
                <input classname = "Inputsu" onChange={(e) => setEmail(e.target.value)} type= "email" placeholder="Email"/>
                <input classname = "Inputsu" onChange={(e) => setPasswd(e.target.value)} type= "Password" placeholder="Password"/>
                <input classname = "Inputsu" onChange={(e) => setCpasswrd(e.target.value)} type= "Password" placeholder="Confirm Password"/>
               
                <Submitbutton type = "submit" onClick={handleSignup} disabled = {loading}>{setLoading ? 'SignUP' : "Sign UP"}</Submitbutton>
                <a className="MutedLink"> Allready Have an account&nbsp;<a className="MutedLink" href="#">Singin</a></a>
            </div>
        </div>
    </div>
  </div>
</div>
    
    );
}

export default Signupform;