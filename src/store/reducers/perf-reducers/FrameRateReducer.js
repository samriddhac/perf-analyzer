import * as constants from '../../actions/AppConstants';

const INITIAL_STATE ={
    frameRate: [],
    rfaFrameRate: []
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case constants.PERF_CAPTURE_RFA_FRAME_RATE_STATS:
            return { rfaFrameRate:[...action.payload] };
        case constants.PERF_CAPTURE_FRAME_RATE_STATS:
            return { frameRate:[...action.payload] };
        default:
            return state;
    }
}