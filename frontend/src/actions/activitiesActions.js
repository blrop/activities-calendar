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
            colorId: '8',
        },
        101: {
            title: 'Activity 2',
            colorId: '9',
        },
        102: {
            title: 'Activity 3',
            colorId: '10',
        },
        103: {
            title: 'Activity 4',
            colorId: '11',
        },
        104: {
            title: 'Activity 5',
            colorId: '12',
        },
        105: {
            title: 'Activity 6',
            colorId: '13',
        },
        106: {
            title: 'Activity 7',
            colorId: '14',
        },
    };

    dispatch(activitiesLoaded(activitiesMock));
};