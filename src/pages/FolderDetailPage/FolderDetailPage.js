import React, { useState, useEffect } from 'react';
import { Layout, message } from "antd";
import axios from '../../components/axios/axios';
import Cookie from '../../components/Cookies/Cookies';
import FileManager from '../../components/FileManager/FileManager';
import { Base64 } from 'js-base64';
const cookieParser = new Cookie(document.cookie)
const { Header, Content, Footer } = Layout;
function FolderDetailPage(props) {
    const page = 'FolderOutlinePage';
    const [Folder, setFolder] = useState([]);
    const [sortMode, setSortMode] = useState('date');
    const [email, setEmail] = useState('')

    useEffect(() => {
        //console.log(props.headerName)
        const temp = cookieParser.getCookieByName('email');
        if (temp)
            var startEmail = Base64.decode(temp);
        setEmail(startEmail);
        async function getFolderById() {
            try {
                await axios.get('/search/folder/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&creator=' + (props.headerName ? props.headerName : '')).then((res) => {
                    console.log(res.data.search);
                    setFolder(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false)
                });
            } catch (error) {
                setFolder(error.message);
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
                    message.error('Server Error! Please refresh again! (Get Folder Outline Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get Folder Outline Error)")
                }
            }
        }
        getFolderById();
        //console.log('2222');
    }, [props]);
    useEffect(() => {
        props.setLoading(true)
        async function getFolderById() {
            try {


                await axios.get('/search/folder/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&creator=' + (props.headerName ? props.headerName : '')).then((res) => {
                    setFolder(oldArray => [...oldArray = [], res.data.search]);
                    //window.scrollTo(0, 0);
                    //console.log(pageNumber);
                    props.setLoading(false)
                });

            } catch (error) {
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
                    message.error('Server Error! Please refresh again! (Get Folder Outline Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get Folder Outline Error)")
                }



            }
        }
        //console.log(pageNumber-1);
        getFolderById();
        //console.log('1111');

    }, [sortMode]);

    return (
        <>

            <FileManager setLoggedIn={props.setLoggedIn}  page={props.page} email={email} setPageProps={props.setPageProps} setLoading={props.setLoading} />

        </>
    );


}

export default FolderDetailPage;