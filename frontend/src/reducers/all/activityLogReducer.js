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
        case types.LOG_ACTIVITY:
            return update(state, {
                log: {
                    0: {
                        content: {
                            $push: [{
                                title: action.payload.title,
                                colorId: action.payload.colorId,
                            }]
                        }
                    }
                }
            });

        case types.DROP_ACTIVITY:
            return update(state, {
                log: {
                    0: {
                        content: {
                            $set: state.log[0].content.filter(item =>
                                item.title !== action.payload.title
                            )
                        }
                    }
                }
            });

        default:
            return state;
    }
};

export default reducer;