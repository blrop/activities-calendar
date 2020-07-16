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
    const { loadActivities, activities, activityLog, logout } = props;

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    const [isMenuOpen, setMenuState] = useState(false);
    const [isEditDialogOpen, setEditDialogState] = useState(false);
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
                    <button className="screen-menu__item" onClick={showEditDialog}>Edit Activities</button>
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

            {activities.length && <ActivitiesEditor
                activities={activities}
                onSubmit={onEditDialogSubmit}
                onClose={hideEditDialog}
                isShown={isEditDialogOpen}
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

    function showEditDialog() {
        setEditDialogState(true);
    }

    function hideEditDialog() {
        setEditDialogState(false);
    }

    function onEditDialogSubmit(data) {
        console.log('Edit dialog was submitted!', data);
    }

    function showPasswordChangeDialog() {
        setPasswordChangeDialogState(true);
    }

    function hidePasswordChangeDialog() {
        setPasswordChangeDialogState(false);
    }

    function onPasswordChangeDialogSubmit(data) {
        console.log('Password change dialog was submitted!', data);
    }
}

MainScreen.propTypes = {
    activityLog: PropTypes.array.isRequired,
    activities: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,

    loadActivities: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};