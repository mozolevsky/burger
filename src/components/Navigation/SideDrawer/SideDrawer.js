import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import AuxWrapper from '../../../hoc/AuxWrapper';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    let drawerClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        drawerClasses.splice(-1, 1, classes.Open);
    }

    return (
        <AuxWrapper>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={drawerClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </AuxWrapper>
    )
}

export default sideDrawer; 