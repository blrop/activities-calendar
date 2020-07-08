import React, { Component } from 'react';
import PropTypes from "prop-types";

import MainScreen from "~/components/MainScreen/MainScreenContainer";
import UnauthorizedScreen from "./UnauthorizedScreen/UnauthorizedScreen";
import './App.scss';

export default class App extends Component {
    static propTypes = {
        checkIsLoggedIn: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired,
        register: PropTypes.func.isRequired,

        isLoggedIn: PropTypes.bool,
    };

    static defaultProps = {
        isLoggedIn: null,
    };

    constructor(props) {
        super(props);

        this.userName = React.createRef();
    }

    componentDidMount() {
        this.props.checkIsLoggedIn();
    }

    render() {
        const { isLoggedIn, login, register } = this.props;

        if (isLoggedIn === null) {
            return 'Loading...';
        }

        if (isLoggedIn) {
            return <MainScreen/>;
        } else {
            return <UnauthorizedScreen loginAction={login} registerAction={register}/>
        }
    }
}
