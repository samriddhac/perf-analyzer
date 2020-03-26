import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from "react-router-dom";

export default () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar dark expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {
                        menuItems.map(link => {
                            if (link.subItems && link.subItems.length > 0) {
                                return (
                                    <UncontrolledDropdown key={link.id} nav inNavbar>
                                        <DropdownToggle nav caret>
                                            {link.title}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {
                                                link.subItems.map(subLink => {
                                                    return (
                                                        <DropdownItem key={subLink.id}>
                                                            <Link to={subLink.link}>{subLink.title}</Link>
                                                        </DropdownItem>
                                                    )
                                                })
                                            }
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                )
                            }
                            else {
                                return (
                                    <NavItem key={link.id}>
                                        <NavLink tag={Link}
                                            activeClassName='active' 
                                            href={link.link}>
                                            {link.title}
                                        </NavLink>
                                    </NavItem>
                                );
                            }
                        })
                    }
                </Nav>
            </Collapse>
        </Navbar>
    );
}

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
        id: "af1ff6f9-c702-47f9-ad20-eebdf9f0791c",
        title: "3D Experiments",
        link: "/3d",
        subItems: [
            {
                id: "02bf5bda-3bf8-4b42-b2d9-10fef9e87b5d",
                title: "Charts Experiments",
                link: "/3d/charts"
            },
            {
                id: "4050e152-e972-46da-94b8-542c09b08efb",
                title: "D3 Experiments",
                link: "/3d/d3"
            },
            {
                id: "ce9a5065-6233-45cb-b8e6-80e8159ba2e6",
                title: "Three Experiments",
                link: "/3d/three"
            }
        ]
    }
];