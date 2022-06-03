import React, { useState, useEffect } from "react";
import { message } from "antd";
import PropTypes from 'prop-types';
import './ToggleSwitch.css';
function ToggleSwitch(props) {
    const [Switch, setSwitch] = useState([]);
    const [Fontlength, setFontlength] = useState();
    const SwitchOn = () => {
        if (Switch === '') {
            setSwitch('__actived');
            message.info(props.SwitchLeft);
        } else {
            setSwitch('');
            message.info(props.SwitchRight);
        }

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
    return (
        <div className="switch__button__outer" >
            <div className={"switch__button" + Switch} data-before={props.SwitchLeft} style={{ '--length': Fontlength * (5) + 'px' }}>
                <input className="switch-button-checkbox" type="checkbox" onClick={() => SwitchOn()} style={{ '--length': Fontlength * (5) + 'px' }}></input>
                <label className="switch-button-label" for="" style={{ '--color': props.checkedColor, '--length': Fontlength * 5 + 'px' }} ><span className={"switch-button-label-span" + Switch} data-length={Fontlength}>{props.SwitchRight}</span></label>
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
    SwitchRight: 'Recommand',
};
export default ToggleSwitch;