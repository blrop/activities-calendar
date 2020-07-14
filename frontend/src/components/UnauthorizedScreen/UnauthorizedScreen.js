import React, { useState } from 'react';
import PropTypes from "prop-types";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import './UnauthorizedScreen.scss';

export default function UnauthorizedScreen(props) {
    const LOGIN = 'login';
    const REGISTER = 'register';

    const [formToShow, setFormToShow] = useState(LOGIN);

    function showLoginForm() {
        setFormToShow(LOGIN);
    }

    function showRegisterForm() {
        setFormToShow(REGISTER);
    }

    switch (formToShow) {
        case LOGIN:
            return <LoginForm switchCallback={showRegisterForm} loginAction={props.loginAction}/>;

        case REGISTER:
            return <RegisterForm switchCallback={showLoginForm} registerAction={props.registerAction}/>;

        default:
            return null;
    }
}

UnauthorizedScreen.propTypes = {
    loginAction: PropTypes.func.isRequired,
    registerAction: PropTypes.func.isRequired,
}