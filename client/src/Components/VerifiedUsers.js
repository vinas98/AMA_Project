import './TrendingTags.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import User from './User';
import users from '../images/Icon/users.png';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import axios from 'axios';


function VerifiedUsers(){

    const [user, setUser] = useState(null);
    useEffect(() => {
        fetchUser();
    }, [user]);
    const fetchUser = async () => {
        await axios.get(`http://localhost:3005/fetchAllUser`)
        .then(res => {
        setUser(res.data.user);
        console.log(res.data)
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
                    <Col xs={5}><img src={users} alt='Users Icon' /></Col>
                    <Col><h2>Users Summary</h2></Col>
                </Row>
                <Row className='users-container'>
                    {Array.isArray(user) && user.map((e)=>{
                    return (
                    <Col xs={2}><User userId = {e._id} name={e.name} email={e.email} /></Col>
                     );})}
                    
                </Row>
                </div>
            </Container>
        </div>
    );
}

export default VerifiedUsers;