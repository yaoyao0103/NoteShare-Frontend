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

    return (
        // <div className='personalPage'>
        //     <Navbar currPage={page} changePage={ (page) => { setPage(page) }}/>
        //     <div className='personalPage__Layout'>
        //         <FileManager page={page}/>
        //     </div>
        // </div>
        <FileManager setLoggedIn={props.setLoggedIn} page={props.page} email={email} setPageProps={props.setPageProps} setLoading={props.setLoading} />
    );

}

export default PersonalPage;