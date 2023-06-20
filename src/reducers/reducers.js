// reducers/reducers.js

import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Adjust the path if needed

const rootReducer = combineReducers({
    auth: authReducer,
    // Add other reducers as needed
});

export default rootReducer;
