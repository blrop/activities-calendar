export const types = {
    ACTIVITY_LOGGED: 'ACTIVITY_LOGGED',
    ACTIVITY_DROPPED: 'ACTIVITY_DROPPED',
};

const activityLogged = (title, colorId) => ({
    type: types.ACTIVITY_LOGGED,
    payload: { title, colorId },
});

const activityDropped = (title) => ({
    type: types.ACTIVITY_DROPPED,
    payload: { title },
});

export const logActivity = (title, colorId) => (dispatch) => {
    fetch('/activity-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, colorId })
    })
        .then(response => response.json())
        .then(() => {
            dispatch(activityLogged(title, colorId));
        })
        .catch(error => {
            console.log(error);
        });
};

export const dropActivity = (title) => (dispatch) => {
    fetch('/activity-log/last', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    })
        .then(response => response.json())
        .then(() => {
            dispatch(activityDropped(title));
        })
        .catch(error => {
            console.log(error);
        });
};