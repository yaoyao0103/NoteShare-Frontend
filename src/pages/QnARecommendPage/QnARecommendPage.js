import React, { useState, useEffect } from 'react';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function QnARecommendPage(props) {
    const page='QnARecommendPage';
    const [QnA, setQnA] = useState([]);
    //const [sortMode, setSortMode] = useState('date');

    useEffect(() => {
        props.setLoading(true)
        async function getQnAById() {
            try {
                props.setLoading(true)
                //const sortBy = props.sortMode;

                await axios.get('http://localhost:8080/post/hotPosts/' + String(props.pageNumber - 1) + '/20/QA',{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                }).then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.res]);
                    console.log(res.data.res)
                    props.setLoading(false)
                });

            } catch (error) {
                message.error("Server Error! Please try again later. (Get QA Post Error)")
                console.log(error.message);
                setQnA(error.message);
            }
        }
        setQnA([])
        getQnAById();
    }, [props]);
    


    return (
        <>
            {QnA.length > 0 &&
                <PageOutlineContentTemplate page={page}  isMember={true} hasSwitch={false} mode='Post' Post={QnA} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} setPageProps={props.setPageProps} />

            }
        </>
    );


}

export default  QnARecommendPage;