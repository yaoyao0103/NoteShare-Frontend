import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser = new Cookie(document.cookie)
function RewardRecommendPage(props) {
    const page = 'RewardRecommendPage';
    const [Reward, setReward] = useState([]);
    //const [sortMode, setSortMode] = useState('date');

    useEffect(() => {
        async function getRewardById() {
            props.setLoading(true)
            try {
                const sortBy = props.sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(props.pageNumber - 1) + '/20?keyword=interrupt&department=&subject=&haveReward=' + true + '&sortBy=' + sortBy, {
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                    }
                }).then((res) => {

                    setReward(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false)
                });

            } catch (error) {
                message.error("Server Error! Please try again later. (Get Reward Post Error)")
                console.log(error.message);
                setReward(error.message);


            }
        }
        setReward([]);
        getRewardById();

    }, [props]);
    // useEffect(() => {
    //     props.setLoading(true)
    //     async function getRewardById() {
    //         try {
    //             const sortBy = sortMode;

    //             await axios.get('http://localhost:8080/search/post/' + String(props.pageNumber - 1) + '/20?keyword=interrupt&department=&subject=&haveReward=' + true + '&sortBy=' + sortBy, {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
    //                 }
    //             }).then((res) => {
    //                 setReward(oldArray => [...oldArray, res.data.search]);
    //                 //window.scrollTo(0, 0);
    //                 props.setLoading(false)


    //             });

    //         } catch (error) {
    //             message.error("Server Error! Please try again later. (Get Reward Post Error)")
    //             setReward(error.message);


    //         }
    //     }
    //     setReward([]);
    //     getRewardById();


    // }, [sortMode]);

    return (
        <>
            {Reward.length > 0 &&
                <PageOutlineContentTemplate page={page} hasSwitch={false} mode='Post' Post={Reward} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} setPageProps={props.setPageProps} />
            }
        </>
    );

}

export default RewardRecommendPage;