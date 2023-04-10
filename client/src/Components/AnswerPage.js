import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, Link, Navigate, useNavigate } from "react-router-dom";
import './AnswerPage.css';
import QueWithAnswer from './QueWithAnswer';
import TagFilter from './TagFilter';
import QuestionInAnswerPage from './QuestionInAnswerPage';
import Answer from './Answer';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-modal';

const AnswerPage = () => {

   
    const navigate = useNavigate();

     //modules for textEditor
     const modules = {
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
      }


    const [description, setDescription] = useState("");
    const [preansweredQuestions, setPreansweredQuestions] = useState([]);
    const [answers, setAnswers] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    


    const location = useLocation();
    const queId = location.state.queId;
    const userId = location.state.userId;
    const userName = location.state.userName;
    const badgeValue = location.state.badgeValue;
    console.log(queId);
    console.log(userId);

    useEffect(() => {
        fetchPreansweredData();
        fetchAnswers();
    }, []);


    const fetchPreansweredData = async (e) => {
        await axios.get('http://localhost:3005/preansweredQuestions')
        .then(res => {
        setPreansweredQuestions(res.data.preansweredQuestions);
        console.log(res.data)
        })
        .catch(err => {
        console.log(err);
        }); 
    }

    const fetchAnswers = async () => {
        await axios.get(`http://localhost:3005/answers/${queId}`)
        .then(res => {
        setAnswers(res.data.answer);
        console.log(res.data)
        })
        .catch(err => {
        console.log(err);
        }); 
    }


    const handleDescriptionChange = (value) => {
        setDescription(value);
        console.log(description);
    }
    const closeModal = () => {
        setModalIsOpen(false);
      };

  //   const [formData, setFormData] = useState([]);

    const handleSubmitQuestion = async (e) => {
      e.preventDefault();
      if(userId === null){
        navigate("/");
      }else{
        console.log(description);
        const formData = {
            questionId:queId,
            description:description,
            userId: userId,
            userName: userName
        }
        console.log(formData);
        await axios.post(`http://localhost:3005/answer`, formData).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
  
        await axios.put(`http://localhost:3005/updateAnswer/${queId}`)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
        console.log(err);
        });
        setDescription("");
        setModalIsOpen(true);
      }

    }

    
return (
    <div className='answerContainer'>
        <Container>
            <Row>
                <Col xs={9}>
                    <div className='answerRow'>
                        <Row className='questionInAnswerRow'>
                            <Col><QuestionInAnswerPage queId={queId} userName = {userName} badgeValue = {badgeValue}/></Col>
                        </Row>
                        <Row >
                            <div className='answersCotainer'>
                                <Col>
                                    {Array.isArray(answers) && answers.map((e)=>{
                                    return (
                                    <Answer key={e._id} description={e.description} ansId = {e._id} authorName = {e.userName} authorId = {e.userId}/>
                                    );})}
                                </Col>
                            </div>
                        </Row>
                        <Row>
                            <Col><h2>Leave your valuable answer here</h2></Col>
                        </Row>
                        <Row>
                        <Form className='formContainer' onSubmit={handleSubmitQuestion}>
                           
                            <Form.Group className="mb-3">
                                <ReactQuill className='textEditor'
                                name="description"
                                onChange={handleDescriptionChange}
                                value={description}
                                placeholder={"Add more details to get the best answer..."} theme="snow" modules={modules}  />
                                
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button className='buttonInAskPage' id="submitButton" variant="info" type="submit">Submit your Answer</Button>
                            </Form.Group>
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
                                                <Col><h2>Answer submitted successfully!</h2></Col>
                                            </Row>
                                            <Row>
                                                <Col><p>What would you like to do next?</p></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={3}></Col>
                                                <Col><Link to="/"><button className="linkToHome">Go To Home Page</button></Link></Col>
                                            </Row>
                                        </div>
                                </Modal>
                        </Row>
                    </div>
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
        <Outlet />
    </div>
);
}

export default AnswerPage;
