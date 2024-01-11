import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import loginImg from "../assets/RegisterIMG.jpg"

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState();
    const navigate = useNavigate();

    const registerHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/register`, {username, email, password, confirmPassword}, {withCredentials: true})
        .then((res) => {
            // console.log(res)
            navigate('/dashboard')
        })
        .catch((err) => {
            // console.log(err.response.data)
            setErrors(err.response.data)
            // console.log(errors.email_errors)
        })
    }

    return (
        <div className="loginContainer">
            <img className="loginImg "src={loginImg} alt="LoginImg" />
            <div className="loginForm">
                
                <form className="loginFormContainer" onSubmit={registerHandler}>
                    <h1 className="loginHeader">MyWatchList | Register</h1>
                    <p>Already have an account? <Link to={'/'}>Login Here</Link></p>
                    <p><Link to={'/demo'}>Demo</Link> | <a href="https://github.com/austinobnillas/myWatchList" target="_blank">Repo</a></p>
                    {/* { errors. ? <p className="text-danger">{errors}</p> : null} */}
                    <div className="formContainer">
                        <div className="formContent">
                            <div className="label">
                                <label htmlFor="Username">Username: </label>
                            </div>
                            <div className="input">
                                <input type="text" onChange={(e) => {setUsername(e.target.value)}}/>
                            </div>
                        </div>
                        { errors ? <p className="text-danger">{errors.username_errors}</p> : null}
                        { errors ? <p className="text-danger">{errors.username_exist}</p> : null}
                        <div className="formContent">
                            <div className="label">
                                <label htmlFor="Email">Email: </label>
                            </div>
                            <div className="input">
                                <input type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                            </div>
                            
                            
                        </div>
                        { errors ? <p className="text-danger">{errors.email_errors}</p> : null}
                        <div className="formContent">
                        <div className="label">
                            <label htmlFor="Password">Password: </label>
                        </div>
                        <div className="input">
                            <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                        </div>
                        { errors ? <p className="text-danger">{errors.password_error}</p> : null}
                        <div className="formContent">
                            <div className="label">
                                <label htmlFor="ConfirmPassword">Confirm Password: </label>
                            </div>
                            <div className="input">
                                <input type="password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                            </div>
                        </div>
                        { errors ? <p className="text-danger">{errors.password_confirm_error}</p> : null}
                    </div>
                    
                    <div className="submitButtonContainer">
                        <button className="btn btn-primary" type="submit">Create Account</button>
                    </div>
                </form>
            </div>
            
            
            
        </div>
        
    )
}

export default Register;