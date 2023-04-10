import styled from "styled-components";
import React, {useState} from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';
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

export function LoginForm(){
const [email , setEmail] = useState("");
  const [passwrd , setPasswd ] = useState("");
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState("")
  const navigate = useNavigate();

//this is login handling event like all field is required 
  const handleSignin = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    if(email === "" || passwrd ==="")
    {
      setError("Required field is missing");
      setLoading(false);
    }
    else{
      signInWithEmailAndPassword(auth, email, passwrd).then((res) => {
        console.log(res);
        navigate('/');
        setLoading(false)
      }).catch((error) => {
        console.log(error.code)
        setError(error.message)
        setLoading(false)
      })
    }
  }
    return(
        <div className="boxcontainer">
            <div className="FormContainer">
                <input className = "Input" onChange={(e) => setEmail(e.target.value)} type= "email" placeholder="Email"/>
                <input className = "Input" onChange={(e) => setPasswd(e.target.value)} type= "Password" placeholder="Password"/>
                <a className="MutedLink" href="#"> Forget your Password</a>
                <Submitbutton type = "submit" onClick={handleSignin}>Sign&nbsp;in</Submitbutton>
                <a className="MutedLink"> Don't Have an account&nbsp;<a className="MutedLink" href="/signup">
                    Singup</a></a>
            </div>
        </div>
    );
}