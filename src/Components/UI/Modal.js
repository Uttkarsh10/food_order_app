import React, { Fragment } from 'react'
import  ReactDOM  from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick = {props.closeCart}/>
}

const ModalOverlay = (props) => {
    return <div className={styles.modal}>
        <div className={styles.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById("overlays");

function Modal(props) {
  return (
    <Fragment>
        {/* <Backdrop />
        <ModalOverlay>{props.children}</ModalOverlay> */}
        {ReactDOM.createPortal(<Backdrop closeCart = {props.closeCart}/>,portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </Fragment>
  )
}

export default Modal