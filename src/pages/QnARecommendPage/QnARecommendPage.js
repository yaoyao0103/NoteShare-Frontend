import React, { useState, useEffect } from 'react';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser = new Cookie(document.cookie)
function QnARecommendPage(props) {
    const page = 'QnARecommendPage';
    const [QnA, setQnA] = useState([]);
    //const [sortMode, setSortMode] = useState('date');

    useEffect(() => {
        props.setLoading(true)
        async function getQnAById() {
            try {
                props.setLoading(true)
                //const sortBy = props.sortMode;
                console.log(props.pageNumber)
                await axios.get('/post/hotPosts/' + String(props.pageNumber - 1) + '/20/QA').then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.res]);
                    console.log(res.data.res)
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
                    message.error('Server Error! Please refresh again! (Get QA Post Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get QA Post Error)")
                }
            }
        }
        setQnA([])
        getQnAById();
    }, [props]);



    return (
        <>
            {QnA.length > 0 &&
                <PageOutlineContentTemplate setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={page} isMember={true} hasSwitch={false} mode='Post' Post={QnA} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} />

            }
        </>
    );


}

export default QnARecommendPage;