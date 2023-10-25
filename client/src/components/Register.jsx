import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import loginImg from "../assets/LoginIMG2.jpg"

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
            console.log(res)
            navigate('/dashboard')
        })
        .catch((err) => {
            console.log(err.response.data)
            setErrors(err.response.data)
            console.log(errors.email_errors)
        })
    }

    return (
        <div className="loginContainer">
            <img className="loginImg "src={loginImg} alt="LoginImg" />
            <div className="loginForm">
                
                <form className="loginFormContainer" onSubmit={registerHandler}>
                    <h1 className="loginHeader">Create an Account</h1>
                    <p>Already have an account? <Link to={'/'}>Login Here</Link></p>
                    {/* { errors. ? <p className="text-danger">{errors}</p> : null} */}
                    <div className="formContainer">
                        <div className="username">
                            <p>
                                <label htmlFor="Username">Username: </label>
                                <input type="text" onChange={(e) => {setUsername(e.target.value)}}/>
                                { errors ? <p className="text-danger">{errors.username_errors}</p> : null}
                                { errors ? <p className="text-danger">{errors.username_exist}</p> : null}
                            </p>
                        </div>
                        <div className="email">
                            <p>
                                <label htmlFor="Email">Email: </label>
                                <input type="text" onChange={(e) => {setEmail(e.target.value)}}/>
                                { errors ? <p className="text-danger">{errors.email_errors}</p> : null}
                            </p>
                        </div>
                        <div className="passwordRegister">
                            <p>
                                <label htmlFor="Password">Password: </label>
                                <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                                { errors ? <p className="text-danger">{errors.password_error}</p> : null}
                            </p>
                        </div>
                        <div className="confirmPasswordRegister">
                            <p>
                                <label htmlFor="ConfirmPassword">Confirm Password: </label>
                                <input type="password" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                                { errors ? <p className="text-danger">{errors.password_confirm_error}</p> : null}
                            </p>
                        </div>
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