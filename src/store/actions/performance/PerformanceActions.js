import * as constants from '../AppConstants';

export const captureLoadStats = (data) => {
    return {
        type: constants.PERF_CAPTURE_GENERAL_STATS,
        payload: data
    }
}

export const captureFrameRateStats = (data) => {
    return {
        type: constants.PERF_CAPTURE_FRAME_RATE_STATS,
        payload: data
    }
}