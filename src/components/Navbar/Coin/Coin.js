import React, { useState, useEffect } from "react";
import { message } from 'antd';
import { Base64 } from 'js-base64';
import { DollarOutlined } from '@ant-design/icons';
import axios from "../../axios/axios";

import './Coin.css';
import Text from "../../Text/Text";
import Cookie from "../../Cookies/Cookies";

const cookieParser = new Cookie(document.cookie)
function Coin(props) {
    const [email, setEmail] = useState('');
    const [getUserSuccess, setGetUserSuccess] = useState(false);

    function getCoinByEmail(Email) {

        axios.get("/user/" + Email, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            //console.log(res.data.res.coin);
            props.setCoinNum(res.data.res.coin);
            setGetUserSuccess(true);
        }).catch((error) => {
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else
                    document.cookie = 'error=true'
                message.error('Server Error! Please refresh again! (Get coin Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get coin Error)")
            }
        });
    };


    useEffect(() => {
        let cookieParser = new Cookie(document.cookie);
        let tempEmail = cookieParser.getCookieByName('email');
        if (tempEmail)
            tempEmail = Base64.decode(tempEmail);
        setEmail(tempEmail);
        getCoinByEmail(tempEmail);

    }, [props]);
    return (
        <>{getUserSuccess &&
            <div className="Coin__Container">
                <div className="Coin__Icon">
                    <DollarOutlined  />
                </div>
                <div className="Coin__Text">
                    <Text color='Black' cls='Default' content={props.coinNum.toString()} fontSize='15' display="inline-block" />
                </div>
            </div>
        }
        </>

    );
}
export default Coin;