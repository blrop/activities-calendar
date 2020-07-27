import { types } from '~/actions/appActions';

const initialState = {
    isLoggedIn: null,
    user: null,
    isPasswordDialogShown: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTH_STATE_WAS_CHANGED:
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user,
            };

        case types.PASSWORD_CHANGE_BUTTON_PRESSED:
            return {
                ...state,
                isPasswordDialogShown: true,
            };

        case types.PASSWORD_DIALOG_CANCEL_BUTTON_PRESSED:
            return {
                ...state,
                isPasswordDialogShown: false,
            };

        case types.PASSWORD_WAS_CHANGED:
            return {
                ...state,
                isPasswordDialogShown: false,
            };

        default:
            return state;
    }
};

export default reducer;