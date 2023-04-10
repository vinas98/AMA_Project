import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './SignIn.css';
import siginProp from '../images/leftImage.jpeg';
import logo from '../images/logo_ama.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

   useEffect(() => {
       lableHandler();
   }, []);
    const history = useNavigate();


    const [createUser, setCreateUser] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:"",
    });

    const handleCreateUser =  (e) => {
        const { name, value } = e.target;
        setCreateUser({...createUser,
            [name] : value,
         });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3005/createUser", createUser).then((res) => {
            console.log(res);
            history('/signin');
        }).catch((err) => {
            console.log(err);
            window.alert(err.response.data.error);
        });
        setCreateUser({
            name:"",
            email:"",
            password:"",
            cpassword:"",
        });
    }

    const lableHandler = () => {
        const nameLable = document.getElementById("nameLable");
        const emailLable = document.getElementById("emailLable");
        const passwordLable = document.getElementById("passwordLable");
        const cpasswordLable = document.getElementById("cpasswordLable");

        }
    return(
        <div className='signInContainer'>
            <Container>
                <Row>
                    <div className='signInBox'>
                        <Col xs={6}>
                            <div className='signInLeft'><img src={siginProp} alt="Welcome Image" /></div>
                        </Col>
                        <Col xs={5}>
                            <div className='signinRight'>
                                <Row><Col>
                                    <div className='compayLogoInSignin'><img src={logo} alt="Company Logo" /></div>
                                </Col></Row>
                                <Row>
                                    <Col>
                                        <div className='signinWelcomeText'>
                                            <h2>Register To AMA</h2>
                                            <h6>Not Login yet?</h6>
                                            <a href='/signin' className='toggle'>Log In</a>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div className='signupFormContainer'>
                                            <form onSubmit={handleSubmit}>
                                                <div class="input-wrap">
                                                    <input
                                                        type="text"
                                                        minlength="4"
                                                        class="input-field"
                                                        autoComplete="off"
                                                        name="name"
                                                        value={createUser.name}
                                                        onChange={handleCreateUser}
                                                        required
                                                    />
                                                    {!createUser.name && <label>Name</label>}
                                                </div>

                                                <div class="input-wrap">
                                                    <input
                                                        type="email"
                                                        name='email'
                                                        value={createUser.email}
                                                        onChange={handleCreateUser}
                                                        minlength="4"
                                                        class="input-field"
                                                        autoComplete="off"
                                                        required
                                                    />
                                                    {!createUser.email && <label>Email</label>}
                                                </div>
                                                <div class="input-wrap">
                                                    <input
                                                        type="password"
                                                        name='password'
                                                        value={createUser.password}
                                                        onChange={handleCreateUser}
                                                        minlength="4"
                                                        class="input-field"
                                                        autoComplete="off"
                                                        required
                                                    />
                                                   {!createUser.password && <label>Password</label>}
                                                </div>
                                                <div class="input-wrap">
                                                    <input
                                                        type="password"
                                                        name='cpassword'
                                                        value={createUser.cpassword}
                                                        onChange={handleCreateUser}
                                                        minlength="4"
                                                        class="input-field"
                                                        autoComplete="off"
                                                        required
                                                    />
                                                    {!createUser.cpassword && <label>Confirm Password</label>}
                                                </div>

                                                <button type='submit' className='signinButton'>Sign Up</button>
                                            </form>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    );
}
export default SignUp;