import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";
import './VoteAndAuthor.css';
import upvote from '../images/Icon/upvote.png';
import downvote from '../images/Icon/downvote.png';
import profileIcon from '../images/Icon/profileIcon.png';
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const VoteAndAuthor = (props) => {
    const queId = props.queId;
    const ansId = props.ansId;
    console.log(queId);
    console.log(ansId);
    
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const handleLikeCount = () => {
        if(likes === 0){
            setLikes(likes + 1);
            updateLike();
        }
    }
    const handleDislikeCount = () => {
        if(dislikes === 0){
            setDislikes(dislikes + 1);
            updateDislike();
        }
    }

    const updateLike = () => {

    }
    const updateDislike = () => {}

    return(
        <div>
            <Container className="voteAndAuthorContainer">

                <Row>
                    <Col>
                        <div className="likeContainer">
                            <ul>
                                <li><FontAwesomeIcon onClick={handleLikeCount} icon={faThumbsUp} size="xl" style={{color: "#32548f",}} /></li>
                                <li><h4 className="likeCount">{likes}</h4></li>
                            </ul>
                            
                        </div>
                    </Col>
                    <Col>
                        <div className="dislikeContainer">
                            <ul>
                                <li><FontAwesomeIcon onClick={handleDislikeCount} icon={faThumbsDown} size="xl" style={{color: "#32548f",}} /></li>
                                <li><h4 className="dislikeCount">{dislikes}</h4></li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className="userContainer">
                            <ul>
                                <li><FontAwesomeIcon icon={faUser} size="xl" style={{color: "#32548f",}}/></li>
                                <li><h4 className="userName">Rohan</h4></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>    
        </div>
    );
}

export default VoteAndAuthor;