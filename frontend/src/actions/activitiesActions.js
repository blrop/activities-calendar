export const types = {
    ACTIVITIES_LOADED: 'ACTIVITIES_LOADED',
};

const activitiesLoaded = (items) => ({
    type: types.ACTIVITIES_LOADED,
    payload: { items },
});

export const loadActivities = () => (dispatch) => {
    fetch('/activities', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            dispatch(activitiesLoaded(data));
        });
};