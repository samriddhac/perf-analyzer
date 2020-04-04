import React from 'react';
import { withRouter } from 'react-router-dom';

import D3Component1 from '../components/d3/D3Component1';

export default withRouter((props) => {

    return (
        <D3Component1 {...props} />
    );
});