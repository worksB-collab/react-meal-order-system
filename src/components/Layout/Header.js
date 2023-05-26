import {Fragment} from "react";
import HeaderCartButton from './HeaderCardButton';
import mealsImage from '../../assets/meals.jpg';
import classess from './Header.module.css';

const Header = props => {
    return (
        <Fragment>
            <header className={classess.header}>
                <h1>ReactMeal</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classess['main-image']}>
                <img src={mealsImage} alt='A table of meal'/>
            </div>
        </Fragment>
    )
}

export default Header;