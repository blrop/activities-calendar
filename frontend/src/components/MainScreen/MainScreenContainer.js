import { connect } from 'react-redux';

import MainScreen from './MainScreen';
import { loadActivities } from "~/actions/activitiesActions";

const mapStateToProps = ({
    activitiesReducer: {
        items: activities,
    },
}) => ({
    activities,
});

const mapDispatchToProps = {
    loadActivities,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);