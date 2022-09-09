import React, { useState, useEffect } from 'react'
import { Layout, message } from "antd";
import Navbar from '../../components/Navbar/Navbar';
import FileManager from '../../components/FileManager/FileManager';
import './PersonalPage.css'
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';
import axios from '../../components/axios/axios';


const PersonalPage = (props) => {
    const [email, setEmail] = useState('')
    const cookieParser = new Cookie(document.cookie)
    useEffect(() => {
        const temp = cookieParser.getCookieByName('email');
        if (temp)
            var startEmail = Base64.decode(temp);
        console.log("email", startEmail)
        setEmail(startEmail);
    }, [])

    const onClickOCR = () => {
        message.info("OCR Test")
        axios.get('http://54.95.183.197:8080/ocr/getText?imageUrl=https://i.imgur.com/oAIn93c.jpg', {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log("OCR Result:", res)
            })
            .catch(err => {
                console.log("OCR err:", err)
                if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                    if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Get Root File Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get Root File Error)")
                }
            })
    }
    return (
        // <div className='personalPage'>
        //     <Navbar currPage={page} changePage={ (page) => { setPage(page) }}/>
        //     <div className='personalPage__Layout'>
        //         <FileManager page={page}/>
        //     </div>
        // </div>
        <>
            <button onClick={onClickOCR}>OCR Test</button>
            <FileManager setLoggedIn={props.setLoggedIn} page={props.page} email={email} setPageProps={props.setPageProps} setLoading={props.setLoading} />
        </>
    );

}

export default PersonalPage;