import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import {useContext, useEffect, useState} from "react";
import CartContext from "../../store/cart-context";

const HeaderCardButton = (props) => {
    const [btnHighlighted, setBtnHighlighted] = useState(false);
    const cartContext = useContext(CartContext);
    const numberOfCartItems = cartContext.items.reduce((acc, item) => {
        return acc + item.amount;
    }, 0)
    const btnClasses = `${classes.button} ${btnHighlighted && classes.bump}`

    useEffect(() => {
        if (cartContext.items.length === 0) {
            return;
        }
        
        setBtnHighlighted(true);
        const timer = setTimeout(() => {
            setBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [cartContext.items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCardButton;