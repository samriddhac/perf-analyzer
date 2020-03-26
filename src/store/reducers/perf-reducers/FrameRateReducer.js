import * as constants from '../../actions/AppConstants';

const INITIAL_STATE ={
    frameRate: []
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case constants.PERF_CAPTURE_FRAME_RATE_STATS:
            return { frameRate:[...action.payload] };
        default:
            return state;
    }
}