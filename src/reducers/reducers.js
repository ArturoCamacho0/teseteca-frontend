// reducers/reducers.js

import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Adjust the path if needed

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
