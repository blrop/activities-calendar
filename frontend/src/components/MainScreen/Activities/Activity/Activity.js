import React, { Component } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

export default class Activity extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired,

        title: PropTypes.string.isRequired,
        colorId: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        active: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { index, onClick } = this.props;

        onClick(index);
    }

    render() {
        const { title, colorId, active } = this.props;

        return (
            <div className={classNames(
                "activity-list__item",
                `activity-list__item--color-${colorId}`,
                { 'activity-list__item--active': active }
            )}>
                <button onClick={this.onClick}>{title}</button>
            </div>
        );
    }
}