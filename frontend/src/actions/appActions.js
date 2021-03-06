import { errorMiddleware, onError } from "~/tools/tools";

export const types = {
    AUTH_STATE_WAS_CHANGED: 'AUTH_STATE_WAS_CHANGED',
    PASSWORD_CHANGE_BUTTON_PRESSED: 'PASSWORD_CHANGE_BUTTON_PRESSED',
    PASSWORD_DIALOG_CANCEL_BUTTON_PRESSED: 'PASSWORD_DIALOG_CANCEL_BUTTON_PRESSED',
    PASSWORD_WAS_CHANGED: 'PASSWORD_WAS_CHANGED',
};

export const passwordChangeButtonPressed = () => ({
    type: types.PASSWORD_CHANGE_BUTTON_PRESSED
});

export const passwordDialogCancelButtonPressed = () => ({
    type: types.PASSWORD_DIALOG_CANCEL_BUTTON_PRESSED
});

const passwordWasChanged = () => ({
    type: types.PASSWORD_WAS_CHANGED
});

const authStateWasChanged = (isLoggedIn, user = null) => ({
    type: types.AUTH_STATE_WAS_CHANGED,
    payload: { isLoggedIn, user },
});

export const checkIsLoggedIn = () => (dispatch) => {
    fetch('/user', { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                dispatch(authStateWasChanged(!!data.user, data.user));
            } else {
                console.log(data.message);
            }
        })
        .catch(error => {
            dispatch(authStateWasChanged(false));
            console.error(error);
        });
};

export const login = (userName, password) => (dispatch) => {
    fetch('/user/login', {
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
    fetch('/user/logout', {
        method: 'POST',
    })
        .then(() => {
            dispatch(authStateWasChanged(false));
        })
        .catch(error => {
            console.error(error);
        });
};

export const register = (name, password) => () => {
    return fetch('/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
    })
        .then(response => response.json())
        .then((data) => {
            if (!data.success) {
                throw new Error(data.message);
            }
            return true;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
};

export const passwordChange = ({ password, newPassword }) => (dispatch) => {
    fetch('/user/password-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, newPassword })
    })
        .then(response => response.json())
        .then(errorMiddleware)
        .then(() => {
            dispatch(passwordWasChanged());
        })
        .catch(onError);
};