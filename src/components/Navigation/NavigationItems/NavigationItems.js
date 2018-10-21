import React from 'react';

import classes from './NavigationItems.module.css'

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {

    let auth = <NavigationItem link="/auth">Sign in</NavigationItem>
    if (props.isAuthenticated) {
        auth = (
            <div className={classes.NavigationItems}>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/logout">Log out</NavigationItem>
            </div>
        );

    }

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {auth}
        </ul>
    );
}

export default navigationItems;