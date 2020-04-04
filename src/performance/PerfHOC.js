import React from 'react';

const withPerformance = WrappedComponent => {

    class WithPerformanceComponent extends React.Component {

        constructor(props) {
            super(props);
        }

        componentWillMount() {
            if (performance.mark === undefined) {
                console.log("Create Measures: performance.measure Not supported", 1);
                return;
            }
            performance.mark(`${WrappedComponent.name}.componentWillMount`);
        }

        componentDidMount() {
            if (performance.mark === undefined || performance.measure === undefined) {
                console.log("Create Measures: performance.measure Not supported", 1);
                return;
            }
            performance.mark(`${WrappedComponent.name}.componentDidMount`);
        }

        componentDidUpdate() {
            if (performance.mark === undefined || performance.measure === undefined) {
                console.log("Create Measures: performance.measure Not supported", 1);
                return;
            }
            performance.mark(`${WrappedComponent.name}.componentDidUpdate`);
        }

        onRender(profile) {
            performance.mark(`${WrappedComponent.name}.commit`);
            if(performance.getEntriesByName(`${WrappedComponent.name}.componentWillMount`, 
                'mark').length > 0) {
                performance.measure(`perf-${WrappedComponent.name}-commit.componentWillMount`, 
                `${WrappedComponent.name}.componentWillMount`, 
                `${WrappedComponent.name}.commit`);
                console.log('Processed component '+ WrappedComponent.name);
            }
            if(performance.getEntriesByName(`${WrappedComponent.name}.componentDidMount`, 
                'mark').length > 0) {
                performance.measure(`perf-${WrappedComponent.name}-commit.componentDidMount`, 
                `${WrappedComponent.name}.componentDidMount`, 
                `${WrappedComponent.name}.commit`);
                console.log('Processed component '+ WrappedComponent.name);
            }
            if(performance.getEntriesByName(`${WrappedComponent.name}.componentDidUpdate`, 
                'mark').length > 0) {
                performance.measure(`perf-${WrappedComponent.name}-commit.componentDidUpdate`, 
                `${WrappedComponent.name}.componentDidUpdate`, 
                `${WrappedComponent.name}.commit`);
                console.log('Processed component '+ WrappedComponent.name);
            }
        }

        render() {
            const Profiler = React.unstable_Profiler || React.Profiler;
            return (
                <Profiler onRender={this.onRender}>
                    <WrappedComponent id={`${WrappedComponent.name}.instance`} 
                        onRender={this.onRender} {...this.props}/>
                </Profiler>
            );
        }
    }
    return WithPerformanceComponent;
}

export default withPerformance;