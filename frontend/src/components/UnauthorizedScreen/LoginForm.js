import React from 'react';
import PropTypes from "prop-types";

import { EXAMPLE_PASSWORD, EXAMPLE_USER_NAME } from "~/constants";
import { useFormInput } from "~/tools/tools";

export default function LoginForm(props) {
    const userName = useFormInput('');
    const password = useFormInput('');

    return (
        <div className="unauthorized-screen__form">
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
                <div className="form-group form-group--buttons">
                    <button type="submit" className="button-primary">Log in</button>
                    <button type="button" onClick={props.switchCallback} className="button-secondary">Register</button>
                </div>
                <div className="form-group form-group--bottom">
                    <button type="button" onClick={loginAsExampleUser} className="button-secondary">Log in as example user</button>
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