import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './SignIn.css';
import siginProp from '../images/leftImage.jpeg';
import logo from '../images/logo_ama.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const history = useNavigate();
    const [email, setEmail] = useState("");
    const handleLogin = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3005/forgot-password", email).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
            window.alert(err);
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
                                            <h2>Reset Your Password</h2>
                                            <h6>Go back to Login?</h6>
                                            <a href='/signin' className='toggle'>Sign In</a>
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
                                                        value={email}
                                                        onChange={handleLogin}
                                                        minlength="4"
                                                        class="input-field"
                                                        autocomplete="off"
                                                        required
                                                    />
                                                    {!email && <label>Email</label>}
                                                </div>
                                                <button type='submit' className='signinButton'>Reset Password</button><br/>
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
export default ForgotPassword;