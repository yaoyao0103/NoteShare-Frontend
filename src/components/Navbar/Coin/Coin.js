import React, { useState, useEffect } from "react";
import { } from 'antd';
import { Base64 } from 'js-base64';
import { DollarOutlined} from '@ant-design/icons';
import axios from "axios";

import './Coin.css';
import Text from "../../Text/Text";
import Cookie from "../../Cookies/Cookies";


function Coin(props) {
    const [email, setEmail] = useState('');
    const [getUserSuccess, setGetUserSuccess] = useState(false);
    
    function getCoinByEmail(Email) {

        axios.get("http://localhost:8080/user/" + Email, {
        }).then(res => {
            console.log(res.data.res.coin);
            props.setCoinNum(res.data.res.coin);
            setGetUserSuccess(true);
        }).catch((error) => {
            console.log(error);
        });
    };


    useEffect(() => {
        let cookieParser = new Cookie(document.cookie);
        let tempEmail = cookieParser.getCookieByName('email');
        tempEmail = Base64.decode(tempEmail);
        setEmail(tempEmail);
        getCoinByEmail(tempEmail);

    }, [props]);
    return (
        <>{getUserSuccess&&
            <>
            <DollarOutlined className="Coin__Icon" />
            <div  className="Coin__Text">
            <Text  color='Black' cls='Default' content={props.coinNum.toString()} fontSize='15' display="inline-block" />
            </div>
            </>
            }
        </>

    );
}
export default Coin;