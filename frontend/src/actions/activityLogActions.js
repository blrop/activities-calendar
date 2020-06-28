export const types = {
    LOG_ACTIVITY: 'LOG_ACTIVITY',
};

export const logActivity = (activityId) => ({
    type: types.LOG_ACTIVITY,
    payload: { activityId },
});