import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.scss';

export default class App extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
    };

    render() {
        const { increment, decrement, count } = this.props;

        return (
            <div className="app">
                test! <br/>
                current value is {count} <br/>
                <button onClick={increment}>Increment!</button>
                <button onClick={decrement}>Decrement!</button>
            </div>
        );
    }
}
