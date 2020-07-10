import React, { Component } from 'react';
import PropTypes from "prop-types";

import MainScreen from "~/components/MainScreen/MainScreenContainer";
import UnauthorizedScreen from "./UnauthorizedScreen/UnauthorizedScreen";
import './common.scss';

export default class App extends Component {
    static propTypes = {
        checkIsLoggedIn: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
        register: PropTypes.func.isRequired,

        isLoggedIn: PropTypes.bool,
        user: PropTypes.object,
    };

    static defaultProps = {
        isLoggedIn: null,
        user: null,
    };

    componentDidMount() {
        this.props.checkIsLoggedIn();
    }

    render() {
        const { isLoggedIn, login, register, user } = this.props;

        if (isLoggedIn === null) {
            return 'Loading...';
        }

        if (isLoggedIn) {
            return <MainScreen user={user}/>;
        } else {
            return <UnauthorizedScreen loginAction={login} registerAction={register}/>
        }
    }
}
