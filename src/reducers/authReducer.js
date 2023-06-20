const initialState = {
    token: '',
    error: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, error: '' };
        case 'LOGIN_SUCCESS':
            return { ...state, token: action.payload, error: '' };
        case 'LOGIN_FAILURE':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default authReducer;
