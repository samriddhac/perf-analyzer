import * as constants from '../../actions/AppConstants';

const INITIAL_STATE ={
    stats: []
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case constants.PERF_CAPTURE_USER_STATS:
            return { stats:[...state.stats, action.payload]};
        default:
            return state;
    }
}