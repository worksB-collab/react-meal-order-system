import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";


const Cart = (props) => {
    const cartContext = useContext(CartContext);

    const onAddHandler = (item) => {
        cartContext.addItem({
            ...item,
            amount: 1
        })
    }

    const onRemoveHandler = (id) => {
        cartContext.removeItem(id)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartContext.items.map(item => {
                return (
                    <CartItem id={item.id}
                              key={item.id}
                              name={item.name}
                              amount={item.amount}
                              price={item.price}
                              onAdd={onAddHandler.bind(null, item)}
                              onRemove={onRemoveHandler.bind(null, item.id)}/>
                )
            })}
        </ul>
    );

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

    return (
        <Modal onClick={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {cartContext.items.length > 0 && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart;