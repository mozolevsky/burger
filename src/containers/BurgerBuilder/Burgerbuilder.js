import React, { Component } from 'react';
import AuxWrapper from '../../hoc/AuxWrapper';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 1.5,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0, 
            cheese: 0, 
            meat: 0
        },
        totalPrice: 0
    }

    updatePrice = () => {
        const {ingredients} = this.state;
        let newPrice = null;

        for (let ingredient in ingredients) {
            newPrice += ingredients[ingredient] * INGREDIENT_PRICES[ingredient];
        }

        newPrice = Math.round(newPrice * 100) / 100;
        this.setState({totalPrice: newPrice});
    }

    addIngredientHandler = (type) => {
        const updatedIngredient = this.state.ingredients[type] + 1;
        const updatedIngredientList = {...this.state.ingredients};
        updatedIngredientList[type] = updatedIngredient;

        this.setState({ingredients: updatedIngredientList});

        
        setTimeout(() => {
            this.updatePrice();
        }, 100);
    }

    render() {
        return (
            <AuxWrapper>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                />
            </AuxWrapper>
        )
    }
}

export default BurgerBuilder;

