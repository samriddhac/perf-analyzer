import React from 'react';
import { withRouter } from 'react-router-dom';

import PhysicsMisc from '../components/physics/misc/PhysicsMisc';

export default withRouter((props) => {

    return (
        <PhysicsMisc {...props} />
    );
});