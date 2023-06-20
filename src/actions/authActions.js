export const loginRequest = () => ({
    type: 'LOGIN_REQUEST',
});

export const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const registerRequest = () => ({
    type: 'REGISTER_REQUEST',
});

export const registerSuccess = (token) => ({
    type: 'REGISTER_SUCCESS',
    payload: token,
});

export const registerFailure = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: error,
});