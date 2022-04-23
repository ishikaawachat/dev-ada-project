import React, { useState } from 'react';
import { Button } from "./Button.js";
import './Popup.css';


export const Popup = (props) => {
    

    return (props.trigger) ? (
        <div class="popup">
            <div class="popup-inner">
                <button className="close" onClick={() => props.setTrigger(false)}>close</button>
                {props.children}
            </div>
        </div>
    ) : "";

}

