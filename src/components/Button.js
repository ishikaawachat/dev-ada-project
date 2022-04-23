import React from 'react';
import ReactDOM from 'react-dom';
import './Button.css';
//import { Link } from 'react-router-dom';


export const Button = ({
    children,
    onClick
}) => {
    return (
        <button onClick={onClick}> {children} </button>
    );

};
