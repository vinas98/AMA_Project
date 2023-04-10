import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../images/logo_ama.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import profileIcon from '../images/Icon/profileIcon.png';
import './Header.css';
import { Button } from 'react-bootstrap';
import AskQuestionButton from './AskQuestionButton';
import React, {useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import Modal from 'react-modal';



function Header() {
  const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [userName, serUserName] = useState("User");
    const [modalIsOpen, setModalIsOpen] = useState(false);


      const closeModal = () => {
        setModalIsOpen(false);
      };

  useEffect(() => {
    const authToken = Cookies.get('Authorization');
    if (authToken) {
      setToken(authToken);
      fetchUser(authToken);
    } 
    console.log('Authorization cookie:', authToken);

  }, []);

  const handleAskQuestion = () => {
    if(token === null){
      setModalIsOpen(true);
    }else{
      navigate("/ask", {state: {userId: user._id, userName : userName}});
    }
  }

  const handleHome = (e) => {
    e.preventDefault();
    navigate("/");
  }
  const handleTag = (e) => {
    e.preventDefault();
    navigate("/trendingTags");
  }
  const handleUser = (e) => {
    e.preventDefault();
    navigate("/verifiedUsers");
  }
  const handleFeedback = (e) => {
    e.preventDefault();
    navigate("/feedback");
  }

  const fetchUser = async (token) => {
    try {
      const response = await axios.post(`http://localhost:3005/check-auth`, {token});
      console.log(response.data);
      setUser(response.data.user);
      serUserName(response.data.user.name);
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  const firstSpaceIndex = userName.indexOf(" "); // Find the index of the first space
  const firstWord = userName.slice(0, firstSpaceIndex);   


  const handleLogout = async () => {
    await axios.get("http://localhost:3005/logout").then((res) => {
          console.log(res.data);
          setUser(null);
      }).catch((err) => {
          console.log(err);
          window.alert(err);
      });
  }


  
  const [header, setHeader] = useState(false);
  const changeBackground = () =>{
    if(window.scrollY >= 80){
      setHeader(true);
    }else{
      setHeader(false);
    }
  }
  window.addEventListener('scroll', changeBackground);


  return (
    <div className={header ? 'header active' : 'header'}>
      <Container>
        <Row>
          <Col>
          <Navbar collapseOnSelect expand="lg">
            <Container>
              <Navbar.Brand href="/" className='logo'><img className='logoImage' src={logo} alt='Ask Me Anything' /></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link className='navbarItem home' onClick={handleHome}>Home</Nav.Link>
                  <NavDropdown title="Category" id="collasible-nav-dropdown" className='navbarItem category'>
                    <NavDropdown.Item onClick={handleTag}>Trending Tags</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleUser}>Verified Users</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={handleFeedback} className='navbarItem feedback'>Feedback</Nav.Link>
                  <Nav.Link className='navbarItem about'><Button variant="danger" onClick={handleAskQuestion} className='askButton'>Ask Question</Button>{' '}</Nav.Link>

                </Nav>
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
                      <Col><h2>You are not logged in !</h2></Col>
                  </Row>
                  <Row>
                      <Col><p>Please do login to Ask ..</p></Col>
                  </Row>
                  <Row>
                      <Col xs={4}><Link to="/signin"><button className="linkToHome">Login</button></Link></Col>
                      <Col xs={8}><Link to="/"><button onClick={() => {setModalIsOpen(false)}} className="linkToAsk">Go Back to Home</button></Link></Col>
                  </Row>
              </div>
      </Modal>
                <Nav>
                  {/* <Nav.Link href="/" className=' profile'><img src={profileIcon} className='profileIcon' alt='Profile Icon'/></Nav.Link> */}
                  <NavDropdown title={firstWord} id="collasible-nav-dropdown" className='navbarItem'>
                    {!user && <NavDropdown.Item href="/signin">Login</NavDropdown.Item>}
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          </Col>
        </Row>

        

      </Container>
    </div>
  );
}

export default Header;