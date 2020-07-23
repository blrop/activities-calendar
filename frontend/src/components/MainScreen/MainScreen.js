import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import Activities from "~/components/MainScreen/Activities/ActivitiesContainer";
import ActivityLog from "~/components/MainScreen/ActivityLog/ActivityLog";
import ActivitiesEditor from "~/components/ActivitiesEditor/ActivitiesEditor";
import PasswordChangeForm from "./PasswordChangeForm";

import './MainScreen.scss';
import "~/components/dialog.scss";

export default function MainScreen(props) {
    const { loadActivities, activities, activityLog, logout,
        saveActivities, editButtonPressed, isEditDialogShown,
        dialogCancelButtonPressed, passwordChange } = props;

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    const [isMenuOpen, setMenuState] = useState(false);
    const [isPasswordChangeDialogOpen, setPasswordChangeDialogState] = useState(false);

    return (
        <div className="screen-wrapper">
            <div className="screen-header">
                <div className="screen-header__item">
                    <button
                        className={classNames(
                            'screen-header__menu-button', {
                                'icon-menu': !isMenuOpen,
                                'icon-close': isMenuOpen,
                            }
                        )}
                        aria-label={isMenuOpen ? 'Close' : 'Menu'}
                        onClick={toggleMenuState}
                    />
                </div>
                <div className="screen-header__item">
                    {props.user.name}
                </div>
            </div>

            {isMenuOpen &&
                <div className="screen-menu">
                    <button className="screen-menu__item" onClick={editButtonPressed}>Edit Activities</button>
                    <button className="screen-menu__item" onClick={showPasswordChangeDialog}>Change Password</button>
                    <button className="screen-menu__item" onClick={logout}>Log out</button>
                </div>
            }

            <div className="screen-body">
                <div className="screen-body__block">
                    <div className="screen-body__title">Today</div>
                    <Activities />
                </div>
                <div className="screen-body__block">
                    <div className="screen-body__title">Recently</div>
                    <ActivityLog activityLog={activityLog} activities={activities} />
                </div>
            </div>

            <div className="screen-footer">
                <div className="screen-footer__item">
                    <span>Powered by:</span>
                    <span className="screen-footer__react-icon" title="React"/>
                    <span className="screen-footer__node-icon" title="Node.js"/>
                </div>
                <div className="screen-footer__item">
                    <a href="https://github.com/blrop/activities-calendar" target="_blank" rel="noopener noreferrer">Source</a>
                </div>
            </div>

            {activities && <ActivitiesEditor
                activities={activities}
                onSubmit={onEditDialogSubmit}
                onClose={dialogCancelButtonPressed}
                isShown={isEditDialogShown}
            />}

            <PasswordChangeForm
                onSubmit={onPasswordChangeDialogSubmit}
                onClose={hidePasswordChangeDialog}
                isShown={isPasswordChangeDialogOpen}
            />
        </div>
    );

    function toggleMenuState() {
        setMenuState(!isMenuOpen);
    }

    function onEditDialogSubmit(data) {
        saveActivities(data);
    }

    function showPasswordChangeDialog() {
        setPasswordChangeDialogState(true);
    }

    function hidePasswordChangeDialog() {
        setPasswordChangeDialogState(false);
    }

    function onPasswordChangeDialogSubmit({ password, newPassword }) {
        passwordChange({ password, newPassword });
    }
}

MainScreen.propTypes = {
    activityLog: PropTypes.array.isRequired,
    activities: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isEditDialogShown: PropTypes.bool.isRequired,

    loadActivities: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    saveActivities: PropTypes.func.isRequired,
    editButtonPressed: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
};