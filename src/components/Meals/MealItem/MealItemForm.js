import classes from './MealItemForm.module.css';
import Input from "../../UI/Input";
import {useRef, useState} from "react";

const MealItemForm = (props) => {

    const [amountIsValid, setAmountIdValid] = useState(true);
    const inputRef = useRef();

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = inputRef.current.value;
        const enteredAmountNumber = +enteredAmount;

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountIdValid(false);
            return;
        }
        
        props.onAddToCart(enteredAmountNumber);
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={inputRef}
                label='Amount'
                input={{
                    id: props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}/>
            <button type='submit'>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
}

export default MealItemForm;