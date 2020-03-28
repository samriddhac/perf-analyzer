import { combineReducers } from 'redux';

import FrameRateReducer from './perf-reducers/FrameRateReducer';
import GeneralStatReducer from './perf-reducers/GeneralStatReducer';

export default combineReducers({
    diagonostics: combineReducers({
        framerateStats:FrameRateReducer,
        loadStats: GeneralStatReducer
    })
});