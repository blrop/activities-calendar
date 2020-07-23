import { connect } from 'react-redux';

import MainScreen from './MainScreen';
import { loadActivities, saveActivities, editButtonPressed, dialogCancelButtonPressed } from "~/actions/activitiesActions";
import { logout, passwordChange } from "~/actions/appActions";

const mapStateToProps = ({
    activityLogReducer: {
        log: activityLog,
    },
    activitiesReducer: {
        items: activities,
        isEditDialogShown,
    },
}) => ({
    activityLog,
    activities,
    isEditDialogShown,
});

const mapDispatchToProps = {
    loadActivities,
    logout,
    saveActivities,
    editButtonPressed,
    dialogCancelButtonPressed,
    passwordChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);