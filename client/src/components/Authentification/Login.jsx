import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "./Authentification.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const history = useHistory();

    const loginUser = (e) => {
        e.preventDefault();

        setLoginStatus("");

        /* Send data to server */
        Axios.post("http://localhost:4000/login", { 
            email: email, 
            password: password
        }).then((response) => {
            setEmail("");
            setPassword("");

            if(response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].email + " is logged in.");
                history.push("/welcome");
            }
        })
    }

    return (
        <div className="auth">
            {loginStatus !== "" ? <div className="alert">{ loginStatus }</div> : null }
            <div className="auth__container">
                <h4 className="auth__title">Login</h4>
                <form className="auth__form">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" name="email" id="email" placeholder="name@example.com" />
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" name="password" id="password" placeholder="yourpassword" />
                    <button onClick={(e) => { loginUser(e) }} className="auth__button">Login</button>
                    <p className="auth__register">No Account?{"\n"}
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <button>Register</button>
                        </Link> 
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;

