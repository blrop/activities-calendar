import React, { useContext, useState } from 'react';
import PropTypes from "prop-types";

import { useFormInput, createLangGetter } from "~/tools/tools";
import { LanguageContext } from "~/components/App";

export default function RegisterForm(props) {
    const lang = createLangGetter(useContext(LanguageContext));

    const userName = useFormInput('');
    const password = useFormInput('');
    const password2 = useFormInput('');

    const [passwordError, setPasswordError] = useState(null);

    return (
        <div className="unauthorized-screen__form">
            <form onSubmit={onSubmit}>
                <h1>{lang('rf-register')}</h1>
                <div className="form-group">
                    <label htmlFor="username">{lang('rf-user-name')}</label>
                    <input type="text" id="username" name="username" required autoFocus {...userName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">{lang('rf-password')}</label>
                    <input type="password" id="password" name="password" required {...password}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">{lang('rf-repeat-password')}</label>
                    <input type="password" id="password2" name="password2" required {...password2}/>
                    {passwordError ? <div className="form-group__error">{passwordError}</div> : null}
                </div>
                <div className="form-group form-group--buttons">
                    <button type="submit" className="button-primary">{lang('rf-register-button')}</button>
                    <button type="button" onClick={props.switchCallback} className="button-secondary">{lang('rf-login-button')}</button>
                </div>
            </form>
        </div>
    );

    function onSubmit(e) {
        e.preventDefault();

        if (password.value === password2.value) {
            setPasswordError(null);

            props.registerAction(userName.value, password.value);
        } else {
            setPasswordError(lang('rf-password-error-msg'));
        }
    }
}

RegisterForm.propTypes = {
    registerAction: PropTypes.func.isRequired,
    switchCallback: PropTypes.func.isRequired,
}