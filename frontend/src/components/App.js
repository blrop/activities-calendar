import React, { Component } from 'react';

import MainScreen from "~/components/MainScreen/MainScreenContainer";
import './App.scss';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <MainScreen />
            </div>
        );
    }
}
