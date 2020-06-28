import update from 'immutability-helper';

import { types } from '~/actions/activityLogActions';

const initialState = {
    log: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOG_ACTIVITY:
            return update(state, {
                log: {
                    [action.payload.currentDate]: {
                        $apply: (value) => {
                            if (!value) {
                                return [action.payload.activityId];
                            } else {
                                return [...value, action.payload.activityId];
                            }
                        }
                    }
                }
            });

        case types.DROP_ACTIVITY:
            return update(state, {
                log: {
                    [action.payload.currentDate]: {
                        $set: state.log[action.payload.currentDate]
                            .filter(item => item !== action.payload.activityId)
                    }
                }
            });

        default:
            return state;
    }
};

export default reducer;