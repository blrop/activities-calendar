import update from 'immutability-helper';

import { types } from '~/actions/activitiesActions';
import { getCurrentDate } from "~/tools/tools";

const initialState = {
    log: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOG_ACTIVITY:
            return update(state, {
                log: {
                    [getCurrentDate()]: {
                        $push: action.payload.activityId
                    }
                }
            });
        default:
            return state;
    }
};

export default reducer;