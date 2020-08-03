import React, { useContext, useState } from 'react';
import { useFormInput } from "~/tools/tools";
import PropTypes from 'prop-types';

import { LanguageContext } from "~/components/App";
import { createLangGetter } from "~/tools/tools";

export default function PasswordChangeForm(props) {
    const lang = createLangGetter(useContext(LanguageContext));

    const password = useFormInput('');
    const newPassword = useFormInput('');
    const newPassword2 = useFormInput('');

    const [passwordError, setPasswordError] = useState(null);

    return (
        <div className="modal-dialog-wrapper" onClick={onWrapperClick}>
            <form onSubmit={onSubmit} className="modal-dialog">
                <div className="modal-dialog__header">
                    <h2 className="modal-dialog__title">{lang('pcf-password-change')}</h2>
                    <button
                        className="modal-dialog__close-button icon-close"
                        aria-label="Close"
                        onClick={props.onClose}
                        type="button"
                    />
                </div>
                <div className="modal-dialog__body modal-dialog__body--password-change">
                    <div className="form-group">
                        <label htmlFor="password">{lang('pcf-old-password')}</label>
                        <input type="password" id="password" required {...password}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password">{lang('pcf-new-password')}</label>
                        <input type="password" id="new-password" required {...newPassword}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password2">{lang('pcf-repeat-password')}</label>
                        <input type="password" id="new-password2" required {...newPassword2}/>
                        {passwordError ? <div className="form-group__error">{passwordError}</div> : null}
                    </div>
                </div>
                <div className="modal-dialog__buttons">
                    <button type="submit" className="button-primary">{lang('pcf-save')}</button>
                    <button type="button" className="button-secondary" onClick={props.onClose}>{lang('pcf-cancel')}</button>
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

        if (newPassword.value === newPassword2.value) {
            setPasswordError(null);

            props.onSubmit({
                password: password.value,
                newPassword: newPassword.value,
            });
        } else {
            setPasswordError(lang('pcf-password-error'));
        }
    }
};

PasswordChangeForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};