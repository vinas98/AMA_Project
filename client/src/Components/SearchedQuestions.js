import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Header from "./Header"
import QuestionRow from "./QuestionRow";
import './SearchedQuestions.css'
import TagFilter from "./TagFilter";
import axios from "axios";
import { useEffect, useState } from "react";
import QueWithAnswer from "./QueWithAnswer";

const SearchedQuestion = () => {
    const location = useLocation();
    const searchBarData = location.state.searchBarData;
    const filteredData = location.state.filteredData;
    console.log(filteredData);

    useEffect(() => {
        fetchPreansweredData();
    }, []);

    const [preansweredQuestions, setPreansweredQuestions] = useState([]);
    const fetchPreansweredData = async () => {
        await axios.get('http://localhost:3005/preansweredQuestions')
        .then(res => {
        setPreansweredQuestions(res.data.preansweredQuestions);
        console.log(res.data)
        })
        .catch(err => {
        console.log(err);
        });
    }

    return(
    <div className="searchQuestionsContainer">
        <div className="searchQuestionsBox">
        <Container>
            
            <Row>
                <Col xs={9}>
                    <div className="searchText">
                        <p>Search Results for: </p>
                        <h2>{searchBarData}</h2>
                    </div>
                {Array.isArray(filteredData) && filteredData.map((e)=>{
                    return (
                    <QuestionRow questionTitle={e.title} keyId={e._id} tags={e.tags} view={e.view} answer={e.answered} vote = {e.like - e.dislike}/>
                    );})}
                    {/* <QuestionRow /> */}
                </Col>
                <Col xs={3}>

                   <div className='preansweredQuestionRow'>
                       <Row className='preansweredQuestionTitle'><Col>PreAnswered Questions:</Col></Row>
                        <Row>
                        <Col>
                        {Array.isArray(preansweredQuestions) && preansweredQuestions.map((e)=>{
                            return (
                            <QueWithAnswer queTitle={e.title} key={e._id} queDescription={e.description}/>
                            );})}
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
                   
                </Col>
            </Row>
        </Container>
        </div>
    </div>
    );
}

export default SearchedQuestion;