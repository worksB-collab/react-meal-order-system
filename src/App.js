import Header from "./components/Layout/Header";
import {Fragment, useState} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

    const [isCartShown, setIsCartShown] = useState();

    const onShowCartHandler = () => {
        setIsCartShown(true);
    }

    const onHideCartHandler = () => {
        setIsCartShown(false);
    }

    return (
        <CartProvider>
            {
                // it's a better approach to use useState here even we need to forward state to two levels, to keep the 
                // Modal inside Cart more flexible to accept not only certain state as using useContext
                isCartShown && <Cart onClose={onHideCartHandler}/>
            }
            <Header onShowCart={onShowCartHandler}/>
            <main>
                <Meals/>
            </main>
        </CartProvider>
    );
}

export default App;
