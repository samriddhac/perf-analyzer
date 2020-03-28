import React from 'react';
import { captureLoadStats } from '../../store/actions/AppActions';

export const usePerformanceObserver = (dispatch) => {
    if (window.PerformanceObserver === undefined) return;
    const process = (type, data) => {
        switch (type) {
            case "frame":
                break;
            case "mark":
                break;
            case "measure":
                break;
            case "resource":
                break;
            default:
                console.log("Unexpected performance entry type: " + type);
                break;
        }
    }
    const observe_all = new PerformanceObserver(function (list) {
        let perfEntries = list.getEntries();
        for (var i = 0; i < perfEntries.length; i++) {
            process(perfEntries[i].entryType, perfEntries[i]);

        }
    });
    // Observe frame, mark, measure and resource events
    observe_all.observe({ entryTypes: ['frame', 'mark', 'measure', 'resource'] });
}



export const useNavigationObserver = (dispatch) => {
    const perfObj = window.performance.timing;
    dispatch(captureLoadStats({
        network: {
            sequences: [
                {
                    label: "Redirect (redirectEnd - redirectStart)",
                    measure: (perfObj.redirectEnd - perfObj.redirectStart),
                    color: '#FF6384'
                },
                {
                    label: "App Cache (domainLookupStart - fetchStart)",
                    measure: (perfObj.domainLookupStart - perfObj.fetchStart),
                    color: '#36A2EB'
                },
                {
                    label: "Domain Lookup (redirectEnd - domainLookupStart)",
                    measure: (perfObj.domainLookupEnd - perfObj.domainLookupStart),
                    color: '#FFCE56'
                },
                {
                    label: "Server Connect (connectEnd - connectStart)",
                    measure: (perfObj.connectEnd - perfObj.connectStart),
                    color: '#BA1414'
                },
                {
                    label: "Server Response (responseStart - requestStart)",
                    measure: (perfObj.responseStart - perfObj.requestStart),
                    color: '#14BA8E'
                },
                {
                    label: "Transfer/Page Download (responseEnd - responseStart)",
                    measure: (perfObj.responseEnd - perfObj.responseStart),
                    color: '#1FBA14'
                }
            ],
            cumulative: [
                {
                    label: "Page Load (loadEventStart - navigationStart)",
                    measure: (perfObj.loadEventStart - perfObj.navigationStart)
                }
            ]
        },
        render: {
            sequences: [
                {
                    label: "HTML Bytes to DOM (domInteractive - domLoading)",
                    measure: (perfObj.domInteractive - perfObj.domLoading),
                    color: '#FF6384'
                },
                {
                    label: "CSSOM Preparation (domContentLoadedEventStart - domInteractive)",
                    measure: (perfObj.domContentLoadedEventStart - perfObj.domInteractive),
                    color: '#36A2EB'
                },
                {
                    label: "JS Exectuin (domContentLoadedEventEnd - domContentLoadedEventStart)",
                    measure: (perfObj.domContentLoadedEventEnd - perfObj.domContentLoadedEventStart),
                    color: '#FFCE56'
                },
                {
                    label: "Render Engine (domComplete - domContentLoadedEventEnd)",
                    measure: (perfObj.domComplete - perfObj.domContentLoadedEventEnd),
                    color: '#BA1414'
                },
                {
                    label: "window.onLoad Event (loadEventEnd - loadEventStart)",
                    measure: (perfObj.loadEventEnd - perfObj.loadEventStart),
                    color: '#1FBA14'
                }
            ],
            cumulative: [
                {
                    label: "DOM Processing (loadEventEnd - domInteractive)",
                    measure: (perfObj.loadEventEnd - perfObj.domInteractive)
                }
            ]
        },
        total: {
            label: "Total (loadEventEnd - redirectStart)",
            measure: (perfObj.loadEventEnd - perfObj.redirectStart)
        },
        raw: perfObj
    }));
}