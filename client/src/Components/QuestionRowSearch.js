import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/esm/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './QuestionRow.css';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheckToSlot} from '@fortawesome/free-solid-svg-icons';
import {faComments} from'@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function QuestionRowSearch(props){

    const parse = require('html-react-parser');
    return(
       <Link style={{textDecoration: 'none'}} to={'/answer'} state={{ queId: props.keyId }}>
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
                        <div className='viewInsQuestion'>
                            <ul>
                                <li><FontAwesomeIcon icon={faEye} style={{color: "#39739d",}}/></li>
                                <li><p className='viewCount'>51 views</p></li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div className='voteInsQuestion'>
                            <ul>
                                <li><FontAwesomeIcon icon={faCheckToSlot}  style={{color: "#39739d",}} /></li>
                                <li><p className='voteCount'>14 votes</p></li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div className='answerInsQuestion'>
                            <ul>
                                <li><FontAwesomeIcon icon={faComments} style={{color: "#39739d",}}/></li>
                                <li><p className='answerCount'>15 answers</p></li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={6}><p className='authorText'>Author: <span href='#'>Vinas</span></p></Col>
                </Row>
            </Container>
            </div>
            </Link>
    );
}
export default QuestionRowSearch;