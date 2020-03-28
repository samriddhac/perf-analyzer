import React from 'react';

const withPerformance = WrappedComponent => {

    class WithPerformanceComponent extends React.Component {

        componentWillMount() {
            if (performance.measure === undefined) {
                console.log("Create Measures: performance.measure Not supported", 1);
                return;
            }
            performance.mark(`${WrappedComponent.name}-componentWillMount`);
        }

        componentDidMount() {
            if (performance.measure === undefined) {
                console.log("Create Measures: performance.measure Not supported", 1);
                return;
            }
            performance.mark(`${WrappedComponent.name}-componentDidMount`);
            performance.measure(`perf_${WrappedComponent.name}-load`, 
                `${WrappedComponent.name}-componentWillMount`, 
                `${WrappedComponent.name}-componentDidMount`);
        }

        componentDidUpdate() {
            if (performance.measure === undefined) {
                console.log("Create Measures: performance.measure Not supported", 1);
                return;
            }
            performance.mark(`${WrappedComponent.name}-componentDidUpdate`);
            performance.measure(`perf_${WrappedComponent.name}-load`, 
                `${WrappedComponent.name}-componentWillMount`, 
                `${WrappedComponent.name}-componentDidUpdate`);
        }

        render() {
            return <WrappedComponent />
        }
    }
    return WithPerformanceComponent;
}

export default withPerformance;