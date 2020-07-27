export const types = {
    ACTIVITIES_LOADED: 'ACTIVITIES_LOADED',
    ACTIVITIES_SAVED: 'ACTIVITIES_SAVED',
    EDIT_ACTIVITIES_BUTTON_PRESSED: 'EDIT_ACTIVITIES_BUTTON_PRESSED',
    ACTIVITIES_DIALOG_CANCEL_BUTTON_PRESSED: 'ACTIVITIES_DIALOG_CANCEL_BUTTON_PRESSED',
};

const activitiesLoaded = (items) => ({
    type: types.ACTIVITIES_LOADED,
    payload: { items },
});

const activitiesSaved = (items) => ({
    type: types.ACTIVITIES_SAVED,
    payload: { items },
});

export const editActivitiesButtonPressed = () => ({
    type: types.EDIT_ACTIVITIES_BUTTON_PRESSED,
});

export const activitiesDialogCancelButtonPressed = () => ({
    type: types.ACTIVITIES_DIALOG_CANCEL_BUTTON_PRESSED,
});

export const loadActivities = () => (dispatch) => {
    fetch('/activities', { method: 'GET' })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                dispatch(activitiesLoaded(data.activities));
            } else {
                console.log(data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const saveActivities = (activities)  => (dispatch) => {
    fetch('/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activities),
    })
        .then(response => response.json())
        .then((data) => {
            if (data.success) {
                dispatch(activitiesSaved(activities));
            } else {
                console.log(data.message);
            }
        })
        .catch(error => {
            console.log(error);
        });
}