import classes from './Modal.module.css';
import {Fragment} from "react";
import * as ReactDOM from "react-dom";

const Modal = props => {
    
    return (
        <Fragment>
            {
                ReactDOM.createPortal(
                    <Fragment>
                        <div className={classes.backdrop} onClick={props.onClick}/>
                        <div className={classes.modal}>
                            <div className={classes.content}>
                                {props.children}
                            </div>
                        </div>
                    </Fragment>,
                    document.getElementById('overlays')
                )
            }
        </Fragment>
        
    )
}

export default Modal;