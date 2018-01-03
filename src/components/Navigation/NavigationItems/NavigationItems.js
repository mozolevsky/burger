import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={true}>Link</NavigationItem>
        <NavigationItem link="/">Link</NavigationItem>
    </ul>
);

export default navigationItems;