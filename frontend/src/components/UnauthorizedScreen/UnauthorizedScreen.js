import React, { useState } from 'react';
import PropTypes from "prop-types";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import './UnauthorizedScreen.scss';

export default function UnauthorizedScreen(props) {
    const LOGIN = 'login';
    const REGISTER = 'register';

    const [formToShow, setFormToShow] = useState(LOGIN);

    switch (formToShow) {
        case LOGIN:
            return <LoginForm switchCallback={showRegisterForm} loginAction={props.loginAction}/>;

        case REGISTER:
            return <RegisterForm switchCallback={showLoginForm} registerAction={onRegisterFormSubmit}/>;

        default:
            return null;
    }

    function showLoginForm() {
        setFormToShow(LOGIN);
    }

    function showRegisterForm() {
        setFormToShow(REGISTER);
    }

    function onRegisterFormSubmit(name, password) {
        props.registerAction(name, password)
            .then((success) => {
                if (success) {
                    props.loginAction(name, password);
                }
            });
    }
}

UnauthorizedScreen.propTypes = {
    loginAction: PropTypes.func.isRequired,
    registerAction: PropTypes.func.isRequired,
}