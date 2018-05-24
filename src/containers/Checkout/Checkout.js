import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = (e) => {
        e.preventDefault();
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const {ingr} = this.props;

        return (
            <div>
                <CheckoutSummary
                 ingredients={ingr}
                 checkoutCancelled={this.checkoutCancelledHandler}
                 checkoutContinued={this.checkoutContinuedHandler} 
                />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);