import React, {useState} from "react";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/login`, {username, password}, {withCredentials: true})
        .then((res) => {
            console.log(res)
            navigate('/dashboard')
        })
        .catch((err) => {
            console.log(err.response.data.msg)
            setErrors(err.response.data.msg)
        })
    }

    return (
        <div className="loginContainer">
            <div className="loginForm">
                <form onSubmit={loginHandler}>
                    { errors ? <p className="text-danger">{errors}</p> : null}
                    <div>
                        <p>
                            <label htmlFor="Username">Username: </label>
                            <input type="text" onChange={(e) => {setUsername(e.target.value)}}/>
                        </p>
                    </div>
                    <div>
                        <p>
                            <label htmlFor="Password">Password: </label>
                            <input type="text" onChange={(e) => {setPassword(e.target.value)}}/>
                        </p>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            
            
            
        </div>
        
    )
}

export default Login;