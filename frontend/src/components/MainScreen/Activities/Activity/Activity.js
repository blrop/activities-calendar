import React, { Component } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

export default class Activity extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,

        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { id, onClick } = this.props;

        onClick(id);
    }

    render() {
        const { title, active } = this.props;

        return (
            <div className={classNames("activity-list__item", { 'activity-list__item--active': active })}>
                <button onClick={this.onClick}>{title}</button>
            </div>
        );
    }
}