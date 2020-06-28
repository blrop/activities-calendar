import { combineReducers } from 'redux';

import activityLogReducer from "./activityLogReducer";
import activitiesReducer from "./activitiesReducer";

export default () => combineReducers({
    activityLogReducer,
    activitiesReducer,
});