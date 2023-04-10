import { useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';
import './AskPage.css';
import askLogo from '../images/Icon/ask.png';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-modal';
import { Link, useLocation } from "react-router-dom";



const AskPage = () => {


    const location = useLocation();
    const userId = location.state.userId;
    const userName = location.state.userName;
    console.log(userId);
    console.log(userName);
    
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

      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [tags, setTags] = useState([]);
      const [disabled, setDisabled] = useState(false);
      const [modalIsOpen, setModalIsOpen] = useState(false);


      const closeModal = () => {
        setModalIsOpen(false);
      };

      const handleInputFocus = () => {
        setDisabled(true);
      };
    
      const handleInputBlur = () => {
        setDisabled(false);
      };

      const handleKeyDown = (e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
          setTags([...tags, e.target.value.trim()]);
          e.target.value = "";
        }
      };

      const removeTag = (index) => {
        setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
      };


      const handleTitleChange = (e) => {
          setTitle(e.target.value);
          console.log(title);
      }

      const handleDescriptionChange = (value) => {
          setDescription(value);
          console.log(description);
      }

    //   const [formData, setFormData] = useState([]);

      const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        console.log(title);
        console.log(description);
        const createdAt = Date.now();
        
        const formData = {
            title:title,
            description:description,
            tags:tags,
            createdAt: createdAt,
            userId: userId,
            userName: userName
        }
        console.log(formData);
        await axios.post("http://localhost:3005/questions", formData).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
        console.log(tags);
        setTags([]);
        setDescription("");
        setTitle("");
        setModalIsOpen(true);

         }


    
    return(
        <div className='askPageContainer'>
            <Container fluid>
                <div className='innerContainer'>
                <Row className="titleRowInAskPage">
                    <Col xs={4}><img src={askLogo} alt='Ask Icon' /></Col>
                    <Col><h2>Ask your good question.</h2></Col>
                </Row>
                <Row>
                    <Col>
                        <Form className='formContainer' onSubmit={handleSubmitQuestion}>
                            <Form.Group className="mb-3">
                                <Form.Label className='titleLable'>Title</Form.Label>
                                <Form.Control type="text" 
                                    onChange={handleTitleChange}
                                    value={title}
                                    className='titleInput'
                                    name="title" placeholder="What's your question? Be specific and unique..." />
                            </Form.Group>
                           
                            <Form.Group className="mb-3">
                                <Form.Label className='titleDescription'>Description</Form.Label>
                                <ReactQuill className='textEditor'
                                name="description"
                                onChange={handleDescriptionChange}
                                value={description}
                                placeholder={"Add more details to get the best answer..."} theme="snow" modules={modules}  />
                                
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="titleTag">Related Tags</Form.Label>
                                    <Form.Control type="text" 
                                    onKeyDown={handleKeyDown}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className='tagInput'
                                    id="tags"
                                    name="title" placeholder="Enter tags which are related to your question..." />
                                    { tags.map((tag, index) => (
                                        <div className="tag-item" key={index}>
                                            <span className="text">{tag}</span>
                                            <span className="close" onClick={() => removeTag(index)}>&times;</span>
                                        </div>
                                    )) }
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button disabled={disabled} className='buttonInAskPage' id="submitButton" variant="info" type="submit">Submit a question</Button>
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
                                                <Col><h2>Question submitted successfully!</h2></Col>
                                            </Row>
                                            <Row>
                                                <Col><p>What would you like to do next?</p></Col>
                                            </Row>
                                            <Row>
                                                <Col xs={6}><Link to="/"><button className="linkToHome">Go to Home Page</button></Link></Col>
                                                <Col xs={6}><Link to="/ask"><button onClick={() => {setModalIsOpen(false)}} className="linkToAsk">Ask New Question</button></Link></Col>
                                            </Row>
                                        </div>
                                </Modal>

                    </Col>
                </Row>
                {/* <Row>
                    <Col></Col>
                </Row> */}
                {/* <Row>
                    <Col><Form  className='formContainer'>
                        <Button className='buttonInAskPage' variant="info" type="submit">Submit a question</Button>
                    </Form></Col>
                </Row> */}
                </div>
            </Container>
        </div>
    );
}
export default AskPage;