import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    // updatePurchaseState = (ingredients) => {
    //     const sum = Object.keys(ingredients).map(
    //         ingrKey => {
    //             return ingredients[ingrKey]
    //         }
    //     ).reduce(
    //         (currentSum, elem) => {
    //             return currentSum + elem;
    //     }, 0)

    //     this.setState({purchasable: sum > 0});
    // }

    // updatePrice = (ingredients) => {
    //     // let newPrice = null;

    //     // for (let ingredient in ingredients) {
    //     //     newPrice += ingredients[ingredient] * INGREDIENT_PRICES[ingredient];
    //     // }

    //     // this.setState({totalPrice: newPrice.toFixed(2)});
    // }

    // addIngredientHandler = (type) => {
    //     const updatedIngredient = this.state.ingredients[type] + 1;
    //     const updatedIngredientList = {...this.state.ingredients};
    //     updatedIngredientList[type] = updatedIngredient;

    //     this.setState({ingredients: updatedIngredientList});

    //     this.updatePrice(updatedIngredientList);
    //     this.updatePurchaseState(updatedIngredientList);
    // }

    // removeIngredientHandler = (type) => {
    //     if (this.state.ingredients[type] >= 1) {
    //         const updatedIngredient = this.state.ingredients[type] - 1;
    //         const updatedIngredientList = {...this.state.ingredients};
    //         updatedIngredientList[type] = updatedIngredient;
    
    //         this.setState({ingredients: updatedIngredientList});
    
    //         this.updatePrice(updatedIngredientList);
    //         this.updatePurchaseState(updatedIngredientList);
    //     }
    // }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];         
        for (let i in this.state.ingredients) {
            queryParams.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`);
        } 

        queryParams.push('price=' + this.props.totalPrice);
        const queryString = queryParams.join("&");

        this.props.history.push({
            pathname: '/checkout',
            search: `?${queryString}`
        });
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        const {
            purchasing,
            error
        } = this.state;

        let orderSummary = null;
        let burger = error ? <p>Problem with ingredients loading</p> : <Spinner />;

       if (this.props.ings) {
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.totalPrice} 
                />
            );

            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.purchasable}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable
    }
}

const mapDispachToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispachToProps)(BurgerBuilder);

