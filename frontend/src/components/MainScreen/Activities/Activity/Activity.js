import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Activity extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { id } = this.props;

        console.log(`An activity with id=${id} was clicked`);
    }

    render() {
        const { title } = this.props;

        return (
            <button onClick={this.onClick}>{title}</button>
        );
    }
}