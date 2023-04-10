import './QuestionInAnswerPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VoteAndAuthor from './VoteAndAuthor';
import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom'
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function QuestionInAnswerPage(props){

    const parse = require('html-react-parser');

    const queId = props.queId;
    useEffect(() => {
        fetchData();
        getTimeInterval();
        fetchAnswers();
    }, []);
    
    

    const [questions, setQuestions] = useState({
        _id:"",
        title:"",
        description:"",
        view: ""
    });
    const [timeAgo, setTimeAgo] = useState("");
    const [answers, setAnswers] = useState([]);

    const getTimeInterval = async (time) => {
        const diff = Date.now() - time;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) {
            setTimeAgo(`${seconds} sec ago`);
        } else if (minutes < 60) {
            setTimeAgo(`${minutes} min ago`);
        } else if (hours < 24) {
            setTimeAgo(`${hours} hr ago`);
        } else if (days < 30){
            setTimeAgo(`${days} days ago`);
        }else if (months < 12){
            setTimeAgo(`${months} months ago`);
        }else{
            setTimeAgo(`${years} years ago`);
        }
    }

    const fetchAnswers = async () => {
        await axios.get(`http://localhost:3005/answers/${queId}`)
        .then(res => {
        setAnswers(res.data.answer);
        console.log(res.data)
        })
        .catch(err => {
        console.log(err);
        }); 
    }
    
    const fetchData = async () => {
        await axios.get(`http://localhost:3005/questions/${queId}`)
        .then(res => {
        getTimeInterval(res.data.question.createdAt);
        console.log("hi");
        updateView(res.data.question);
        })
        .catch(err => {
        console.log(err);
        });
    }

    const updateView = async () => {
        await axios.put(`http://localhost:3005/updateView/${queId}`)
        .then(res => {
            console.log(res.data)
            setQuestions(res.data.question);
        })
        .catch(err => {
        console.log(err);
        });
    }

    const handleLikeCount = async () => {
        await axios.put(`http://localhost:3005/updateLike/${queId}`)
        .then(res => {
            console.log(res.data)
            setQuestions(res.data.question);
        })
        .catch(err => {
        console.log(err);
        });
    }
    const handleDislikeCount = async () => {
        await axios.put(`http://localhost:3005/updateDislike/${queId}`)
        .then(res => {
            console.log(res.data)
            setQuestions(res.data.question);
        })
        .catch(err => {
        console.log(err);
        });
    }

    return(
        <div>
            <Container>
            <div className='questionTitleContainerInAnswer'>
                <Row className='questions._id'>
                    <Col xs={12}><h2 className='questionTitleInAnswer'>{questions.title}</h2></Col>
                </Row>
                <Row>
                    <Col xs={2}><p><div className='lightText'>Asked: </div>{timeAgo}</p></Col>
                    <Col xs={2}><p><div className='lightText'>Viewed: </div> {`${questions.view} Times`}</p></Col>
                    <Col xs={8}><p><div className='lightText'>Answered: </div>{`${answers.length} times`}</p></Col>
                </Row>
            </div>
            <div className='questionDetailsContainerInAnswer'>
                <Row>
                    <Col>
                    <p>{parse(questions.description)}</p>
                    </Col>
                </Row>
                {/* <Row>
                <VoteAndAuthor queId = {props.queId}/>
                </Row> */}
                <Row className='voteAndAuthorContainer'>
                    <Col>
                        <div className="likeContainer">
                            <ul>
                                <li><FontAwesomeIcon onClick={handleLikeCount} icon={faThumbsUp} size="xl" style={{color: "#32548f",}} /></li>
                                <li><h4 className="likeCount">{questions.like}</h4></li>
                            </ul>
                            
                        </div>
                    </Col>
                    <Col>
                        <div className="dislikeContainer">
                            <ul>
                                <li><FontAwesomeIcon onClick={handleDislikeCount} icon={faThumbsDown} size="xl" style={{color: "#32548f",}} /></li>
                                <li><h4 className="dislikeCount">{questions.dislike}</h4></li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="userContainer">
                            <ul>
                                <li><FontAwesomeIcon icon={faUser} size="xl" style={{color: "#32548f",}}/></li>
                                <li><h4 className="userName authorText">{questions.userName} ({props.badgeValue})</h4></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
            </Container>
        </div>
    );
}
export default QuestionInAnswerPage;