export const types = {
    LOG_ACTIVITY: 'LOG_ACTIVITY',
    DROP_ACTIVITY: 'DROP_ACTIVITY',
};

export const logActivity = (title, colorId) => ({
    type: types.LOG_ACTIVITY,
    payload: { title, colorId },
});

export const dropActivity = (title) => ({
    type: types.DROP_ACTIVITY,
    payload: { title },
});

// todo: add server requests before running redux actions