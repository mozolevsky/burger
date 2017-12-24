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
        totalPrice: 0,
        purchasable: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(
            ingrKey => {
                return ingredients[ingrKey]
            }
        ).reduce(
            (currentSum, elem) => {
                return currentSum + elem;
        }, 0)

        this.setState({purchasable: sum > 0});
    }

    updatePrice = (ingredients) => {
        let newPrice = null;

        for (let ingredient in ingredients) {
            newPrice += ingredients[ingredient] * INGREDIENT_PRICES[ingredient];
        }

        this.setState({totalPrice: newPrice.toFixed(2)});
    }

    addIngredientHandler = (type) => {
        const updatedIngredient = this.state.ingredients[type] + 1;
        const updatedIngredientList = {...this.state.ingredients};
        updatedIngredientList[type] = updatedIngredient;

        this.setState({ingredients: updatedIngredientList});

        this.updatePrice(updatedIngredientList);
        this.updatePurchaseState(updatedIngredientList);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] >= 1) {
            const updatedIngredient = this.state.ingredients[type] - 1;
            const updatedIngredientList = {...this.state.ingredients};
            updatedIngredientList[type] = updatedIngredient;
    
            this.setState({ingredients: updatedIngredientList});
    
            this.updatePrice(updatedIngredientList);
            this.updatePurchaseState(updatedIngredientList);
        }
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        const {
            ingredients,
            totalPrice,
            purchasable
        } = this.state;

        return (
            <AuxWrapper>
                <Burger ingredients={ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={totalPrice}
                    purchasable={purchasable}
                />
            </AuxWrapper>
        )
    }
}

export default BurgerBuilder;

