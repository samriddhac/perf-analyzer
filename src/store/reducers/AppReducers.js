import { combineReducers } from 'redux';

import FrameRateReducer from './perf-reducers/FrameRateReducer';

export default combineReducers({
    diagonostics: combineReducers({
        framerateStats:FrameRateReducer
    })
});