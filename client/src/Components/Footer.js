import './Footer.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Footer(){
    return(
        <div>
            <Container fluid className='footerColor'>
                <Row>
                    <Col className="rightFooter"><p>All rights reservered by AMA@2023</p></Col>
                </Row>
            </Container>
        </div>
    );
}
export default Footer;