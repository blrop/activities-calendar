export const types = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
};

export const increment = () => ({
    type: types.INCREMENT,
});

export const decrement = () => ({
    type: types.DECREMENT,
});
