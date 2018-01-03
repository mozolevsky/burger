import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from './SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleBtnClicked}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesctopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;
