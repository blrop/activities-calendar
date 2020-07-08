import { connect } from 'react-redux';

import MainScreen from './MainScreen';
import { loadActivities } from "~/actions/activitiesActions";
import { logout } from "~/actions/appActions";

const mapStateToProps = ({
    activityLogReducer: {
        log: activityLog,
    },
    activitiesReducer: {
        items: activities,
    },
}) => ({
    activityLog,
    activities,
});

const mapDispatchToProps = {
    loadActivities,
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);