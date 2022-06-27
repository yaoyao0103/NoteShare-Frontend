import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import { Layout } from "antd";
import axios from "axios";
const { Header, Content, Footer } = Layout;
function RewardOutlinePage(props) {
    const page='RewardOutlinePage';
    const [pageNumber, setPageNumber] = useState(1);
    const [Reward, setReward] = useState([]);
    const [sortMode,setSortMode] =useState('date');

    useEffect(() => {
        async function getRewardById() {
            try {
                const haveReward= true;

                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/'+props.keyword+'/' + String(pageNumber-1) + '/20?department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveReward='+true+'&sortBy='+sortBy).then((res) => {
                    //console.log(res.search.search);
                    setReward(oldArray => [...oldArray, res.data.search]);
          

                });

            } catch (error) {
                console.log(error.message);
                setReward(error.message);


            }
        }
        getRewardById();
        //console.log('2222');
    }, []);
    useEffect(() => {
        async function getRewardById() {
            try {
                const haveReward= true;
               
                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/'+props.keyword+'/' + String(pageNumber-1) + '/20?department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveReward='+true+'&sortBy='+sortBy).then((res) => {
                    setReward(oldArray => [...oldArray=[], res.data.search]);
                    window.scrollTo(0, 0);
                    //console.log(pageNumber);

                });

            } catch (error) {
                //console.log(error.message);
                setReward(error.message);


            }
        }
        //console.log(pageNumber-1);
        getRewardById();
        //console.log('1111');
        
    }, [pageNumber,sortMode]);
    // useEffect(() => {
    //     async function getRewardById() {
    //         try {
    //             const haveReward= true;
    //             const sortBy=sortMode;
                
    //             await axios.get('http://localhost:8080/search/post/interrupt/' + String(pageNumber-1) + '/20?haveReward='+haveReward+'&sortBy='+sortBy).then((res) => {
    //                 setReward(oldArray => [...oldArray=[], res.data.search]);
    //                 window.scrollTo(0, 0);
    //                 //console.log(pageNumber);

    //             });

    //         } catch (error) {
    //             //console.log(error.message);
    //             setReward(error.message);


    //         }
    //     }
    //     //console.log(pageNumber-1);
    //     getRewardById();
    //     setPageNumber(1);
    //     //console.log('1111');
        
    // }, [sortMode]);
    return (
        <>
            {Reward.length > 0 && 
                <PageOutlineContentTemplate page={page}  hasSwitch={false} mode='Post' Post={Reward} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} />
            }
        </>
    );

}

export default  RewardOutlinePage;