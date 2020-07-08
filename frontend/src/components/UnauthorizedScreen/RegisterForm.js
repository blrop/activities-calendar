import React, { useState } from 'react';
import PropTypes from "prop-types";

import { useFormInput } from "~/tools/tools";

export default function RegisterForm(props) {
    const userName = useFormInput('');
    const password = useFormInput('');
    const password2 = useFormInput('');

    const [passwordError, setPasswordError] = useState(null);

    return (
        <div className="form-wrapper">
            <div className="form-block">
                <form onSubmit={onSubmit}>
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="username">User name:</label>
                        <input type="text" id="username" name="username" required autoFocus {...userName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required {...password}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Repeat Password:</label>
                        <input type="password" id="password2" name="password2" required {...password2}/>
                        {passwordError ? <div className="form-group__error">{passwordError}</div> : null}
                    </div>
                    <div className="form__buttons">
                        <button type="submit" className="button-primary">Register</button>
                        <button type="button" onClick={props.switchCallback} className="button-secondary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );

    function onSubmit(e) {
        e.preventDefault();

        if (password.value === password2.value) {
            setPasswordError(null);

            props.registerAction(userName.value, password.value);
        } else {
            setPasswordError('Password doesn\'t match');
        }
    }
}

RegisterForm.propTypes = {
    registerAction: PropTypes.func.isRequired,
    switchCallback: PropTypes.func.isRequired,
}