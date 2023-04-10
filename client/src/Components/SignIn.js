import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './SignIn.css';
import siginProp from '../images/leftImage.jpeg';
import logo from '../images/logo_ama.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const history = useNavigate();
    // const [token, setToken] = useState("");
    const [loginUser, setLoginUser] = useState({
        email:"",
        password:""
    });
    // const [loggedIn, setLoggedIn] = useState(null);

    const handleLogin = async (e) => {
        const { name, value } = e.target;
        setLoginUser({...loginUser,
            [name] : value,
         });
    }

    // const setCookieData = () => {}

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3005/login", loginUser, { withCredentials: true }).then((res) => {
            console.log(res.data);
            history('/', {state: {token: res.data.token}});
        }).catch((err) => {
            console.log(err);
            window.alert(err);
        });
        setLoginUser({
            email:"",
            password:""
        });
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
                                            <h2>Welcome Back To AMA</h2>
                                            <h6>Not registered yet?</h6>
                                            <a href='/signup' className='toggle'>Sign Up</a>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <div className='signinFormContainer'>
                                            <form onSubmit={handleSubmit}>
                                                <div class="input-wrap">
                                                    <input
                                                        type="email"
                                                        name='email'
                                                        value={loginUser.email}
                                                        onChange={handleLogin}
                                                        minlength="4"
                                                        class="input-field"
                                                        autocomplete="off"
                                                        required
                                                    />
                                                    {!loginUser.email && <label>Email</label>}
                                                </div>

                                                <div class="input-wrap">
                                                    <input
                                                        type="password"
                                                        name='password'
                                                        value={loginUser.password}
                                                        onChange={handleLogin}
                                                        minlength="4"
                                                        class="input-field"
                                                        autocomplete="off"
                                                        required
                                                    />
                                                     {!loginUser.password && <label>Password</label>}
                                                </div>

                                                <button type='submit' className='signinButton'>Sign In</button><br/>
                                                {/* <a href='/forgotPassword'  className='forgotPassword'>Forgot Password</a> */}
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
export default SignIn;