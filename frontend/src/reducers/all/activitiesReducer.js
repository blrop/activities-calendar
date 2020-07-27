import { types } from '~/actions/activitiesActions';

const initialState = {
    items: [],
    isActivitiesDialogShown: false,
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
                isActivitiesDialogShown: false,
            };

        case types.EDIT_ACTIVITIES_BUTTON_PRESSED:
            return {
                ...state,
                isActivitiesDialogShown: true,
            };

        case types.ACTIVITIES_DIALOG_CANCEL_BUTTON_PRESSED:
            return {
                ...state,
                isActivitiesDialogShown: false,
            };

        default:
            return state;
    }
};

export default reducer;