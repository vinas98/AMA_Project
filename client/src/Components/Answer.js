import './Answer.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VoteAndAuthor from './VoteAndAuthor';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from 'axios';


function Answer(props){

    const ansId = props.ansId;
    console.log(ansId)
    const authorId = props.authorId;
    console.log(authorId);

    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [numberOfAnswer, setNumberOfAnswer] = useState(0);
    const [badgeValue, setBadgeValue] = useState("");

    useEffect(() => {
        fetchAuthorBadge(authorId);
    }, []);

    const fetchAuthorBadge = async (e) => {
        await axios.get(`http://localhost:3005/answersByUser/${e}`)
        .then(res => {
            setNumberOfAnswer(res.data.answer.length);
            setBadge(res.data.answer.length);
        })
        .catch(err => {
        console.log(err);
        }); 
    }

    const setBadge = (e) => {
        if(e>= 0 && e <10){
            setBadgeValue("Novice");
        }else if(e>= 10 && e <25){
            setBadgeValue("Experienced");
        }else if(e>= 25 && e <51){
            setBadgeValue("Expert");
        }else if(e>= 51 && e <76){
            setBadgeValue("Elite");
        }else{
            setBadgeValue("Guru");
        }
    }


    const handleLikeCount = async () => {
        await axios.put(`http://localhost:3005/updateAnswerLike/${ansId}`)
        .then(res => {
            console.log(res.data)
            setLike(res.data.answer.like)
        })
        .catch(err => {
        console.log(err);
        });
    }
    const handleDislikeCount = async () => {
        await axios.put(`http://localhost:3005/updateAnswerDislike/${ansId}`)
        .then(res => {
            console.log(res.data)
            setDislike(res.data.answer.dislike);
        })
        .catch(err => {
        console.log(err);
        });
    }



    const parse = require('html-react-parser');
    return(
        <div>
            <Container className='borderBottom uniqueAnswer'>
                <Row className={props.ansId}>
                    <Col>{parse(props.description)}</Col>
                </Row>
                {/* <Row><VoteAndAuthor ansId = {props.ansId}/></Row> */}

                <Row className='voteAndAuthorContainer'>
                    <Col>
                        <div className="likeContainer">
                            <ul>
                                <li><FontAwesomeIcon onClick={handleLikeCount} icon={faThumbsUp} size="xl" style={{color: "#32548f",}} /></li>
                                <li><h4 className="likeCount">{like}</h4></li>
                            </ul>
                            
                        </div>
                    </Col>
                    <Col>
                        <div className="dislikeContainer">
                            <ul>
                                <li><FontAwesomeIcon onClick={handleDislikeCount} icon={faThumbsDown} size="xl" style={{color: "#32548f",}} /></li>
                                <li><h4 className="dislikeCount">{dislike}</h4></li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="userContainer">
                            <ul>
                                <li><FontAwesomeIcon icon={faUser} size="xl" style={{color: "#32548f",}}/></li>
                                <li><h4 className="userName authorText">{props.authorName} ({badgeValue})</h4></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Answer;