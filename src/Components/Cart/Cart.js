import React, { useContext, useState } from 'react'
import styles from './Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart(props) {

    const [isCheckout,setIsCheckout] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length>0;
    const cartItemAddHandler = item => {cartCtx.addItem({...item,amount:1})}
    const cartItemRemoveHandler = id => {cartCtx.removeItem(id)}
    const orderHandler = () => {setIsCheckout(true);}

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item)=> 
            (
                <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>
            ))}
        </ul>
        );

    const modalActions = <div className={styles.actions}>
                            <button className={styles['button-alt']} onClick={props.closeCart}>Close</button>
                            {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
                        </div>
        
  return (
    <Modal closeCart={props.closeCart}>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
    </Modal>
  )
}

export default Cart