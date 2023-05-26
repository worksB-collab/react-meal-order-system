import CartContext from "./cart-context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.amount * action.item.price;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        let updatedItems;

        if (existingCartItemIndex !== -1) {
            const existingCartItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if (action.type === 'REMOVE') {
        let updatedItems;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item=> item.id !== existingItem.id);
        } else {
            const updatedItem = {... existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        }
        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState, cartDispatchFun] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        cartDispatchFun({type: 'ADD', item: item});
    }

    const removeItemHandler = (id) => {
        cartDispatchFun({type: 'REMOVE', id: id});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };
    
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;