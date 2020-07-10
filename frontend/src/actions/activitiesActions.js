export const types = {
    ACTIVITIES_LOADED: 'ACTIVITIES_LOADED',
};

const activitiesLoaded = (items) => ({
    type: types.ACTIVITIES_LOADED,
    payload: { items },
});

export const loadActivities = () => (dispatch) => {
    const activitiesMock = {
        100: {
            title: 'Activity 1',
            colorId: '1',
        },
        101: {
            title: 'Activity 2',
            colorId: '2',
        },
        102: {
            title: 'Activity 3',
            colorId: '3',
        },
        103: {
            title: 'Activity 4',
            colorId: '4',
        },
        104: {
            title: 'Activity 5',
            colorId: '5',
        },
        105: {
            title: 'Activity 6',
            colorId: '6',
        },
        106: {
            title: 'Activity 7',
            colorId: '7',
        },
    };

    dispatch(activitiesLoaded(activitiesMock));
};