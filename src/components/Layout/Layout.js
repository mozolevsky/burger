import React from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import classes from './Layout.css';

const Layout = (props) => (
        <AuxWrapper>
            <div>ToolBar, SideDrower, BackDrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </AuxWrapper>
);

export default Layout;