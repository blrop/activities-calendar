export const types = {
    AUTH_STATE_WAS_CHANGED: 'AUTH_STATE_WAS_CHANGED',
};

const authStateWasChanged = (isLoggedIn, user = null) => ({
    type: types.AUTH_STATE_WAS_CHANGED,
    payload: { isLoggedIn, user },
});

export const checkIsLoggedIn = () => (dispatch) => {
    fetch('/is-logged-in', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            dispatch(authStateWasChanged(data.isLoggedIn, data.user));
        })
        .catch(error => {
            dispatch(authStateWasChanged(false));
            console.error(error);
        });
};

export const login = (userName, password) => (dispatch) => {
    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, password: password }),
    })
        .then(response => {
            if (response.status !== 200) {
                throw new Error('Unauthorized');
            }
            return response.json();
        })
        .then(data => {
            dispatch(authStateWasChanged(data.isLoggedIn, data.user));
        })
        .catch(error => {
            dispatch(authStateWasChanged(false));
            console.error(error);
        });
}

export const logout = () => (dispatch) => {
    fetch('/logout', {
        method: 'POST',
    })
        .then(() => {
            dispatch(authStateWasChanged(false));
        })
        .catch(error => {
            console.error(error);
        });
};

export const register = (userName, password) => {
    console.log(`Attempt to register with username=${userName} and password=${password}`);
};