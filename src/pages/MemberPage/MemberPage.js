import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';
import { suppressDeprecationWarnings } from 'moment';
const cookieParser = new Cookie(document.cookie)
function MemberPage(props) {
    const page = 'MemberPage';

    const [pageNumber, setPageNumber] = useState(1);
    const [Note, setNote] = useState([]);
    const [isFollowingSwitch, setIsFollowingSwitch] = useState(false);
    const [isNoteSwitch, setIsNoteSwitch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sortMode, setSortMode] = useState('likeCount');


    const changeFollowingSwitch = () => {
        if (cookieParser.getCookieByName('email')) {
            if (!isFollowingSwitch) {
                //console.log('0000')
                props.setLoading(true)
                setIsFollowingSwitch(true)
                setNote(oldArray => [...oldArray.slice(0, 0)])
                let cookieParser = new Cookie(document.cookie);
                let tempEmail = cookieParser.getCookieByName('email')
                if (tempEmail)
                    tempEmail = Base64.decode(tempEmail);
                getFollowingNoteById(tempEmail)
            }

            else {
                //console.log('1111')
                props.setLoading(true)
                setIsFollowingSwitch(false)
                setNote(oldArray => [...oldArray.slice(0, 0)])
                getRecommendNoteById();
            }
        }
        else {
            message.error("Please log in first!")
            props.setPageProps({ page: 'LoginPage' })
        }
    }
    const changeNoteSwitch = () => {
        if (!isNoteSwitch)
            setIsNoteSwitch(true)
        else
            setIsNoteSwitch(false)
    }
    async function getFollowingNoteById(email) {
        try {
            await axios.get('/note/following/' + email + '/' + String(props.pageNumber - 1) + '/10', {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then((res) => {
                setNote(oldArray => [...oldArray, res.data.res]);
                console.log(res.data.res)
                props.setLoading(false)
            });

        } catch (error) {
            setNote(error.message);
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
                message.error('Server Error! Please refresh again! (Get Notes Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get Notes Error)")
            }

        }
    }
    async function getRecommendNoteById() {
        try {

            //console.log(props.department);
            await axios.get('/note/hotNotes/' + String(props.pageNumber - 1) + '/10').then((res) => {
                setNote(oldArray => [...oldArray, res.data.res]);
                props.setLoading(false)
            });

        } catch (error) {
            setNote(error.message);
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
                message.error('Server Error! Please refresh again! (Get Notes Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get Notes Error)")
            }

        }
    }
    useEffect(() => {
        props.setLoading(true)
        setIsFollowingSwitch(false)
        setNote(oldArray => [...oldArray.slice(0, 0)])
        getRecommendNoteById();
        //console.log('2222');
    }, [props]);
    // useEffect(() => {
    //     props.setLoading(true)
    //     //console.log(pageNumber-1);
    //     setNote(oldArray => [...oldArray.slice(0, 0)])
    //     getRecommendNoteById();
    //     //console.log('1111');

    // }, [sortMode]);

    return (
        <>
            {Note.length > 0 &&
                <PageOutlineContentTemplate setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} pageLabel={props.pageLabel} isMember={true} loading={loading} setLoading={setLoading} isFollowingSwitch={isFollowingSwitch} isNoteSwitch={isNoteSwitch} changeFollowingSwitch={changeFollowingSwitch} changeNoteSwitch={changeNoteSwitch} page={page} hasSwitch={true} mode='Note' Post={Note} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} />

            }
        </>
    );
}

export default MemberPage;