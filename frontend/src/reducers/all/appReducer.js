import { types } from '~/actions/appActions';

const initialState = {
    isLoggedIn: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_STATE_WAS_CHANGED:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
            };
            
        default:
            return state;
    }
};

export default reducer;