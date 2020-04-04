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

export default (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar dark expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    {
                        props.menuItems.map(link => {
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
                                                        <DropdownItem key={subLink.id}
                                                            className='app-nav-item'>
                                                            <Link className='app-nav-link' to={subLink.link}>{subLink.title}</Link>
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
                                            className='app-nav-item'
                                            activeClassName='active'>
                                                <Link to={link.link}>{link.title}</Link>
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