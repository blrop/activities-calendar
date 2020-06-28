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
            title: 'Activity 1'
        },
        101: {
            title: 'Activity 2'
        },
        102: {
            title: 'Activity 3'
        },
    };

    dispatch(activitiesLoaded(activitiesMock));
};