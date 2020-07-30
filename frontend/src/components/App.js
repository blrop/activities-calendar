import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import MainScreen from "~/components/MainScreen/MainScreenContainer";
import UnauthorizedScreen from "./UnauthorizedScreen/UnauthorizedScreen";
import { DEFAULT_LANGUAGE } from "~/constants";
import './common.scss';

export const LanguageContext = React.createContext(DEFAULT_LANGUAGE);

export default function App(props) {
    const { checkIsLoggedIn } = props;

    useEffect(() => {
        checkIsLoggedIn();
    }, [checkIsLoggedIn]);
    const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

    if (props.isLoggedIn === null) {
        return 'Loading...'; // todo: remove when loading indicator is implemented
    }

    let screen;
    if (props.isLoggedIn) {
        screen = <MainScreen setLanguage={setLanguage}/>;
    } else {
        screen = <UnauthorizedScreen loginAction={props.login} registerAction={props.register} setLanguage={setLanguage}/>
    }

    return (
        <LanguageContext.Provider value={language}>
            {screen}
        </LanguageContext.Provider>
    );
}

App.propTypes = {
    checkIsLoggedIn: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,

    isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
    isLoggedIn: null,
};