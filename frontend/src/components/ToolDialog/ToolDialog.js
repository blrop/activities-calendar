import React from 'react';
import PropTypes from 'prop-types';

import './ToolDialog.scss';

export default function ToolDialog({ children, closeCallback }) {
    return (
        <div className="tool-dialog__overlay" onClick={onOverlayClick}>
            <div className="tool-dialog__content">
                <button
                    aria-label="Close"
                    className="tool-dialog__close-button icon-close"
                    type="button"
                    onClick={closeCallback}
                />
                {children}
            </div>
        </div>
    );

    function onOverlayClick(e) {
        if (e.target === e.currentTarget) {
            closeCallback();
        }
    }
};

ToolDialog.propTypes = {
    closeCallback: PropTypes.func.isRequired,
};