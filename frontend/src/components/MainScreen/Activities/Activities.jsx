import React, { Component } from 'react';
import _ from 'lodash';
import Activity from "~/components/MainScreen/Activities/Activity/Activity";

export default class Activities extends Component {
    render() {
        const { activities } = this.props;

        return _.map(activities, (item, id) => (
            <Activity title={item.title}  key={id} id={id} />
        ));
    }
}