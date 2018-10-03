import React from 'react';

import classes from './Toolbar.module.css';

import DrawerToggle from '../SideDraw/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.toggle} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    );
};

export default toolbar;
