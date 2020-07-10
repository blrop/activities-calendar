import React from 'react';
import PropTypes from "prop-types";

import './Dialog.scss';

export default function Dialog(props) {
    if (!props.isShown) {
        return null;
    }

    return (
        <div className="modal-dialog-wrapper">
            <div className="modal-dialog">
                <div className="modal-dialog__header">
                    <h1 className="modal-dialog__title">{props.title}</h1>
                    <button
                        className="modal-dialog__close-button icon-close"
                        aria-label="Close"
                        onClick={props.onClose}
                    />
                </div>
                <div className="modal-dialog__body">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

Dialog.propTypes = {
    isShown: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,

    onClose: PropTypes.func.isRequired,
};