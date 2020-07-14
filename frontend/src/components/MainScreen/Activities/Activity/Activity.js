import React from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';

export default function Activity(props) {
    return (
        <div className={classNames(
            "activity-list__item",
            `activity-list__item--color-${props.colorId}`,
            { 'activity-list__item--active': props.active }
        )}>
            <button onClick={onClick}>{props.title}</button>
        </div>
    );

    function onClick() {
        props.onClick(props.index);
    }
}

Activity.propTypes = {
    onClick: PropTypes.func.isRequired,

    title: PropTypes.string.isRequired,
    colorId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
};