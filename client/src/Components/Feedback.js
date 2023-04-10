import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Feedback.css';
import feedback from '../images/Icon/feedback.png';
import Header from "./Header";
import Footer from './Footer';
import { Outlet, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import disFace from '../images/Icon/disappointed.png';
import pensive from '../images/Icon/pensive.png';
import neutral from '../images/Icon/neutral.png';
import normalSmile from '../images/Icon/normalSmile.png';
import extremelyHappy from '../images/Icon/extremeHappy.png';
import axios from 'axios';
import Modal from 'react-modal';


function Feedback(){

    const [emojiValue, setEmojiValue] = useState(0);
    const [category, setCategory] = useState(0);
    const [feedbackDescription, setFeedbackDescription] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const closeModal = () => {
        setModalIsOpen(false);
      };

    const handleEmoji = (value) => {
        
        setEmojiValue(value);
        
    }
    useEffect(() => {
        console.log(emojiValue);
      }, [emojiValue]);

    const handleCategory = (value) => {
        setCategory(value);
    }
    useEffect(() => {
        console.log(category);
      }, [category]);


    const handleFeedbackDescription = (e) => {
        setFeedbackDescription(e.target.value);
    }
    useEffect(() => {
        console.log(feedbackDescription);
      }, [feedbackDescription]);



    const handleCreateFeedback = async (e) => {
        e.preventDefault();
        const formData = {
            emojiValue: emojiValue,
            category: category,
            feedbackDescription: feedbackDescription
        }
        console.log(formData);
        await axios.post("http://localhost:3005/feedbacks", formData).then((res) => {
          console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        setModalIsOpen(true);

    }





return(
    <div  className="feedbackContainer">
        <Container fluid>
            
            <div className="feedbackRow">
                <Row>
                    <Col>
                        <Row className="titleRow">
                            <Col xs={3}><img src={feedback} alt='Feedback Icon' /></Col>
                            <Col><h2>We would like your feedback to improve our website.</h2></Col>
                        </Row>
                        <Row>
                            <Col xs={12} className="textRow"><p>What is your opinion at this stage?</p></Col>

                            <Col className="emojiRow">

                            {/* <OverlayTrigger overlay={<Tooltip id="tooltip">Disappointed</Tooltip>}>
                                    <span className="d-inline-block">
                                    <img src={disFace} alt='Disappointed' />
                                    </span>
                                </OverlayTrigger>

                                <OverlayTrigger overlay={<Tooltip id="tooltip">Dislike</Tooltip>}>
                                    <span className="d-inline-block">
                                    <img src={pensive} alt='Pensive' />
                                    </span>
                                </OverlayTrigger>

                                <OverlayTrigger overlay={<Tooltip id="tooltip">Neutral</Tooltip>}>
                                    <span className="d-inline-block">
                                    <img src={neutral} alt='Neutral' />
                                    </span>
                                </OverlayTrigger>

                                <OverlayTrigger overlay={<Tooltip id="tooltip">Agree</Tooltip>}>
                                    <span className="d-inline-block">
                                    <img src={normalSmile} alt='Normal Smile' />
                                    </span>
                                </OverlayTrigger>

                                <OverlayTrigger overlay={<Tooltip id="tooltip">ExtremeHappy</Tooltip>}>
                                    <span className="d-inline-block">
                                    <img src={extremelyHappy} alt='Extremely Happy' />
                                    </span>
                                </OverlayTrigger> */}
                                <img src={disFace} onClick={() => handleEmoji(0)} alt='Disappointed' />
                                <img src={pensive} onClick={() => handleEmoji(1)} alt='Pensive' />
                                <img src={neutral} onClick={() => handleEmoji(2)} alt='Neutral' />
                                <img src={normalSmile} onClick={() => handleEmoji(3)} alt='Normal Smile' />
                                <img src={extremelyHappy} onClick={() => handleEmoji(4)} alt='Extremely Happy' />
                            </Col>
                        </Row>
                        <Row></Row>
                        <Row className="categoryRow">
                            <Col xs={12}><p>Please select your feedback category below.</p></Col>
                            <Col xs={4} onClick={() => handleCategory(0)} className='feedbackCategory'>Suggestion</Col>
                            <Col xs={4} onClick={() => handleCategory(1)} className='feedbackCategory'>Something need to change</Col>
                            <Col xs={4} onClick={() => handleCategory(2)} className='feedbackCategory'>Compliment</Col>
                        </Row>
                        <Form>
                            
                            <Form.Group className="mb-3" controlId="feedbackComment">
                                <Form.Control as="textarea" value={feedbackDescription} onChange={handleFeedbackDescription} rows={8} placeholder='Please leave your feedback here.'/>
                            </Form.Group>
                            <ButtonToolbar className="justify-content-center">
                            <Button variant="primary" type="submit" onClick={handleCreateFeedback}>
                                Submit Feedback
                            </Button>
                            </ButtonToolbar>
                        </Form>
                        <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={{
                                        content: {
                                        top: '45%',
                                        left: '50%',
                                        right: 'auto',
                                        bottom: 'auto',
                                        marginRight: '-50%',
                                        transform: 'translate(-50%, -50%)',
                                        padding: '30px',
                                        borderRadius: '20px',
                                        },
                                        overlay: {
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        },
                                    }}
                                    >
                                        <div className="modalContainer">
                                            <Row>
                                                <Col><h2>Feedback submitted successfully!</h2></Col>
                                            </Row>
                                            <Row>
                                                <Col><p>What would you like to do next?</p></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}><Link to="/"><button className="linkToHome">Go to Home Page</button></Link></Col>
                                                <Col xs={6}><Link to="/feedback"><button onClick={() => {setModalIsOpen(false)}} className="linkToAsk">Give Feedback</button></Link></Col>
                                             </Row>
                                        </div>
                                </Modal>
                    </Col>
                    {/* <Col xs={3}>

                    <div className='preansweredQuestionRow'>
                        <Row className='preansweredQuestionTitle'><Col>PreAnswered Questions:</Col></Row>
                            <Row>
                            <Col>
                                <QueWithAnswer />
                                <QueWithAnswer />
                                <QueWithAnswer />
                                <QueWithAnswer />
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
                    
                    </Col> */}
                </Row>
            </div>
        </Container>
        <Outlet />
    </div>
);
};
export default Feedback;