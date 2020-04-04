import { combineReducers } from 'redux';
import { withReduxStateSync } from 'redux-state-sync';
import FrameRateReducer from './perf-reducers/FrameRateReducer';
import GeneralStatReducer from './perf-reducers/GeneralStatReducer';
import PaintReducer from './perf-reducers/PaintReducer';
import UserMeasuresReducer from './perf-reducers/UserMeasuresReducer';

const rootReducer = combineReducers({
    diagonostics: combineReducers({
        framerateStats:FrameRateReducer,
        loadStats: GeneralStatReducer,
        paintStats: PaintReducer,
        measureStats: UserMeasuresReducer
    })
});

export default withReduxStateSync(rootReducer);