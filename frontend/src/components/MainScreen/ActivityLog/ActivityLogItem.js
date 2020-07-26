import React, { useState } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

import { formatDate } from "~/tools/tools";

import './ActivityLogItem.scss';

export default function ActivityLogItem (props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={classNames('activity-log-item', { 'activity-log-item--expanded': expanded })}
             onClick={onItemClick}>
            <div className="activity-log-item__date">{formatDate(props.item.date)}:</div>
            <div className="activity-log-item__details">
                {expanded ? renderMarkersColumn(props.item.content) : renderMarkersRow(props.item.content)}
            </div>
        </div>
    );

    function onItemClick() {
        if (props.item.content.length) {
            setExpanded(!expanded);
        }
    }

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
};

ActivityLogItem.propTypes = {
    item: PropTypes.object.isRequired,
};