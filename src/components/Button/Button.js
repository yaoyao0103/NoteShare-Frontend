import React from 'react'
import "./Button.css"

const Button = (props) => {
    return (
        <button className = {"button " + "btn-" + props.color} >
            <span className='button__span'>{props.icon}{props.children}</span>
        </button>       
    );
}

Button.defaultProps = {
    icon: '',
    color: 'green',
    children: '',
};

export default Button;
