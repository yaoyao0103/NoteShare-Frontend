import React, { useState, useEffect } from "react";
import { message } from "antd";
import PropTypes from 'prop-types';
import './ToggleSwitch.css';
function ToggleSwitch(props) {
    const [Switch, setSwitch] = useState('');
    const [length,setLength]=useState(0);
    const [Fontlength, setFontlength] = useState();
    const SwitchOn = () => {
        if (!props.isSwitch) {
            setSwitch('');
            setLength(2)
        } else {
            setSwitch('__actived');
            setLength(1)
            
        }
        //if(props.ChangeSwitch)props.ChangeSwitch();
    }
    useEffect(() => {
        setSwitch('');
        var Llength = props.SwitchLeft.length;
        var Rlength = props.SwitchRight.length;
        if (Llength > Rlength)
            setFontlength(Llength);
        else
            setFontlength(Rlength);
        console.log(Fontlength);
    }, []);
    useEffect(() => {
        SwitchOn()
        
    }, [props.isSwitch]);
    return (
        <div className="switch__button__outer" >
            <div className={"switch__button" + Switch} data-before={props.SwitchLeft} style={{ '--length': Fontlength * (5) + 'px' }}>
                <input className={"switch-button-checkbox"+ Switch} type="checkbox" onClick={() => props.ChangeSwitch()} style={{ '--length': Fontlength * (5) + 'px' }}></input>
                <label className={"switch-button-label"+ Switch} for="" style={{ '--divide':length,'--color': props.checkedColor, '--length': Fontlength *5 + 'px' }} ><span className={"switch-button-label-span" + Switch} data-length={Fontlength}>{props.SwitchRight}</span></label>
            </div>
        </div>
    )
}
ToggleSwitch.propTypes = {
    SwitchLeft: PropTypes.string,
    checkedColor: PropTypes.string,
    SwitchRight: PropTypes.string,
};
ToggleSwitch.defaultProps = {
    SwitchLeft: 'Following',
    checkedColor: '#66e1c1',
    SwitchRight: 'Recommend',
};
export default ToggleSwitch;