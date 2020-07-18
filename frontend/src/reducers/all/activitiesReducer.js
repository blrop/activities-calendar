import { types } from '~/actions/activitiesActions';

const initialState = {
    items: [],
    isEditDialogShown: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ACTIVITIES_LOADED:
            return {
                ...state,
                items: action.payload.items,
            };

        case types.ACTIVITIES_SAVED:
            return {
                ...state,
                items: action.payload.items,
                isEditDialogShown: false,
            };

        case types.EDIT_BUTTON_PRESSED:
            return {
                ...state,
                isEditDialogShown: true,
            };

        case types.DIALOG_CANCEL_BUTTON_PRESSED:
            return {
                ...state,
                isEditDialogShown: false,
            };

        default:
            return state;
    }
};

export default reducer;