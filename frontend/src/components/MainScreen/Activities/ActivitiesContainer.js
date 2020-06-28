import { connect } from 'react-redux';

import Activities from './Activities';
import { logActivity, dropActivity } from '~/actions/activityLogActions';

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
    logActivity,
    dropActivity,
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);