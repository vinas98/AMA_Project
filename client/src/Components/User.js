import './User.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import axios from 'axios';

const User = (props) => {

    const userId = props.userId;
    console.log(userId)
    const [answers, setAnswers] = useState(0);
    const [badgeValue, setBadgeValue] = useState("");
    const [numberOfAnswer, setNumberOfAnswer] = useState(0);
    const [numberOfQuestion, setNumberOfQuestion] = useState(0);

    useEffect(() => {
        fetchAuthorBadge(userId);
        fetchNumberOfQuestions(userId)
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

    const fetchNumberOfQuestions = async (e) => {
        await axios.get(`http://localhost:3005/questionsByUser/${e}`)
        .then(res => {
            setNumberOfQuestion(res.data.question.length);
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

    return(
        <div className='user'>
            <h3 className='userNameInUser'>{props.name}</h3>
            <p className='userBadge'>({badgeValue})</p>
            <p className='centerAligned'>{props.email}</p>
            <p className='centerAligned'><span className='lightText'>Asked Questions:</span> {numberOfQuestion}</p>
            <p className='centerAligned'><span className='lightText'>Answered Questions: </span> {numberOfAnswer}</p>
        </div>
    );
}

export default User;