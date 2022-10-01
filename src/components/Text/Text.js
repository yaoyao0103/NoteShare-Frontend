import React, { useEffect } from 'react';
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
        "gray": "#444",
        "tiffiny":"#66e1c1"
    }

    useEffect(()=>{
    },[props.fontSize])
  
    return (
        <p className={`text${props.cls ? '__' + props.cls : ''}`} style={(props.fontSize[props.fontSize.length-1].isInteger)?{ fontSize: props.fontSize + 'px', color: fontColor[props.color], display: props.display, textDecoration: props.decoration}:{ fontSize: props.fontSize, color: fontColor[props.color], display: props.display, textDecoration: props.decoration,width:props.width}}><Markup style={{wordWrap:props.wordWrap}}content= {props.content}/></p>
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
    wordWrap:PropTypes.string,
    width:PropTypes.string,
    //fontfamily:PropTypes.string,
    //link:PropTypes.string,
};
Text.defaultProps = {
    content: '',
    color: 'black',
    fontSize: '30',
    cls: 'Default',
    display: 'inline-block',
    decoration: 'solid',
    wordWrap:'initial',
    width:'auto'
    //fontfamily:"",
    //link:<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet"></link>
};
export default Text