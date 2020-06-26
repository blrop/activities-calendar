import { types } from '~/actions/appActions';

const initialState = {
    count: 0,
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.INCREMENT:
            return {
                ...state,
                count: state.count + 1
            };
        case types.DECREMENT:
            return {
                ...state,
                count: state.count - 1
            };
        default:
            return state;
    }
};

export default appReducer;