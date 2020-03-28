import { combineReducers } from 'redux';

import FrameRateReducer from './perf-reducers/FrameRateReducer';
import GeneralStatReducer from './perf-reducers/GeneralStatReducer';
import PaintReducer from './perf-reducers/PaintReducer';
import UserMeasuresReducer from './perf-reducers/UserMeasuresReducer';

export default combineReducers({
    diagonostics: combineReducers({
        framerateStats:FrameRateReducer,
        loadStats: GeneralStatReducer,
        paintStats: PaintReducer,
        measureStats: UserMeasuresReducer
    })
});