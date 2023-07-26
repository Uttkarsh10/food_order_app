import React, { useContext, useState } from 'react'
import styles from './Cart.module.css'
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

function Cart(props) {

    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length>0;
    const cartItemAddHandler = item => {cartCtx.addItem({...item,amount:1})}
    const cartItemRemoveHandler = id => {cartCtx.removeItem(id)}
    const orderHandler = () => {setIsCheckout(true);}

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-eb7dd-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false); 
        setDidSubmit(true);
        cartCtx.clearCart();
    }

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

    const cartModalContent = <React.Fragment>
                                {cartItems}
                                    <div className={styles.total}>
                                        <span>Total Amount</span>
                                        <span>{totalAmount}</span>
                                    </div>
                                {isCheckout && <Checkout onConfirm ={submitOrderHandler} onCancel={props.onClose}/>}
                                {!isCheckout && modalActions}
                             </React.Fragment>

    const isSubmittingModalContent = <p>Sending Order Data</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.closeCart}>Close</button>
        </div>
    </React.Fragment>
        
  return (
    <Modal closeCart={props.closeCart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart