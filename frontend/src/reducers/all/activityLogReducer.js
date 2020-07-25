import update from 'immutability-helper';

import { types } from '~/actions/activityLogActions';
import { getCurrentDate } from "~/tools/tools";

const initialState = {
    log: [{ // todo: remove this initialization (along with the getCurrentDate func?)
        date: getCurrentDate(),
        content: [],
    }],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ACTIVITY_LOADED:
            return update(state, {
                log: {
                    $set: action.payload.log,
                }
            });

        case types.ACTIVITY_MODIFIED:
            return update(state, {
                log: {
                    0: {
                        content: {
                            $set: action.payload.content
                        }
                    }
                }
            });

        default:
            return state;
    }
};

export default reducer;