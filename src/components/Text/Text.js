import React from 'react';
import PropTypes from 'prop-types';
import './Text.css';
import { Markup } from 'interweave';
const Text = (props) => {
    const fontColor = {
        "green": "#1ADCAB",
        "purple": "#8015E8",
        "white": "#fff",
        "black": "#000",
        "dark-green": "#019858",
        "red": "#AE0000",
        "gray": "#444"
    }
  
    return (
        <p className={`text${props.cls ? '__' + props.cls : ''}`} style={{ fontSize: props.fontSize + 'px', color: fontColor[props.color], display: props.display, textDecoration: props.decoration }}><Markup content= {props.content}/></p>
    )
}
//string to dom(content)


Text.propTypes = {
    content: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.string,
    cls: PropTypes.string,
    display: PropTypes.string,
    decoration: PropTypes.string,
    //fontfamily:PropTypes.string,
    //link:PropTypes.string,
};
Text.defaultProps = {
    content: '',
    color: 'black',
    fontSize: '30',
    cls: 'Default',
    display: 'inline-block',
    decoration: 'none',
    //fontfamily:"",
    //link:<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
};
export default Text