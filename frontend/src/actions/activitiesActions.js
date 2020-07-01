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
            color: '#0BD9E3',
        },
        101: {
            title: 'Activity 2',
            color: '#0CED2B',
        },
        102: {
            title: 'Activity 3',
            color: '#CDD600',
        },
        103: {
            title: 'Activity 4',
            color: '#F0A500',
        },
        104: {
            title: 'Activity 5',
            color: '#E64307',
        },
    };

    dispatch(activitiesLoaded(activitiesMock));
};