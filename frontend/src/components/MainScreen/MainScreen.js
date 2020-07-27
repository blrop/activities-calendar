import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import Activities from "~/components/MainScreen/Activities/ActivitiesContainer";
import ActivityLogItem from "~/components/MainScreen/ActivityLog/ActivityLogItem";
import ActivitiesEditor from "~/components/ActivitiesEditor/ActivitiesEditor";
import PasswordChangeForm from "./PasswordChangeForm";

import './MainScreen.scss';
import "~/components/dialog.scss";

export default function MainScreen(props) {
    const {
        loadActivities,
        loadLog,

        user,
        logout,

        activities,
        activityLog,

        isActivitiesDialogShown,
        editActivitiesButtonPressed,
        activitiesDialogCancelButtonPressed,
        saveActivities,

        isPasswordDialogShown,
        passwordChangeButtonPressed,
        passwordDialogCancelButtonPressed,
        passwordChange,
    } = props;

    useEffect(() => {
        loadActivities();
        loadLog();
    }, [loadActivities, loadLog]);

    const [isMenuOpen, setMenuState] = useState(false);

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
                    {user.name}
                </div>
            </div>

            {isMenuOpen &&
                <div className="screen-menu">
                    <button className="screen-menu__item" onClick={editActivitiesButtonPressed}>Edit Activities</button>
                    <button className="screen-menu__item" onClick={passwordChangeButtonPressed}>Change Password</button>
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
                    {activityLog.map((item, index) => (
                        <ActivityLogItem item={item} key={index} />
                    ))}
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

            {isActivitiesDialogShown && <ActivitiesEditor
                activities={activities}
                onSubmit={onEditActivitiesDialogSubmit}
                onClose={activitiesDialogCancelButtonPressed}
            />}

            {isPasswordDialogShown && <PasswordChangeForm
                onSubmit={onPasswordChangeDialogSubmit}
                onClose={passwordDialogCancelButtonPressed}
            />}
        </div>
    );

    function toggleMenuState() {
        setMenuState(!isMenuOpen);
    }

    function onEditActivitiesDialogSubmit(data) {
        saveActivities(data);
    }

    function onPasswordChangeDialogSubmit({ password, newPassword }) {
        passwordChange({ password, newPassword });
    }
}

MainScreen.propTypes = {
    loadActivities: PropTypes.func.isRequired,
    loadLog: PropTypes.func.isRequired,

    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,

    activities: PropTypes.array.isRequired,
    activityLog: PropTypes.array.isRequired,

    isActivitiesDialogShown: PropTypes.bool.isRequired,
    editActivitiesButtonPressed: PropTypes.func.isRequired,
    activitiesDialogCancelButtonPressed: PropTypes.func.isRequired,
    saveActivities: PropTypes.func.isRequired,

    isPasswordDialogShown: PropTypes.bool.isRequired,
    passwordChangeButtonPressed: PropTypes.func.isRequired,
    passwordDialogCancelButtonPressed: PropTypes.func.isRequired,
    passwordChange: PropTypes.func.isRequired,
};

MainScreen.defaultProps = {
    activities: [],
};