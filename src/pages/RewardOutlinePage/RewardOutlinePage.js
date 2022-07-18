import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import { Layout, message } from "antd";
import axios from "axios";
const { Header, Content, Footer } = Layout;
function RewardOutlinePage(props) {
    const page='RewardOutlinePage';
    const [Reward, setReward] = useState([]);
    const [sortMode,setSortMode] =useState('date');

    useEffect(() => {
        props.setLoading(true)
        async function getRewardById() {
            try {
                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/'+ String(props.pageNumber-1) + '/20?keyword='+(props.keyword?props.keyword:'')+'&department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveReward='+true+'&sortBy='+sortBy).then((res) => {

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
    useEffect(() => {
        props.setLoading(true)
        async function getRewardById() {
            try {
                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/'+ String(props.pageNumber-1) + '/20?keyword='+(props.keyword?props.keyword:'')+'&department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveReward='+true+'&sortBy='+sortBy).then((res) => {
                    setReward(oldArray => [...oldArray, res.data.search]);
                    window.scrollTo(0, 0);
                    props.setLoading(false)

                });

            } catch (error) {
                message.error("Server Error! Please try again later. (Get Reward Post Error)")
                setReward(error.message);


            }
        }
        setReward([]);
        getRewardById();

        
    }, [sortMode]);
   
    return (
        <>
            {Reward.length > 0 && 
                <PageOutlineContentTemplate page={page}  hasSwitch={false} mode='Post' Post={Reward} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} setPageProps={props.setPageProps}/>
            }
        </>
    );

}

export default  RewardOutlinePage;