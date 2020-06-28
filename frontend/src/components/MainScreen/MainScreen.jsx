import React, { Component } from 'react';
import PropTypes from "prop-types";

import Activities from "~/components/MainScreen/Activities/ActivitiesContainer";
import './MainScreen.scss';

export default class MainScreen extends Component {
    static propTypes = {
        loadActivities: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const { loadActivities } = this.props;

        loadActivities();
    }

    render() {
        const { activities } = this.props;

        return (
            <div className="main-screen-wrapper">
                <div className="screen-block">
                    <h2>Today</h2>
                    <Activities activities={activities} />
                </div>
                <div className="screen-block">
                    <h2>Recently</h2>
                </div>
            </div>
        );
    }
}