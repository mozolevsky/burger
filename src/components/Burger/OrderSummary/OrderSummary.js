import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button.js';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(
        (ingKey, i) => {
            return (
                <li key={i}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>: 
                    {props.ingredients[ingKey]}
                </li>
            )
        }
    );

    return (
        <Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: <strong>{props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Fragment>
    )
}

export default orderSummary;