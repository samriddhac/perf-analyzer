import React from 'react';

const withPerformance = WrappedComponent => {

    class WithPerformanceComponent extends React.Component {

        componentWillMount() {
            console.log('I am about to render!', WrappedComponent.name);
        }

        componentDidMount() {
            console.log('React Component ', WrappedComponent.name)
        }

        render() {
            return <WrappedComponent />
        }
    }
    return WithPerformanceComponent;
}

export default withPerformance;