import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from "prop-types";

import Activity from "~/components/MainScreen/Activities/Activity/Activity";
import { getCurrentDate } from "~/tools/tools";
import './Activities.scss';

export default class Activities extends Component {
    static propTypes = {
        activities: PropTypes.object,
        activityLog: PropTypes.object,

        logActivity: PropTypes.func.isRequired,
    };

    static defaultProps = {
        activities: {},
    };

    constructor(props) {
        super(props);

        this.toggleActivity = this.toggleActivity.bind(this);
    }

    toggleActivity(activityId) {
        const { logActivity, dropActivity, activityLog } = this.props;

        const currentDate = getCurrentDate();
        const currentActivities = _.get(activityLog, `[${currentDate}]`, []);
        if (currentActivities.includes(activityId)) {
            dropActivity(currentDate, activityId);
        } else {
            logActivity(currentDate, activityId);
        }
    }

    render() {
        const { activities, activityLog } = this.props;

        const currentActivities = _.get(activityLog, `[${getCurrentDate()}]`, []);

        return (
            <div className="activity-list">
                {_.map(activities, (item, id) => (
                    <Activity
                        title={item.title}
                        key={id} id={id}
                        onClick={this.toggleActivity}
                        active={currentActivities.includes(id)}
                    />
                ))}
            </div>
        );
    }
}