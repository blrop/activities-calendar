import React, { useEffect } from 'react';
import PropTypes from "prop-types";

import MainScreen from "~/components/MainScreen/MainScreenContainer";
import UnauthorizedScreen from "./UnauthorizedScreen/UnauthorizedScreen";
import './common.scss';

export default function App(props) {
    const { checkIsLoggedIn } = props;

    useEffect(() => {
        checkIsLoggedIn();
    }, [checkIsLoggedIn]);

    if (props.isLoggedIn === null) {
        return 'Loading...'; // todo: remove when loading indicator is implemented
    }

    if (props.isLoggedIn) {
        return <MainScreen user={props.user}/>;
    } else {
        return <UnauthorizedScreen loginAction={props.login} registerAction={props.register}/>
    }
}

App.propTypes = {
    checkIsLoggedIn: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,

    isLoggedIn: PropTypes.bool,
    user: PropTypes.object,
};

App.defaultProps = {
    isLoggedIn: null,
    user: null,
};