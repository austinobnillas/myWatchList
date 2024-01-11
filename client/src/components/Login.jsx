import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import loginImg from "../assets/LoginIMG2.jpg"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/login`, {username, password}, {withCredentials: true})
        .then((res) => {
            // console.log(res)
            navigate('/dashboard')
        })
        .catch((err) => {
            // console.log(err.response.data.msg)
            setErrors(err.response.data.msg)
        })
    }

    return (
        <div className="loginContainer">
            <img className="loginImg "src={loginImg} alt="LoginImg" />
            <div className="loginForm">
                <form className="loginFormContainer" onSubmit={loginHandler}>
                    <h1 className="loginHeader">MyWatchList | Login</h1>
                    <p>Don't Have an account? <Link to={'/register'}>Register Here</Link></p>
                    <p><Link to={'/demo'}>Demo Page</Link> | <a href="https://github.com/austinobnillas/myWatchList" target="_blank">Github Repo</a></p>
                    <div className="username">
                        <p>
                            <label htmlFor="Username">Username: </label>
                            <input type="text" onChange={(e) => {setUsername(e.target.value)}}/>
                        </p>
                    </div>
                    <div className="password">
                        <p>
                            <label htmlFor="Password">Password: </label>
                            <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                        </p>
                    </div>
                    {errors ? <p className="text-danger">{errors}</p> : null}
                    <div className="submitButtonContainer">
                        <button className="btn btn-primary" type="submit">Login</button>
                    </div>
                </form>
            </div>
            
        </div>
        
    )
}

export default Login;