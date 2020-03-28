import * as constants from '../AppConstants';

export const captureLoadStats = (data) => {
    return {
        type: constants.PERF_CAPTURE_GENERAL_STATS,
        payload: data
    }
}

export const captureRFAFrameRateStats = (data) => {
    return {
        type: constants.PERF_CAPTURE_RFA_FRAME_RATE_STATS,
        payload: data
    }
}

export const captureFrameRateStats = (data) => {
    return {
        type: constants.PERF_CAPTURE_FRAME_RATE_STATS,
        payload: data
    }
}

export const capturePaintStats = (data) => {
    return {
        type: constants.PERF_CAPTURE_PAINTS_STATS,
        payload: data
    }
}

export const captureUserStats = (data) => {
    return {
        type: constants.PERF_CAPTURE_USER_STATS,
        payload: data
    }
}