import { formatDate } from "~/tools/tools";

export const types = {
    ACTIVITY_LOADED: 'ACTIVITY_LOADED',
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
        body: JSON.stringify({
            title,
            colorId,
            date: formatDate(new Date()),
        })
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
        body: JSON.stringify({
            title,
            date: formatDate(new Date()),
        })
    })
        .then(response => response.json())
        .then(({ content }) => {
            dispatch(activityModified(content));
        })
        .catch(error => {
            console.log(error);
        });
};