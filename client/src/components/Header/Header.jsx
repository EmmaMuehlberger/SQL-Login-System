import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

const Header = () => {
    return (
        <header>
            <div className="header__left">
                <i className="header__social fab fa-facebook-square"></i>
                <i className="header__social fab fa-twitter-square"></i>
                <i className="header__social fab fa-pinterest-square"></i>
                <i className="header__social fab fa-instagram-square"></i>
            </div>
            <div className="header__center">
                <ul className="header__list">
                    <li className="header__listItem">Home</li>
                    <li className="header__listItem">About</li>
                    <li className="header__listItem">Contact</li>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <li className="header__listItem">Login</li>
                    </Link>
                </ul>
            </div>
            <div className="header__right">
                <i className="header__search fas fa-search"></i>
            </div>
        </header>
    )
}

export default Header;
