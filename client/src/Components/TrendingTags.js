import './TrendingTags.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tag from './Tag';
import trandingTag from '../images/Icon/trendingTag.png';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';


const TrendingTags= () => {

    const [tags, setTags] = useState(null);
    useEffect(() => {
        fetchTags();
    }, [tags]);
    const fetchTags = async () => {
        await axios.get(`http://localhost:3005/fetchTag`)
        .then(res => {
        setTags(res.data.tag);
        })
        .catch(err => {
        console.log(err);
        }); 
    }
    return(
        <div>
            <Container fluid>
                <Row><Col className='searchInTag'><SearchBar /></Col></Row>
                <div  className='tagInTrending'>
                <Row>
                    <Col xs={5}><img src={trandingTag} alt='TrendingTag Icon' /></Col>
                    <Col><h2>Some Information about Tags....</h2></Col>
                </Row>
                <Row className='users-container'>
                    {Array.isArray(tags) && tags.map((e)=>{
                    return (
                    <Col xs={3}><Tag key = {e._id} tagName={e.tagName} tagBody={e.tagBody} /></Col>
                     );})}
                    
                </Row>
                </div>
            </Container>
        </div>
    );
}

export default TrendingTags;