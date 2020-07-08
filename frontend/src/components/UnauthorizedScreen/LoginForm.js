import React from 'react';
import PropTypes from "prop-types";

import { useFormInput } from "~/tools/tools";

export default function LoginForm(props) {
    const userName = useFormInput('');
    const password = useFormInput('');

    return (
        <div className="form-wrapper">
            <div className="form-block">
                <form onSubmit={onSubmit}>
                    <h2>Log in</h2>
                    <div className="form-group">
                        <label htmlFor="username">User name:</label>
                        <input type="text" id="username" name="username" required autoFocus {...userName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required {...password}/>
                    </div>
                    <div className="form__buttons">
                        <button type="submit" className="button-primary">Log in</button>
                        <button type="button" onClick={props.switchCallback} className="button-secondary">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );

    function onSubmit(e) {
        e.preventDefault();

        props.loginAction(userName.value, password.value);
    }
}

LoginForm.propTypes = {
    loginAction: PropTypes.func.isRequired,
    switchCallback: PropTypes.func.isRequired,
}