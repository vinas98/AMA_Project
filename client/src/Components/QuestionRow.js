import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/esm/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './QuestionRow.css';
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckToSlot} from '@fortawesome/free-solid-svg-icons';
import {faComments} from'@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function QuestionRow(props){

    
    const loggedInUser = props.loggedInUser;
    const loggedInUserName = props.loggedInUserName;
    const authorId = props.authorId;
    const [numberOfAnswer, setNumberOfAnswer] = useState(0);
    const [badgeValue, setBadgeValue] = useState("");

    useEffect(() => {
        fetchAuthorBadge(authorId);
    }, []);

    const fetchAuthorBadge = async (e) => {
        await axios.get(`http://localhost:3005/answersByUser/${e}`)
        .then(res => {
            setNumberOfAnswer();
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

    


    const parse = require('html-react-parser');
    return(
       <Link style={{textDecoration: 'none'}} to={'/answer'} state={{ queId: props.keyId, userId : loggedInUser, userName: loggedInUserName, badgeValue: badgeValue }}>
           <div className='questionRowContainer'>
            <Container>
                <Row className={props.keyId}>
                    <Col xs={8}><h2 className='question'>{parse(props.questionTitle)}</h2></Col>
                    <Col xs={4} className="badgeRow">
                        {props.tags.map(tag => <Badge className="badge">{tag}</Badge>)}
                        {Array.isArray(props.tags) && props.tags.map((e)=>{
                            return (
                                <Badge className="badge">{e.tags}</Badge>
                            );})}
                    </Col>
                </Row>
                <Row>
                    
                </Row>
                <Row>
                    <Col>
                        <div className='viewInQuestion'>
                        <OverlayTrigger overlay={<Tooltip id="tooltip">Views</Tooltip>}>
                            <span className="d-inline-block">
                                <ul>
                                    <li><FontAwesomeIcon icon={faEye} style={{color: "#39739d",}}/></li>
                                    <li><p className='viewCount'>{`${props.view} views`}</p></li>
                                </ul>
                            </span>
                        </OverlayTrigger>
                            
                        </div>
                    </Col>
                    <Col>
                        <div className='voteInQuestion'>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Votes</Tooltip>}>
                            <span className="d-inline-block">
                                <ul>
                                    <li><FontAwesomeIcon icon={faCheckToSlot}  style={{color: "#39739d",}} /></li>
                                    <li><p className='voteCount'>{props.vote} votes</p></li>
                                </ul>
                            </span>
                        </OverlayTrigger>
                        </div>
                    </Col>
                    <Col>
                        <div className='answerInQuestion'>
                        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Answers</Tooltip>}>
                            <span className="d-inline-block">
                                <ul>
                                    <li><FontAwesomeIcon icon={faComments} style={{color: "#39739d",}}/></li>
                                    <li><p className='answerCount'>{`${props.answer} answers`}</p></li>
                                </ul>
                            </span>
                        </OverlayTrigger>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <p className='authorText'><FontAwesomeIcon icon={faUser} size="xl" style={{color: "#32548f",marginRight: "5px"}}/>    <span href='#'>{props.authorName}</span> ({badgeValue})</p></Col>
                </Row>
            </Container>
            </div>
            </Link>
    );
}
export default QuestionRow;