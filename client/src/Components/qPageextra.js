import QuestionRow from './QuestionRow';
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './QuestionPage.css';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import QueWithAnswer from './QueWithAnswer';
import TagFilter from './TagFilter';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';



const QuestionPage = () => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.SearchBar).get('q');
    console.log(searchQuery);

    // const history = useNavigate();
    // const searchQuery = props.searchQuery;
    // console.log(props)
    // console.log(searchQuery);
    const [questions, setQuestions] = useState([]);
    const [preansweredQuestions, setPreansweredQuestions] = useState([]);

    // const [searchQuery, setSearchQuery] = useState("");
   
    // const [searchQuery, setSearchQuery] = useState("");
    // const [searchedQuestions, setSearchedQuestions] = useState([]);
    // console.log(isFiltered);
    // console.log(props.questionData);

    

    useEffect(() => {
        fetchData();
        fetchPreansweredData();
        // setData();
    }, []);

    // const setQuery = () => {
    //     // setSearchQuery(props.searchQuery);
    //     console.log("Hi");
    // }

    const fetchData = async () => {
        await axios.get('http://localhost:3005/questions')
        .then(res => {
        setQuestions(res.data.questions);
        console.log(res.data)
        })
        .catch(err => {
        console.log(err);
        });
    }


    // const setData = async (e) => {
    //     e.preventDefault();
    //     if(searchQuery.length > 0){
    //         await axios.get(`http://localhost:3005/searchQuestions/${searchQuery}`)
    //         .then(res => {
    //         // setSearchedQuestions(res.data);
    //         // history('/searchPage', { state: { searchedQuestions} });
    //         console.log(res.data)
    //         })
    //         .catch(err => {
    //         console.log(err);
    //         });
    //         }
    // }


    const fetchPreansweredData = async () => {
        await axios.get('http://localhost:3005/preansweredQuestions')
        .then(res => {
        setPreansweredQuestions(res.data.preansweredQuestions);
        })
        .catch(err => {
        console.log(err);
        });
    }

return(
    <div>
        <SearchBar/>
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
                    <QuestionRow questionTitle={e.title} keyId={e._id} tags={e.tags}/>
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
    </div>
);
};
export default QuestionPage;