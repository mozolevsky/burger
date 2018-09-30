import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import classes from './ContactData.css';
import * as actions from '../../../store/actions'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 3
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validationRules: {
                    required: false
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validationRules: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Airplane', displayValue: 'Airplane'},
                        {value: 'Ship', displayValue: 'Ship'}
                    ]
                },
                value: 'fastest',
                isValid: true
            }
        },
        formValid: false
    }

    checkValidity = (value, rules) => {
        let validationStatus = true;

        if (rules && rules.required) {
            validationStatus = value !== '';

            if (rules.minLength) {
                validationStatus = value.length >= rules.minLength;
            }
        }

        return validationStatus;
    }

    orderHandler = (e) => {
        e.preventDefault();

        const formData = {};
        for (let fieldName in this.state.orderForm) {
            formData[fieldName] = this.state.orderForm[fieldName].value;
        }

        const order = {
            ingredients: this.props.ingr,
            price: this.props.price,
            orderData: formData
        }
       
        this.props.onSentOrder(order)
    }

    fieldChangedHandler = (e, fieldId) => {
        const updatedFormDataLevel1 = {
            ...this.state.orderForm
        }

        const updatedFormDataInput = {
            ...updatedFormDataLevel1[fieldId]
        }

        updatedFormDataInput.value = e.target.value;
        updatedFormDataInput.isValid = this.checkValidity(updatedFormDataInput.value, this.state.orderForm[fieldId].validationRules);
        updatedFormDataInput.touched = true;
        updatedFormDataLevel1[fieldId] = updatedFormDataInput;

        let validitionFormStatus = true;
        for (let input in updatedFormDataLevel1) {
            validitionFormStatus = updatedFormDataLevel1[input].isValid && validitionFormStatus;
        }

        this.setState({
            orderForm: updatedFormDataLevel1,
            formValid: validitionFormStatus
        });

    }

    render() {
        let inputsArray = [];

        for (let key in this.state.orderForm) {
            inputsArray.push({
                config: this.state.orderForm[key],
                id: key
            });
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contacts</h4>
                <form onSubmit={this.orderHandler}>
                    {inputsArray.map(
                        elem => <Input
                                    key={elem.id} 
                                    elementType={elem.config.elementType} 
                                    elementConfig={elem.config.elementConfig} 
                                    value={elem.config.value}
                                    validationStatus={elem.config.validationRules ? elem.config.isValid : null}
                                    touched={elem.config.touched}
                                    changed={(e) => this.fieldChangedHandler(e, elem.id)}
                                />
                    )}
                    <Button btnType="Success" disabled={!this.state.formValid}>Order</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
}

const mapDispachToProps = dispatch => {
    return {
        onSentOrder: orderData => dispatch(actions.sentOrder(orderData))
    }
}

export default connect(mapStateToProps, mapDispachToProps)(ContactData);