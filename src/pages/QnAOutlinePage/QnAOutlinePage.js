import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
function QnAOutlinePage() {
    const [Page, setPage] = useState('QnAOutlinePage');
    const [pageNumber, setPageNumber] = useState(1);
    const [QnA, setQnA] = useState([]);
    const [sortMode,setSortMode] =useState('price');

    useEffect(() => {
        setPage('QnAOutlinePage');
    }, [Page]);
    useEffect(() => {
        async function getQnAById() {
            try {
                const haveQA= true;
                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/array/' + String(pageNumber-1) + '/20?haveQA='+haveQA+'&sortBy='+sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.search]);
                    //console.log(res.data.search.totalPages);

                });

            } catch (error) {
                console.log(error.message);
                setQnA(error.message);


            }
        }
        getQnAById();
        //console.log('2222');
    }, []);
    useEffect(() => {
        async function getQnAById() {
            try {
                const haveQA= true;
                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/array/' + String(pageNumber-1) + '/20?haveQA='+haveQA+'&sortBy='+sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray=[], res.data.search]);
                    window.scrollTo(0, 0);
                    //console.log(pageNumber);

                });

            } catch (error) {
                //console.log(error.message);
                setQnA(error.message);


            }
        }
        //console.log(pageNumber-1);
        getQnAById();
        //console.log('1111');
        
    }, [pageNumber,sortMode]);
    // useEffect(() => {
    //     async function getQnAById() {
    //         try {
    //             const haveQA= true;
    //             const sortBy=sortMode;
                
    //             await axios.get('http://localhost:8080/search/post/array/' + String(pageNumber-1) + '/20?haveQA='+haveQA+'&sortBy='+sortBy).then((res) => {
    //                 setQnA(oldArray => [...oldArray=[], res.data.search]);
    //                 window.scrollTo(0, 0);
    //                 //console.log(pageNumber);

    //             });

    //         } catch (error) {
    //             //console.log(error.message);
    //             setQnA(error.message);


    //         }
    //     }
    //     //console.log(pageNumber-1);
    //     getQnAById();
    //     setPageNumber(1);
    //     //console.log('1111');
        
    // }, [sortMode]);
    return (
        <>
            {QnA.length > 0 && <PageOutlineTemplate page={Page}>
                <PageOutlineContentTemplate page={Page}  hasSwitch={false} mode='Post' Post={QnA} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} />
            </PageOutlineTemplate>
            }
        </>
    );


}

export default QnAOutlinePage;

