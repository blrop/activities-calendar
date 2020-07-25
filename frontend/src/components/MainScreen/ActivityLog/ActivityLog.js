import React, { useState } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import { formatDate } from "~/tools/tools";
import './ActivityLog.scss';

export default function ActivityLog(props) {
    const [expanded, setExpanded] = useState(false);

    return props.activityLog.map((item, index) => (
        <div className={classNames('activity-log-item', { 'activity-log-item--expanded': expanded })}
             key={index}
             onClick={toggleExpanded}>
            <div className="activity-log-item__date">{formatDate(item.date)}:</div>
            <div className="activity-log-item__details">
                {expanded ? renderMarkersColumn(item.content) : renderMarkersRow(item.content)}
            </div>
        </div>
    ));

    function renderMarkersColumn(activityContent) {
        return activityContent.map((marker, index) => (
            <div className="activity-log-item__inner-wrapper" key={index}>
                <div
                    key={index}
                    className={`activity-log-item__marker activity-log-item__marker--color-${marker.colorId}`}
                    title={marker.title}
                />
                <div className="activity-log-item__title">{marker.title}</div>
            </div>
        ));
    }

    function renderMarkersRow(activityContent) {
        return activityContent.map((marker, index) => {
            return (
                <div
                    key={index}
                    className={`activity-log-item__marker activity-log-item__marker--color-${marker.colorId}`}
                    title={marker.title}
                />
            );
        });
    }

    function toggleExpanded() {
        setExpanded(!expanded);
    }
}

ActivityLog.propTypes = {
    activityLog: PropTypes.array.isRequired,
};