import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(response => {

                const fetchedData = Object.values(response.data);

                this.setState({
                    orders: fetchedData,
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: true
                });
                console.log('Problem with getting data');
            });
    }

    render() {
        let ordersList = null;
        const {
            loading,
            orders,
            error
        } = this.state;

        if (error) {
            ordersList = <p style={{textAlign: 'center', fontSize: '20px'}}>0 orders</p>;
        } else if (!error) {
            if (loading) {
                ordersList = <Spinner />
            } else {
                ordersList = orders.map((order, index) => {
                    return <Order
                                key={index} 
                                ingredients={order.ingredients} 
                                price={order.price}
                            />
                });
            }
        }

        return (
            <div>
                {ordersList}
            </div>
        )
    }
}

export default Orders;