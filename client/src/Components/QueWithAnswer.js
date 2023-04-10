import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './QueWithAnswer.css';

import point from '../images/Icon/rightArrow.png';
import {  useState } from 'react';
import Popup from './Popup';


function QueWithAnswer(props){


    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return(
        <div className='queWithAns'>
            <Container>
                <Row className={props.key}>
                    <Col xs={1}><img className='pointIcon' src={point} alt='Point Logo' /></Col>
                    <Col onClick={togglePopup}>{props.queTitle}</Col>
                </Row>

                {isOpen && <Popup
                    content={<>
                        <h2>{props.queTitle}</h2>
                        <p>{props.queDescription}</p>
                    </>}
                    handleClose={togglePopup}
                    />}
            </Container>
        </div>
    );
}

export default QueWithAnswer;