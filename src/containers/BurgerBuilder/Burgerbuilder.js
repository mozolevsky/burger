import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        this.props.onLoadIngs()
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push({pathname: '/checkout'});
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        const {purchasing} = this.state;

        let orderSummary = null;
        let burger = this.props.error ? <p>Problem with ingredients loading</p> : <Spinner />;

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
        purchasable: state.purchasable,
        error: state.error
    }
}

const mapDispachToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
        onLoadIngs: () => dispatch(actions.loadIngsFromServer())
    }
}

export default connect(mapStateToProps, mapDispachToProps)(BurgerBuilder);

