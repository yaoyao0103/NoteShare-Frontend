import React, { useState, useEffect } from "react";
import { message } from 'antd';
import { Base64 } from 'js-base64';
import { DollarOutlined} from '@ant-design/icons';
import axios from "axios";

import './Coin.css';
import Text from "../../Text/Text";
import Cookie from "../../Cookies/Cookies";

const cookieParser =new Cookie(document.cookie)
function Coin(props) {
    const [email, setEmail] = useState('');
    const [getUserSuccess, setGetUserSuccess] = useState(false);
    
    function getCoinByEmail(Email) {

        axios.get("http://localhost:8080/user/" + Email,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        }).then(res => {
            //console.log(res.data.res.coin);
            props.setCoinNum(res.data.res.coin);
            setGetUserSuccess(true);
        }).catch((error) => {
            message.error("Server Error! Please try again later. (Get coin Error)")
            console.log(error);
            if (error.response.status === 500 || error.response.status === 404){
                document.cookie = 'error=true'
            }
            else if (error.response.status === 403){
                document.cookie = 'error=Jwt'                       
            }
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