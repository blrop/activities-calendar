export const types = {
    GOT_LOGIN_RESULT: 'GOT_LOGIN_RESULT',
};

const gotLoginResult = (isLoggedIn) => ({
    type: types.GOT_LOGIN_RESULT,
    payload: { isLoggedIn },
});

export const checkIsLoggedIn = () => (dispatch) => {
    fetch('/is-logged-in', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            dispatch(gotLoginResult(data.isAuthenticated));
        })
        .catch(error => {
            dispatch(gotLoginResult(false));
            // console.error(error);
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
            dispatch(gotLoginResult(data.success));
        })
        .catch(error => {
            dispatch(gotLoginResult(false));
            // console.error(error);
        });
}

export const register = (userName, password) => {
    console.log(`Attempt to register with username=${userName} and password=${password}`);
};