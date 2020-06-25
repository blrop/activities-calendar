import { connect } from 'react-redux';

import App from './App';
import { decrement, increment } from "../actions/appActions";

const mapStateToProps = ({
    appReducer: {
        count,
    },
}) => ({
    count,
});

const mapDispatchToProps = {
    increment,
    decrement,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);