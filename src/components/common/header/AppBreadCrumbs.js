import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const AppBreadCrumbs = (props) => {

    return (
        <div className='app-breadcrumb'>
            <Breadcrumb>
                {pathList(props.pathname, props.menuItems).map(item => {
                    return (<BreadcrumbItem key={item}>{item}</BreadcrumbItem>);
                })}
            </Breadcrumb>
        </div>
    );
}

const pathList = (pathName, menus) => {
    let bds = [];
    let parent = undefined;
    let child = undefined;
    for(let menu of menus) {
        if(menu.link === pathName) {
            parent = menu.title;
            break;
        }
        else {
            for(let subMenu of menu.subItems) {
                if(subMenu.link === pathName) {
                    child = subMenu.title;
                    break;
                } 
            }
        }
    }
    if(parent) {
        bds.push(parent);
    }
    if(child) {
        bds.push(child);
    }
    return bds;
}

export default AppBreadCrumbs;