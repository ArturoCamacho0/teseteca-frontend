const initialState = {
    token: '',
    error: '',
    user: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, error: '' };
        case 'LOGIN_SUCCESS':
            return { ...state, token: action.payload.token, user: action.payload.user, error: '' };
        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload };
        case 'LOGOUT_SUCCESS':
            return { ...state, token: null, user: null, error: null, };
        case 'LOGOUT_FAILURE':
                return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
