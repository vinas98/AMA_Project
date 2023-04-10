import QuestionRow from './QuestionRow';
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './QuestionPage.css';
import { Outlet, Link, useLocation } from "react-router-dom";
import QueWithAnswer from './QueWithAnswer';
import TagFilter from './TagFilter';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';




const QuestionPage = () => {

    const [questions, setQuestions] = useState([]);
    const [preansweredQuestions, setPreansweredQuestions] = useState([]);
    const [token, setToken] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loggedInUserName, setLoggedInUserName] = useState(null);
    const [authorName, setAuthorName] = useState("Anonymous")


    const fetchPreansweredData = async () => {
        await axios.get('http://localhost:3005/preansweredQuestions')
        .then(res => {
        setPreansweredQuestions(res.data.preansweredQuestions);
        console.log(res.data)
        })
        .catch(err => {
        console.log(err);
        });
    }
    // console.log(isFiltered);
    // console.log(props.questionData);

    

    useEffect(() => {
        fetchData();
        fetchPreansweredData();
        const authToken = Cookies.get('Authorization');
        if (authToken) {
          setToken(authToken);
        } 
        console.log('Authorization cookie:', authToken);
      }, []);
      
      useEffect(() => {
        if (token) {
          fetchUser(token);
        }
      }, [token]);
      


    const fetchData = async () => {
        await axios.get('http://localhost:3005/questions')
        .then(res => {
        setQuestions(res.data.questions);
        console.log(res.data)
        fetchAuthorName(res.data.questions.userId);
        })
        .catch(err => {
        console.log(err);
        });
    }
    const fetchUser = async (token) => {
        try {
          const response = await axios.post(`http://localhost:3005/check-auth`, {token});
          console.log(response.data);
          setLoggedInUser(response.data.user._id);
          setLoggedInUserName(response.data.user.name);
        } catch (error) {
          console.log(error);
          window.alert(error);
        }
      };

      const fetchAuthorName = async (authorId) => {
        await axios.post(`http://localhost:3005/fetchAuthor`, {authorId})
        .then(res => {
        setAuthorName(res.data.user.name);
        })
        .catch(err => {
        console.log(err);
        });
      }

    

return(
    <div className='questionContainer'>
        <Container>
            {/* <Row>
                <Col><h2 className='titleLeft'>Correct Answers for Question</h2></Col>
                <Col><Link to='/ask'><AskQuestionButton /></Link></Col>
            </Row> */}
            <Row>
                <Col xs={9}>
                    {/* <h1>{Data.title}</h1> */}
                {Array.isArray(questions) && questions.map((e)=>{
                    return (
                    <QuestionRow questionTitle={e.title} keyId={e._id} tags={e.tags} view={e.view} answer={e.answered} loggedInUser = {loggedInUser} authorName = {e.userName} authorId = {e.userId} loggedInUserName = {loggedInUserName} vote = {e.like - e.dislike}/>
                    );})}
                    {/* <QuestionRow /> */}
                </Col>
                <Col xs={3}>

                   <div className='preansweredQuestionRow'>
                       <Row className='preansweredQuestionTitle'><Col>PreAnswered Questions:</Col></Row>
                        <Row>
                        <Col>
                        {Array.isArray(preansweredQuestions) && preansweredQuestions.map((e)=>{
                            return (
                            <QueWithAnswer queTitle={e.title} key={e._id} queDescription={e.description}/>
                            );})}
                        </Col>
                        </Row>
                    </div>
                   <div className='tagFilterRow'>
                       <Row className='tagFilterTitle'>
                           <Col>Tag Filter</Col>
                       </Row>
                        <Row >
                            <Col><TagFilter /></Col>
                        </Row>
                   </div>
                   
                </Col>
            </Row>
        </Container>
        <Outlet />
    </div>
);
};
export default QuestionPage;