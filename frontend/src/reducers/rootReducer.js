import { combineReducers } from 'redux';

import activityLogReducer from "./all/activityLogReducer";
import activitiesReducer from "./all/activitiesReducer";
import appReducer from "./all/appReducer";

export default () => combineReducers({
    activityLogReducer,
    activitiesReducer,
    appReducer,
});