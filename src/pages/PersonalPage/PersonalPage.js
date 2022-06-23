import React, {useState, useEffect} from 'react'
import { Layout } from "antd";
import Navbar from '../../components/Navbar/Navbar';
import FileManager from '../../components/FileManager/FileManager';
import './PersonalPage.css'

const PersonalPage = () => {
    const [ page, setPage ] = useState('PersonalPage');
    /*useEffect(() => {
        setPage(props.page);
    }, [page])*/
    return(
        <div className='personalPage'>
            <Navbar currPage={page} changePage={ (page) => { setPage(page) }}/>
            <div className='personalPage__Layout'>
                <FileManager page={page}/>
            </div>
        </div>
    );
}

export default PersonalPage;