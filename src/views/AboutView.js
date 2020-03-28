import React from 'react';
import { withRouter } from 'react-router-dom';

import About from '../components/about/About';

export default withRouter((props) => {

    return (
        <About {...props} />
    );
});