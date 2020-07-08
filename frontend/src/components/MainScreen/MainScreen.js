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
                <div className="main-screen-header">
                    <button onClick={logout}>Log out</button>
                </div>
                <div className="main-screen-wrapper">
                    <div className="screen-block">
                        <h2>Today</h2>
                        <Activities />
                    </div>
                    <div className="screen-block">
                        <h2>Recently</h2>
                        <ActivityLog activityLog={activityLog} activities={activities} />
                    </div>
                </div>
            </>
        );
    }
}