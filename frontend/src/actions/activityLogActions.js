export const types = {
    ACTIVITY_LOADED: 'ACTIVITY_LOADED',
    // ACTIVITY_LOGGED: 'ACTIVITY_LOGGED',
    // ACTIVITY_DROPPED: 'ACTIVITY_DROPPED',
    ACTIVITY_MODIFIED: 'ACTIVITY_MODIFIED',
};

const activityLoaded = (log) => ({
    type: types.ACTIVITY_LOADED,
    payload: { log },
});

const activityModified = (content) => ({
    type: types.ACTIVITY_MODIFIED,
    payload: { content },
});

// const activityLogged = (title, colorId) => ({
//     type: types.ACTIVITY_LOGGED,
//     payload: { title, colorId },
// });
//
// const activityDropped = (title) => ({
//     type: types.ACTIVITY_DROPPED,
//     payload: { title },
// });

export const loadLog = () => (dispatch) => {
    fetch('/activity-log', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(({ log }) => {
            dispatch(activityLoaded(log));
        })
        .catch(error => {
            console.log(error);
        });
};

export const logActivity = (title, colorId) => (dispatch) => {
    fetch('/activity-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, colorId })
    })
        .then(response => response.json())
        .then(({ content }) => {
            dispatch(activityModified(content));
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
        .then(({ content }) => {
            dispatch(activityModified(content));
        })
        .catch(error => {
            console.log(error);
        });
};