import { connect } from 'react-redux';

import MainScreen from './MainScreen';
import { loadActivities, saveActivities, editActivitiesButtonPressed, activitiesDialogCancelButtonPressed } from "~/actions/activitiesActions";
import { logout, passwordChange, passwordChangeButtonPressed, passwordDialogCancelButtonPressed } from "~/actions/appActions";
import { loadLog } from "~/actions/activityLogActions";

const mapStateToProps = ({
    activityLogReducer: {
        log: activityLog,
    },
    activitiesReducer: {
        items: activities,
        isActivitiesDialogShown,
    },
    appReducer: {
        isPasswordDialogShown,
        user,
    }
}) => ({
    user,

    activities,
    activityLog,

    isActivitiesDialogShown,
    isPasswordDialogShown,
});

const mapDispatchToProps = {
    loadActivities,
    loadLog,

    logout,

    editActivitiesButtonPressed,
    activitiesDialogCancelButtonPressed,
    saveActivities,

    passwordChangeButtonPressed,
    passwordDialogCancelButtonPressed,
    passwordChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);