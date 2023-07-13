import {Fragment} from 'react';
import styles from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return(
        <Fragment>
            <header className={styles.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onOpenCart1={props.onOpenCart}/>
            </header>
            <img src={mealsImage} alt="a table full of delicious meals" className={styles['main-image']}/>
        </Fragment>
    )
}

export default Header