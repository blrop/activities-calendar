import { connect } from 'react-redux';

import App from './App';
import { checkIsLoggedIn, login, register } from "~/actions/appActions";

const mapStateToProps = ({
    appReducer: {
        isLoggedIn,
        user,
    },
}) => ({
    isLoggedIn,
    user,
});

const mapDispatchToProps = {
    checkIsLoggedIn,
    login,
    register,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);