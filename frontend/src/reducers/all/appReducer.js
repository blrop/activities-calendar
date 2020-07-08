import { types } from '~/actions/appActions';

const initialState = {
    isLoggedIn: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GOT_LOGIN_RESULT:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
            };
            
        default:
            return state;
    }
};

export default reducer;