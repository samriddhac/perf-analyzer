import React from 'react';
import { withRouter } from 'react-router-dom';

import Clocks from '../components/physics/clocks/Clocks';

export default withRouter((props) => {

    return (
        <Clocks {...props} />
    );
});