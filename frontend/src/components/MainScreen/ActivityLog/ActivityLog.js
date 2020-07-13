import React, { Component } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import './ActivityLog.scss';

export default class ActivityLog extends Component {
    static propTypes = {
        activityLog: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);

        this.renderMarkers = this.renderMarkers.bind(this);
    }

    renderMarkers(activityContent) {
        return activityContent.map((marker, index) => {
            return (
                <div
                    key={index}
                    className={classNames('activity-log-item__marker', `activity-log-item__marker--color-${marker.colorId}`)}
                    title={marker.title}
                />
            );
        });
    }

    render() {
        const { activityLog } = this.props;

        return activityLog.map((item, index) => (
            <div className="activity-log-item" key={index}>
                <div className="activity-log-item__date">{item.date}:</div>
                <div className="activity-log-item__details">
                    {this.renderMarkers(item.content)}
                </div>
            </div>
        ));
    }
}