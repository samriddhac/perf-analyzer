import * as constants from '../../actions/AppConstants';
import _ from 'lodash';

const INITIAL_STATE ={
    stats: []
};

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case constants.PERF_CAPTURE_PAINTS_STATS:
            let newStats = state.stats;
            _.remove(newStats, {name:action.payload.name});
            return { stats:[...newStats, action.payload]};
        default:
            return state;
    }
}