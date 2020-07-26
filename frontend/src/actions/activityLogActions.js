import { formatDate } from "~/tools/tools";
import moment from 'moment';

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
            dispatch(activityLoaded(fillLogWithEmptyDates(log)));
        })
        .catch(error => {
            console.log(error);
        });
};

const fillLogWithEmptyDates = (log) => {
    let result = [];
    let nextDate = moment().startOf('day');

    for (let i = 0; i < log.length; i++) {
        const itemDate = moment(log[i].date).startOf('day');
        while (nextDate.diff(itemDate, 'days') >= 1) {
            result.push({
                content: [],
                date: formatDate(nextDate),
            });
            nextDate = nextDate.subtract(1, 'days');
        }
        result.push(log[i]);
        nextDate = moment(log[i].date).subtract(1, 'days').startOf('day');
    }

    return result;
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