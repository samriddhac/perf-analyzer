import React from 'react';
import {NavbarBrand} from 'reactstrap';
import { Link } from 'react-router-dom';
import AppBar from './AppBar';
import './Header.css';
import logo from './react-512.webp';

import * as resources from '../../../resources/resources.json'

export default () => {

    return (
        <div className="header-container">
            <div className="header font-lg">
                <img src={logo} alt={'react_logo'} />
                <NavbarBrand tag={Link} to="/">{resources.app_title}</NavbarBrand>
                <AppBar/>
            </div>
        </div>
    );

}



