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

                await axios.get('http://localhost:8080/post/hotPosts/' + String(props.pageNumber - 1) + '/20/reward').then((res) => {

                    setReward(oldArray => [...oldArray, res.data.res]);
                    props.setLoading(false)
                });

            } catch (error) {
                message.error("Server Error! Please try again later. (Get Reward Post Error)")
                console.log(error);
                setReward(error.message);
                if (error.response.status === 500 || error.response.status === 404||error.response.status === 403){
                    if(error.response.data.message.slice(0,13)==='Malformed JWT')
                    document.cookie = 'error=Jwt'
                    else
                    document.cookie = 'error=true'
                    message.warning('Please refresh again!')
                }

            }
        }
        setReward([]);
        getRewardById();

    }, [props]);
    

    return (
        <>
            {Reward.length > 0 &&
                <PageOutlineContentTemplate page={page}  isMember={true} hasSwitch={false} mode='Post' Post={Reward} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} setPageProps={props.setPageProps} />
            }
        </>
    );

}

export default RewardRecommendPage;