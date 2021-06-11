import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import "./Authentification.scss";

const Register = () => {
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [registerStatus, setRegisterStatus] = useState("");

    const history = useHistory();

    const registerUser = (e) => {
        e.preventDefault();

        /* Form validation */
        if(emailReg.length <= 0) {
            setRegisterStatus("Please enter an email.");
            return;
        }
        if(passwordReg.length <= 6) {
            setRegisterStatus("Please choose a password of at least 7 characters.");
            return;
        }

        setRegisterStatus("");

        /* Send data to server */
        Axios.post("http://localhost:4000/register", { 
            email: emailReg, 
            password: passwordReg
        }).then((response) => {
            setEmailReg("");
            setPasswordReg("");

            if(response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                setRegisterStatus("You are registered and can now log in.");
                history.push("/login");
            }
        })
    }

    console.log(emailReg, passwordReg);

    return (
        <div className="auth">
            {registerStatus !== "" ? <div className="alert">{ registerStatus }</div> : null }
            <div className="auth__container">
                <h4 className="auth__title">Register</h4>
                <form className="auth__form">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => { setEmailReg(e.target.value) }} value={emailReg} type="email" name="email" id="email" placeholder="name@example.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => { setPasswordReg(e.target.value) }} value={passwordReg} type="password" name="password" id="password" placeholder="yourpassword" />
                    <button onClick={(e) => { registerUser(e) }} className="auth__button">Register</button>
                    <p className="auth__login">Already one of us?{"\n"}
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <button>Login</button>
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register;