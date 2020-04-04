import React from 'react';
import {NavbarBrand} from 'reactstrap';
import { Link } from 'react-router-dom';
import AppBar from './AppBar';
import AppBreadCrumbs from './AppBreadCrumbs';
import './Header.css';
import logo from './react-512.webp';
import withPerformance from '../../../performance/PerfHOC';

import * as resources from '../../../resources/resources.json';

 const Header = (props) => {

    return (
        <>
            <div className="header-container">
                <div className="header font-lg">
                    <img src={logo} alt={'react_logo'} />
                    <NavbarBrand tag={Link} to="/">{resources.app_title}</NavbarBrand>
                    <AppBar menuItems={menuItems} />
                </div>
            </div>
            <AppBreadCrumbs {...props.location} menuItems={menuItems} />
        </>
    );
}

export default withPerformance(Header);

const menuItems = [
    {
        id: "8d300e89-65f2-4f4b-999f-78032eeacd8c",
        title: "About Me",
        link: "/"
    },
    {
        id: "2ccea715-a8d0-438d-8d77-b66d4607ea4e",
        title: "General Experiments",
        link: "/general",
        subItems: [
            {
                id: "1b530ef0-28c6-44d3-852d-8ea044e7e4f7",
                title: "RSS Experiments",
                link: "/general/rssfeed"
            }
        ]
    },
    {
        id: "5b57df54-49e0-4df7-9285-50407e3e1166",
        title: "D3 Experiments",
        link: "/d3",
        subItems: [
            {
                id: "14666ff3-c9e7-4f31-9ba5-004132f0de45",
                title: "D3 Experiments 1",
                link: "/d3-experiment-1"
            },
            {
                id: "8e98d8c8-7639-444b-949a-a753649a0a8b",
                title: "D3 Experiments 2",
                link: "/d3-experiment-2"
            },
            {
                id: "9199dded-01e2-4941-bac1-bc33f61e98d5",
                title: "D3 Experiments 3",
                link: "/d3-experiment-3"
            }
        ]
    },
    {
        id: "af1ff6f9-c702-47f9-ad20-eebdf9f0791c",
        title: "3D Experiments",
        link: "/3d",
        subItems: [
            {
                id: "02bf5bda-3bf8-4b42-b2d9-10fef9e87b5d",
                title: "Chess Experiments",
                link: "/3d/chess"
            },
            {
                id: "4050e152-e972-46da-94b8-542c09b08efb",
                title: "Physics Experiments",
                link: "/3d/physics"
            },
            {
                id: "ce9a5065-6233-45cb-b8e6-80e8159ba2e6",
                title: "Solar System Experiments",
                link: "/3d/solarsys"
            }
        ]
    }
];



