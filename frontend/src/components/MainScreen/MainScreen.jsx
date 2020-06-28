import React, { Component } from 'react';
import PropTypes from "prop-types";

import Activities from "~/components/MainScreen/Activities/Activities";

export default class MainScreen extends Component {
    static propTypes = {
        activities: PropTypes.object,

        loadActivities: PropTypes.func.isRequired,
    };

    static defaultProps = {
        activities: {},
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