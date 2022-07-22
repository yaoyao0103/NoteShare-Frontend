import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';
import { suppressDeprecationWarnings } from 'moment';
const cookieParser =new Cookie(document.cookie)
function MemberPage(props) {
    const page = 'MemberPage';

    const [pageNumber, setPageNumber] = useState(1);
    const [Note, setNote] = useState([]);
    const [isFollowingSwitch, setIsFollowingSwitch] = useState(false);
    const [isNoteSwitch, setIsNoteSwitch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sortMode, setSortMode] = useState('likeCount');


    const changeFollowingSwitch = () => {

        if (!isFollowingSwitch) {
            //console.log('0000')
            props.setLoading(true)
            setIsFollowingSwitch(true)
            setNote(oldArray => [...oldArray.slice(0, 0)])
            let cookieParser = new Cookie(document.cookie);
            let tempEmail = cookieParser.getCookieByName('email')
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
    const changeNoteSwitch = () => {
        if (!isNoteSwitch)
            setIsNoteSwitch(true)
        else
            setIsNoteSwitch(false)
    }
    async function getFollowingNoteById(email) {
        try {
            await axios.get('http://localhost:8080/note/following/' + email + '/' + String(props.pageNumber - 1) + '/10',{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            }).then((res) => {
                setNote(oldArray => [...oldArray, res.data.res]);
                console.log(res.data.res)
                props.setLoading(false)
            });

        } catch (error) {
            //console.log(error.message);
            message.error("Server Error! Please try again later. (Get Notes Error)")
            setNote(error.message);


        }
    }
    async function getRecommendNoteById() {
        try {
            const haveNormal = true;
            const sortBy = sortMode;
            //console.log(props.department);
            await axios.get('http://localhost:8080/search/note/' + String(props.pageNumber - 1) + '/10?keyword=' + (props.keyword ? props.keyword : '') + '&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveNormal=true&haveCollaboration=true&sortBy=' + sortBy,{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            }).then((res) => {
                setNote(oldArray => [...oldArray, res.data.search]);
                props.setLoading(false)
            });

        } catch (error) {
            console.log(error.message);
            message.error("Server Error! Please try again later. (Get Notes Error)")
            setNote(error.message);


        }
    }
    useEffect(() => {
        props.setLoading(true)
        setNote(oldArray => [...oldArray.slice(0, 0)])
        getRecommendNoteById();
        //console.log('2222');
    }, [props]);
    useEffect(() => {
        props.setLoading(true)
        //console.log(pageNumber-1);
        setNote(oldArray => [...oldArray.slice(0, 0)])
        getRecommendNoteById();
        //console.log('1111');

    }, [sortMode]);

    return (
        <>
            {Note.length > 0 &&
                <PageOutlineContentTemplate isMember={true}loading={loading} setLoading={setLoading}isFollowingSwitch={isFollowingSwitch} isNoteSwitch={isNoteSwitch} changeFollowingSwitch={changeFollowingSwitch} changeNoteSwitch={changeNoteSwitch} page={page} hasSwitch={true} mode='Note' Post={Note} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={(sortMode) => { setSortMode(sortMode); }} setPageProps={props.setPageProps} />

            }
        </>
    );
}

export default MemberPage;