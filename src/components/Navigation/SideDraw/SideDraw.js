import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';

import classes from './SideDraw.module.css';

const sideDraw = (props) => {

    let attachedClasses = [classes.SideDraw, classes.Close];

    if (props.isOpen) {
        attachedClasses = [classes.SideDraw, classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.isOpen} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDraw;