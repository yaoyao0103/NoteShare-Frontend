import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
function QnAOutlinePage(props) {
    const page = "QnAOutlinePage";
    const [pageNumber, setPageNumber] = useState(1);
    const [QnA, setQnA] = useState([]);
    const [sortMode,setSortMode] =useState('date');
   
    useEffect(() => {
        async function getQnAById() {
            try {
                const haveQA= true;
                const sortBy=sortMode;               
                await axios.get('http://localhost:8080/search/post/'+props.keyword+'/' + String(pageNumber-1) + '/20?department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveQA='+true+'&sortBy='+sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.search]);
                });

            } catch (error) {
                console.log(error.message);
                setQnA(error.message);
            }
        }
        getQnAById();
    }, []);
    useEffect(() => {
        async function getQnAById() {
            try {
                const haveQA= true;
                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/'+props.keyword+'/' + String(pageNumber-1) + '/20?department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveQA='+true+'&sortBy='+sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray=[], res.data.search]);
                    window.scrollTo(0, 0);
                });

            } catch (error) {
                setQnA(error.message);
            }
        }
        getQnAById();       
    }, [pageNumber,sortMode]);

    return (
        <>
            {QnA.length > 0 && 
                <PageOutlineContentTemplate page={page}  hasSwitch={false} mode='Post' Post={QnA} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} setPageProps={props.setPageProps} />
           
            }
        </>
    );


}

export default QnAOutlinePage;

