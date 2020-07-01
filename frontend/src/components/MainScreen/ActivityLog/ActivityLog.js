import React, { Component } from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';

import './ActivityLog.scss';

export default class ActivityLog extends Component {
    static propTypes = {
        activityLog: PropTypes.object.isRequired,
        activities: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.renderMarkers = this.renderMarkers.bind(this);
    }

    renderMarkers(activitiesIds) {
        const { activities } = this.props;
        return activitiesIds.map(id => {
            const activity = activities[id];
            if (!activity) {
                console.error(`Cannot find an activity with id=${id}`);
                return null;
            }

            return (
                <div
                    key={id}
                    className="activity-log-item__marker"
                    title={activity.title}
                    style={{ backgroundColor: activity.color }}
                />
            );
        });
    }

    render() {
        const { activityLog } = this.props;

        return _.map(activityLog, (activitiesIds, key) => (
            <div className="activity-log-item" key={key}>
                <div className="activity-log-item__date">{key}</div>
                <div className="activity-log-item__details">
                    {this.renderMarkers(activitiesIds)}
                </div>
            </div>
        ));
    }
}