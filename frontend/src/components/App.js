import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import MainScreen from "~/components/MainScreen/MainScreenContainer";
import UnauthorizedScreen from "./UnauthorizedScreen/UnauthorizedScreen";
import { DEFAULT_LANGUAGE, LANGUAGE_LOCAL_STORAGE_KEY } from "~/constants";
import './common.scss';

const initialLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY) || DEFAULT_LANGUAGE;

export const LanguageContext = React.createContext(initialLanguage);

export default function App(props) {
    const { checkIsLoggedIn } = props;

    useEffect(() => {
        checkIsLoggedIn();
    }, [checkIsLoggedIn]);
    const [language, setLanguage] = useState(initialLanguage);

    if (props.isLoggedIn === null) {
        return 'Loading...'; // todo: remove when loading indicator is implemented
    }

    let screen;
    if (props.isLoggedIn) {
        screen = <MainScreen setLanguage={onSetLanguage}/>;
    } else {
        screen = <UnauthorizedScreen loginAction={props.login} registerAction={props.register} setLanguage={onSetLanguage}/>
    }

    return (
        <LanguageContext.Provider value={language}>
            {screen}
        </LanguageContext.Provider>
    );

    function onSetLanguage(lang) {
        localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, lang);
        setLanguage(lang);
    }
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