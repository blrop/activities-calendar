import React from 'react';
import PropTypes from "prop-types";

import Activity from "~/components/MainScreen/Activities/Activity/Activity";
import './Activities.scss';

export default function Activities(props) {
    if (!props.activities) {
        return null;
    }

    return (
        <div className="activity-list">
            {props.activities
                .sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
                .map((item, index) => (
                <Activity
                    title={item.title}
                    colorId={item.colorId}
                    key={index}
                    index={index}
                    onClick={toggleActivity}
                    active={isActivityLogged(props.activityLog, item.title)}
                />
            ))}
        </div>
    );

    function toggleActivity(index) {
        const { logActivity, dropActivity, activityLog, activities } = props;

        if (isActivityLogged(activityLog, activities[index].title)) {
            dropActivity(activities[index].title);
        } else {
            logActivity(activities[index].title, activities[index].colorId);
        }
    }

    function isActivityLogged(activityLog, title) {
        if (!activityLog.length) {
            return false;
        }
        return activityLog[0].content.some(item => item.title === title);
    }
}

Activities.propTypes = {
    activities: PropTypes.array,
    activityLog: PropTypes.array.isRequired,

    logActivity: PropTypes.func.isRequired,
};

Activities.defaultProps = {
    activities: [],
};