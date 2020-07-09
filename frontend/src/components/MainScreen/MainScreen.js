import React, { Component } from 'react';
import PropTypes from "prop-types";

import Activities from "~/components/MainScreen/Activities/ActivitiesContainer";
import ActivityLog from "~/components/MainScreen/ActivityLog/ActivityLog";
import './MainScreen.scss';

export default class MainScreen extends Component {
    static propTypes = {
        activityLog: PropTypes.object.isRequired,
        activities: PropTypes.object.isRequired,

        loadActivities: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { loadActivities } = this.props;

        loadActivities();
    }

    render() {
        const { activities, activityLog, logout } = this.props;

        return (
            <>
                <div className="screen-header">
                    <div className="screen-header__item">
                        <button className="icon-menu screen-header__menu-button" aria-label="Menu"/>
                    </div>
                    <div className="screen-header__item">
                        <button onClick={logout} className="button-secondary">Log out</button>
                    </div>
                </div>
                <div className="screen-body">
                    <div className="screen-body__block">
                        <div className="screen-block__title">Today</div>
                        <Activities />
                    </div>
                    <div className="screen-body__block">
                        <div className="screen-block__title">Recently</div>
                        <ActivityLog activityLog={activityLog} activities={activities} />
                    </div>
                </div>
            </>
        );
    }
}