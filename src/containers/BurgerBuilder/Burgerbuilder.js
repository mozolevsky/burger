import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 1.5,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch(error => {
                this.setState({
                    error: true
                });
            });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
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

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];         
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
        } 

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        });
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
            purchasable,
            purchasing,
            error
        } = this.state;

        let orderSummary = null;
        let burger = error ? <p>Problem with ingredients loading</p> : <Spinner />;

       if (ingredients) {
            orderSummary = (
                <OrderSummary 
                    ingredients={ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={totalPrice} 
                />
            );

            burger = (
                <Fragment>
                    <Burger ingredients={ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={totalPrice}
                        purchasable={purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
            );
       }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Fragment>
                <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
               {burger}
            </Fragment>
        )
    }
}

export default BurgerBuilder;

