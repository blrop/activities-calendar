import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import Activities from "~/components/MainScreen/Activities/ActivitiesContainer";
import ActivityLog from "~/components/MainScreen/ActivityLog/ActivityLog";
import './MainScreen.scss';

export default function MainScreen(props) {
    const { loadActivities, activities, activityLog, logout } = props;

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

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
                        aria-label="Menu"
                        onClick={toggleMenuState}
                    />
                </div>
                <div className="screen-header__item">
                    <button onClick={logout} className="button-secondary">Log out</button>
                </div>
            </div>

            {isMenuOpen && <div className="screen-menu">
                menu goes here
            </div>}

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
        </div>
    );

    function toggleMenuState() {
        setMenuState(!isMenuOpen);
    }
}

MainScreen.propTypes = {
    activityLog: PropTypes.object.isRequired,
    activities: PropTypes.object.isRequired,

    loadActivities: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};