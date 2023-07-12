import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/reducers';


const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
const initialState = {
    auth: {
        token: storedToken || null,
        user: JSON.parse(storedUser) || null,
        error: null,
        isLoading: false,
    },
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

export default store;
