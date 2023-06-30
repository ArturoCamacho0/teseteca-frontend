import axios from 'axios';

export const loginRequest = () => ({
    type: 'LOGIN_REQUEST',
});

export const loginSuccess = (token, user) => {
    // Guardar el token en el almacenamiento local
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return {
        type: 'LOGIN_SUCCESS',
        payload: { token, user },
    };
};

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const registerRequest = () => ({
    type: 'REGISTER_REQUEST',
});

export const registerSuccess = (token, user) => {
    // Guardar el token en el almacenamiento local
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return {
        type: 'REGISTER_SUCCESS',
        payload: { token, user },
    };
};

export const registerFailure = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: error,
});

export const logout = (token) => {
    return (dispatch) => {
        // Hacer una llamada a la API para cerrar la sesión
        axios
            .post('https://tesegewalt.website/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                dispatch(logoutSuccess());
            })
            .catch((error) => {
                dispatch({ type: 'LOGOUT_FAILURE', error: error.message });
                console.error(error);
            });
    };
};

const logoutSuccess = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return {
        type: 'LOGOUT_SUCCESS',
    };
};