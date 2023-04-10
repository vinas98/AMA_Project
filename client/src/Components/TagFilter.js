import './TagFilter.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import searchIcon from '../images/Icon/search.png';


function TagFilter(){
    return(
        <div className='tagFilter'>
            <Container>
                <Row>
                    <Col className='searchIcon'><img src={searchIcon} alt='SearchIcon' /></Col>
                    <Col xs={12} className='tagText'>Custom filters based on tags and authors will be implemented later.</Col>
                </Row>
            </Container>
        </div>
    );
}

export default TagFilter;