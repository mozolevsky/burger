import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Sergey',
                address: {
                    street: 'Lobanka',
                    zipCode: '223043',
                    country: 'Belarus'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'courier'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        let form = null;

        if (this.state.loading) {
            form = <Spinner/>
        } else {
            form = (
                <form>
                    <input type="text" name="name" placeholder="Enter your name"/>
                    <input type="text" name="email" placeholder="Enter your email"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postal" placeholder="Postal"/>
                    <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
                </form>
            )
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contacts</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;