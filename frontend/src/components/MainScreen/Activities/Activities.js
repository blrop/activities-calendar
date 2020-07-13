import React, { Component } from 'react';
import PropTypes from "prop-types";

import Activity from "~/components/MainScreen/Activities/Activity/Activity";
import './Activities.scss';

export default class Activities extends Component {
    static propTypes = {
        activities: PropTypes.array.isRequired,
        activityLog: PropTypes.array.isRequired,

        logActivity: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.toggleActivity = this.toggleActivity.bind(this);
        this.isActivityLogged = this.isActivityLogged.bind(this);
    }

    toggleActivity(index) {
        const { logActivity, dropActivity, activityLog, activities } = this.props;

        if (this.isActivityLogged(activityLog, activities[index].title)) {
            dropActivity(activities[index].title);
        } else {
            logActivity(activities[index].title, activities[index].colorId);
        }
    }

    isActivityLogged(activityLog, title) {
        if (!activityLog.length) {
            return false;
        }
        return activityLog[0].content.some(item => item.title === title);
    }

    render() {
        const { activities, activityLog } = this.props;

        return (
            <div className="activity-list">
                {activities.map((item, index) => (
                    <Activity
                        title={item.title}
                        colorId={item.colorId}
                        key={index}
                        index={index}
                        onClick={this.toggleActivity}
                        active={this.isActivityLogged(activityLog, item.title)}
                    />
                ))}
            </div>
        );
    }
}