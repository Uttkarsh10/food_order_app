import React, {useContext, useEffect, useState} from 'react'
import styles from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

function HeaderCartButton(props) {
  const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  
  const {items} = cartCtx;

  const numberOfCartItems = items.reduce((currNumber,item)=>{
    return currNumber+item.amount;
  },0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump: ''}`;
  useEffect(()=>{
    if(items.length===0) {return}
    setBtnIsHighlighted(true);
    const timer = setTimeout(()=>{setBtnIsHighlighted(false)},300);

    return ()=>{
      clearTimeout(timer);
    }
  },[items]);

  return (
    <button className={btnClasses} onClick = {props.onOpenCart1}>
        <span className={styles.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton