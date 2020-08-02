import React, { useContext } from 'react';
import PropTypes from "prop-types";

import { EXAMPLE_PASSWORD, EXAMPLE_USER_NAME } from "~/constants";
import { useFormInput, createLangGetter } from "~/tools/tools";
import { LanguageContext } from "~/components/App";

export default function LoginForm(props) {
    const userName = useFormInput('');
    const password = useFormInput('');

    const lang = createLangGetter(useContext(LanguageContext));

    return (
        <div className="unauthorized-screen__form">
            <form onSubmit={onSubmit}>
                <h1>{lang('log-in')}</h1>
                <div className="form-group">
                    <label htmlFor="username">{lang('user-name')}</label>
                    <input type="text" id="username" name="username" required autoFocus {...userName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">{lang('password')}</label>
                    <input type="password" id="password" name="password" required {...password}/>
                </div>
                <div className="form-group form-group--buttons">
                    <button type="submit" className="button-primary">{lang('log-in-button')}</button>
                    <button type="button" onClick={props.switchCallback} className="button-secondary">{lang('register-button')}</button>
                </div>
                <div className="unauthorized-screen__form-divider">
                    or
                </div>
                <div className="form-group form-group--bottom">
                    <button type="button" onClick={loginAsExampleUser} className="button-primary">{lang('log-in-as-example')}</button>
                </div>
            </form>
        </div>
    );

    function onSubmit(e) {
        e.preventDefault();

        props.loginAction(userName.value, password.value);
    }

    function loginAsExampleUser() {
        props.loginAction(EXAMPLE_USER_NAME, EXAMPLE_PASSWORD);
    }
}

LoginForm.propTypes = {
    loginAction: PropTypes.func.isRequired,
    switchCallback: PropTypes.func.isRequired,
}