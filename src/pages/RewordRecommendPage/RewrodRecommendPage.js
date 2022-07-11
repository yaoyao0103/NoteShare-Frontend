import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";

function RewardRecommendPage(props) {
    const page = 'RewardRecommendPage';
    const [pageNumber, setPageNumber] = useState(1);
    const [Reward, setReward] = useState([]);
    const [sortMode, setSortMode] = useState('date');

    useEffect(() => {
        async function getRewardById() {
            props.setLoading(true)
            try {
                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(pageNumber - 1) + '/20?keyword=interrupt&department=&subject=&haveReward=' + true + '&sortBy=' + sortBy).then((res) => {

                    setReward(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false)
                });

            } catch (error) {
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
                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(pageNumber - 1) + '/20?keyword=interrupt&department=&subject=&haveReward=' + true + '&sortBy=' + sortBy).then((res) => {
                    setReward(oldArray => [...oldArray, res.data.search]);
                    window.scrollTo(0, 0);
                    props.setLoading(false)


                });

            } catch (error) {

                setReward(error.message);


            }
        }
        setReward([]);
        getRewardById();


    }, [pageNumber, sortMode]);

    return (
        <>
            {Reward.length > 0 &&
                <PageOutlineContentTemplate page={page} hasSwitch={false} mode='Post' Post={Reward} pageNumber={pageNumber} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode) => { setSortMode(sortMode); }} setPageProps={props.setPageProps} />
            }
        </>
    );

}

export default RewardRecommendPage;