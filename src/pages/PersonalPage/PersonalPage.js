import React, {useState, useEffect} from 'react'
import { Layout } from "antd";
import Navbar from '../../components/Navbar/Navbar';
import FileManager from '../../components/FileManager/FileManager';
import './PersonalPage.css'
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';


const PersonalPage = (props) => {
    const [email, setEmail] = useState('')
    useEffect(() => {
        const cookieParser = new Cookie(document.cookie)
        const temp = cookieParser.getCookieByName('email');
        const startEmail = Base64.decode(temp);
        console.log("email", startEmail)
        setEmail(startEmail);
    }, [])
    return(
        // <div className='personalPage'>
        //     <Navbar currPage={page} changePage={ (page) => { setPage(page) }}/>
        //     <div className='personalPage__Layout'>
        //         <FileManager page={page}/>
        //     </div>
        // </div>
        <FileManager page={props.page} email={email} setPageProps={props.setPageProps} />
    );

}

export default PersonalPage;