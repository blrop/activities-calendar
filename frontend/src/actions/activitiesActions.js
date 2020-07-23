export const types = {
    ACTIVITIES_LOADED: 'ACTIVITIES_LOADED',
    ACTIVITIES_SAVED: 'ACTIVITIES_SAVED',
    EDIT_BUTTON_PRESSED: 'EDIT_BUTTON_PRESSED',
    DIALOG_CANCEL_BUTTON_PRESSED: 'DIALOG_CANCEL_BUTTON_PRESSED',
};

const activitiesLoaded = (items) => ({
    type: types.ACTIVITIES_LOADED,
    payload: { items },
});

const activitiesSaved = (items) => ({
    type: types.ACTIVITIES_SAVED,
    payload: { items },
});

export const editButtonPressed = () => ({
    type: types.EDIT_BUTTON_PRESSED,
});

export const dialogCancelButtonPressed = () => ({
    type: types.DIALOG_CANCEL_BUTTON_PRESSED,
});

export const loadActivities = () => (dispatch) => {
    fetch('/activities', { method: 'GET' })
        .then(response => response.json())
        .then(({ activities }) => {
            dispatch(activitiesLoaded(activities));
        });
};

export const saveActivities = (activities)  => (dispatch) => {
    fetch('/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activities),
    })
        .then(response => response.json())
        .then(() => {
            dispatch(activitiesSaved(activities));
        })
        .catch(error => {
            console.log(error);
        });
}