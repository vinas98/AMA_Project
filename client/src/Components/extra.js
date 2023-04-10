import logo from './images/logo_ama.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import profileIcon from './images/Icon/profileIcon.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';


import './Header.css';



function Header(){





    //const [questions, setQuestions] = useState(null);
    const [createForm, setCreateForm] = useState({
      title: '',
      description: '',
  });

  // const [questionTitle, setQuestionTitle] = useState("");
  // const [editorValue, setEditorValue] = useState('');

  const updateCreateFormField = (e) => {
      
      // let descriptionValue = Quill.getContents();
      setCreateForm({
      ...createForm,
      title : e.target.value,
      });
  }

  //  const handleQuestionTitleChange = (event) => {
  //     console.log(event.target.value);
  //     setQuestionTitle(event.target.value);
  // };

  const handleEditorValueChange = (value) => {
      console.log(value);
      setCreateForm({
          description : value
      });
  };

 

    //handle question.
  const createQuestion = async (e) => {
      e.preventDefault();
      console.log(createForm.title)
      const res = await axios.post("http://localhost:3005/questions", createForm);
      console.log(res.data);


      setCreateForm({
          title: "",
          description: "",
        });
  }
  

    return (
    <Container fluid>
       <div className='header'>
          <Row>
            <Col>
            <Navbar expand="lg">
              <Container fluid>
                <Navbar.Brand href="/">Navbar scroll</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                  >
                    <Nav.Link href="/"><img className='logoImage' src={logo} alt='Ask Me Anything' /></Nav.Link>
                    <Nav.Link href="/"  className='navbarItem home'>Home</Nav.Link>
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                      Link
                    </Nav.Link>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
                    {/* <Col xs={4}><img className='logoImage' src={logo} alt='Ask Me Anything' /></Col> */}
                    {/* <Col xs={7}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control type="text" placeholder="Search" className='searchQuestion'/>
                        </Form.Group>
                      </Form>
                    </Col> */}

                    {/* <Col xs={3}><a href='/' className='navbarItem home'>Home</a></Col>
                    <Col xs={1}>              
                      <div className='dropdown'>
                        <a href='/' className='navbarItem category' data-toggle="dropdown">Category <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                          <li><a href="#">HTML</a></li>
                          <li><a href="#">CSS</a></li>
                          <li><a href="#">JavaScript</a></li>
                        </ul>
                      </div>
                    </Col>
                    <Col xs={1}><a href='/' className='navbarItem feedback'>Feedback</a></Col>
                    <Col xs={1}><a href='/' className='navbarItem about'>About</a></Col> */}

                    

                    {/* <Col>
                    <Navbar fill variant="tabs" defaultActiveKey="/home">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                          <Nav className="me-auto">
                            <Nav.Link href="/" className='navbarItem home'>Home</Nav.Link>
                            <NavDropdown title="Category" id="basic-nav-dropdown" className='navbarItem category'>
                              <NavDropdown.Item href="/">Popular Tags</NavDropdown.Item>
                              <NavDropdown.Item href="/">Correct Answers</NavDropdown.Item>
                              <NavDropdown.Item href="/">Verified Users</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/" className='navbarItem about'>About</Nav.Link>
                            <Nav.Link href="/" className='navbarItem feedback'>Feedback</Nav.Link>
                          </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    </Col>
                    <Col xs={2}><img src={profileIcon} className='profileIcon' alt='Profile Icon'/></Col> */}
                  </Row>
                </div>
            </Container>

      
       
    )
}

export default Header;

