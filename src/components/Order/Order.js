import React from 'react';
import classes from './Order.css';

const order = (props) => {
  let ingredientsList = [];
  for (let key in props.ingredients) {
    ingredientsList.push(`${key} (${props.ingredients[key]})`);
  }

  return (
    <div className={classes.Order}>
        <p>Ingredients: {ingredientsList.join(', ')}</p>
        <p>Price: <b>{Number.parseFloat(props.price).toFixed(2)}</b></p>
    </div>
  )
}

export default order;
