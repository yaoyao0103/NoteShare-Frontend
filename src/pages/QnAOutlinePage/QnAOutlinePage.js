import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser = new Cookie(document.cookie)
function QnAOutlinePage(props) {
    const page = "QnAOutlinePage";
    const [QnA, setQnA] = useState([]);
    //const [sortMode, setSortMode] = useState('date');

    useEffect(() => {
        props.setLoading(true)
        async function getQnAById() {
            try {

                const sortBy = props.sortMode;

                await axios.get('/search/post/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveQA=' + true + '&sortBy=' + sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false)
                });

            } catch (error) {
                setQnA(error.message);
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
                    message.error('Server Error! Please refresh again! (Get Reward Post Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get Reward Post Error)")
                }
            }
        }
        setQnA([])
        getQnAById();
    }, [props]);


    return (
        <>
            {QnA.length > 0 &&
                <PageOutlineContentTemplate setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={page} hasSwitch={false} mode='Post' Post={QnA} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} />

            }
        </>
    );


}

export default QnAOutlinePage;

