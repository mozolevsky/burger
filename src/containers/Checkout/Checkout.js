import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
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
        const {ingr, purchased} = this.props;
        let summary = <Redirect to="/"/>
        if (ingr) {
            const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
            summary = (
                <section>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={ingr}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} 
                    />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData}
                    />
                </section>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);