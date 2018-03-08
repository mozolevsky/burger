import React from 'react';
import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];

    if (props.validationStatus === false && props.touched) {
        inputClasses.push(classes.Invalid);
    } 

    switch (props.elementType) {
        case ('textarea'): 
            inputElement = <textarea 
                                className={inputClasses.join(' ')}
                                value={props.value} 
                                {...props.elementConfig}
                                onChange={props.changed}  
                            />;
            break;
        case ('select'): 
            inputElement = <select 
                className={inputClasses.join(' ')} 
                onChange={props.changed}
            >
                                {props.elementConfig.options.map(elem => {
                                    return <option 
                                        key={elem.value} 
                                        value={elem.value}
                                    >{elem.displayValue}</option>;
                                    })
                                }
                           </select>
        break;
        case ('input'):
        default:
            inputElement = <input 
                                className={inputClasses.join(' ')}
                                value={props.value} 
                                {...props.elementConfig}
                                onChange={props.changed} 
                            />;
        break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;
