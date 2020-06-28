export const types = {
    LOG_ACTIVITY: 'LOG_ACTIVITY',
    DROP_ACTIVITY: 'DROP_ACTIVITY',
};

export const logActivity = (currentDate, activityId) => ({
    type: types.LOG_ACTIVITY,
    payload: { currentDate, activityId },
});

export const dropActivity = (currentDate, activityId) => ({
    type: types.DROP_ACTIVITY,
    payload: { currentDate, activityId },
});