import React, { Component } from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render() {
        return (
            <AuxWrapper>
                <Burger />
                <div>Build Controls</div>
            </AuxWrapper>
        )
    }
}

export default BurgerBuilder;

