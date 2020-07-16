import React from 'react';
import { useFormInput } from "~/tools/tools";
import PropTypes from 'prop-types';

export default function PasswordChangeForm(props) {
    const password = useFormInput('');
    const newPassword = useFormInput('');
    const newPassword2 = useFormInput('');

    if (!props.isShown) {
        return null;
    }

    return (
        <div className="modal-dialog-wrapper" onClick={onWrapperClick}>
            <form onSubmit={onSubmit} className="modal-dialog">
                <div className="modal-dialog__header">
                    <h2 className="modal-dialog__title">Password change</h2>
                    <button
                        className="modal-dialog__close-button icon-close"
                        aria-label="Close"
                        onClick={props.onClose}
                        type="button"
                    />
                </div>
                <div className="modal-dialog__body">
                    <div className="form-group">
                        <label htmlFor="password">Old Password:</label>
                        <input type="password" id="password" required {...password}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password">New Password:</label>
                        <input type="password" id="new-password" required {...newPassword}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password2">Repeat New Password:</label>
                        <input type="password" id="new-password2" required {...newPassword2}/>
                    </div>
                </div>
                <div className="modal-dialog__buttons">
                    <button type="submit" className="button-primary">Save</button>
                    <button type="button" className="button-secondary" onClick={props.onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );

    function onWrapperClick(e) {
        if (e.target === e.currentTarget) {
            props.onClose();
        }
    }

    function onSubmit(e) {
        e.preventDefault();

        props.onSubmit({
            password: password.value,
            newPassword: newPassword.value,
            newPassword2: newPassword2.value,
        });
    }
};

PasswordChangeForm.propTypes = {
    isShown: PropTypes.bool.isRequired,

    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};