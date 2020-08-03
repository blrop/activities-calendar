import React, { useContext, useState } from 'react';
import PropTypes from "prop-types";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LangSelector from "~/components/LangSelector/LangSelector";
import ToolDialog from "~/components/ToolDialog/ToolDialog";
import { LanguageContext } from "~/components/App";
import { createLangGetter } from "~/tools/tools";

import './UnauthorizedScreen.scss';

export default function UnauthorizedScreen(props) {
    const LOGIN = 'login';
    const REGISTER = 'register';

    const lang = createLangGetter(useContext(LanguageContext));

    const [formToShow, setFormToShow] = useState(LOGIN);
    const [isLangSelectorShown, setLangSelectorState] = useState(false);

    let form;
    switch (formToShow) {
        case LOGIN:
            form = <LoginForm switchCallback={showRegisterForm} loginAction={props.loginAction}/>;
            break;

        case REGISTER:
            form = <RegisterForm switchCallback={showLoginForm} registerAction={onRegisterFormSubmit}/>;
            break;

        default:
            form = null;
    }

    return (
        <>
            {form}

            <button
                className="unauthorized-screen__language-selector"
                onClick={showLanguageSelector}
            >
                {lang('us-choose-lang')}
            </button>

            {isLangSelectorShown && (
                <ToolDialog closeCallback={hideLanguageSelector}>
                    <LangSelector onSelect={onLanguageSelect}/>
                </ToolDialog>
            )}
        </>
    );

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

    function showLanguageSelector() {
        setLangSelectorState(true);
    }

    function hideLanguageSelector() {
        setLangSelectorState(false);
    }

    function onLanguageSelect(langCode) {
        props.setLanguage(langCode);
        setLangSelectorState(false);
    }
}

UnauthorizedScreen.propTypes = {
    loginAction: PropTypes.func.isRequired,
    registerAction: PropTypes.func.isRequired,
    setLanguage: PropTypes.func.isRequired,
}