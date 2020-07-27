import { formatDate, fillLogWithEmptyDates, errorMiddleware, onError } from "~/tools/tools";

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
        .then(errorMiddleware)
        .then((data) => {
            dispatch(activityLoaded(fillLogWithEmptyDates(data.log)));
        })
        .catch(onError);
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
        .then(errorMiddleware)
        .then((data) => {
            dispatch(activityModified(data.content));
        })
        .catch(onError);
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
        .then(errorMiddleware)
        .then((data) => {
            dispatch(activityModified(data.content));
        })
        .catch(onError);
};