import { types } from '~/actions/activitiesActions';

const initialState = {
    items: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ACTIVITIES_LOADED:
            return {
                ...state,
                items: action.payload.items,
            };
        default:
            return state;
    }
};

export default reducer;