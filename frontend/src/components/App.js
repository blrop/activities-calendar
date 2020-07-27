import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";

import MainScreen from "~/components/MainScreen/MainScreenContainer";
import UnauthorizedScreen from "./UnauthorizedScreen/UnauthorizedScreen";
import { LANGUAGE_DEFAULT, LANGUAGE_EN, LANGUAGE_RU } from "~/constants";
import './common.scss';

export const LanguageContext = React.createContext(LANGUAGE_DEFAULT);

export default function App(props) {
    const { checkIsLoggedIn } = props;

    useEffect(() => {
        checkIsLoggedIn();
    }, [checkIsLoggedIn]);
    const [language, setLanguage] = useState(LANGUAGE_DEFAULT);

    if (props.isLoggedIn === null) {
        return 'Loading...'; // todo: remove when loading indicator is implemented
    }

    let screen;
    if (props.isLoggedIn) {
        screen = <MainScreen/>;
    } else {
        screen = <UnauthorizedScreen loginAction={props.login} registerAction={props.register}/>
    }

    return (
        <LanguageContext.Provider value={language}>
            <select value={language} onChange={onLanguageChange} className="language-selector">
                <option value={LANGUAGE_EN}>English</option>
                <option value={LANGUAGE_RU}>Russian</option>
            </select>
            {screen}
        </LanguageContext.Provider>
    );

    function onLanguageChange(e) {
        setLanguage(e.target.value);
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