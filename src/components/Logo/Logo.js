import React from 'react';
import logoPath from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={logoPath} alt="Burger logo"/>
    </div>
);

export default logo;