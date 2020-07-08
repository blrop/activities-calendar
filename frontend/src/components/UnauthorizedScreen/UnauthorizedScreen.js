import React from 'react';
import PropTypes from "prop-types";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import './UnauthorizedScreen.scss';

export default class UnauthorizedScreen extends React.Component {
    static LOGIN = 'login';
    static REGISTER = 'register';

    static propTypes = {
        loginAction: PropTypes.func.isRequired,
        registerAction: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            formToShow: UnauthorizedScreen.LOGIN,
        };

        this.showRegisterForm = this.showRegisterForm.bind(this);
        this.showLoginForm = this.showLoginForm.bind(this);
    }

    showLoginForm() {
        this.setState({ formToShow: UnauthorizedScreen.LOGIN });
    }

    showRegisterForm() {
        this.setState({ formToShow: UnauthorizedScreen.REGISTER });
    }

    render() {
        const { formToShow } = this.state;
        const { loginAction, registerAction } = this.props;

        switch (formToShow) {
            case UnauthorizedScreen.LOGIN:
                return <LoginForm switchCallback={this.showRegisterForm} loginAction={loginAction}/>;

            case UnauthorizedScreen.REGISTER:
                return <RegisterForm switchCallback={this.showLoginForm} registerAction={registerAction}/>;

            default:
                return null;
        }
    }
}