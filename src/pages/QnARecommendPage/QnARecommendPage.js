import React, { useState, useEffect } from 'react';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";

function QnARecommendPage(props) {
    const page='QnARecommendPage';
    const [pageNumber, setPageNumber] = useState(1);
    const [QnA, setQnA] = useState([]);
    const [sortMode, setSortMode] = useState('date');

    useEffect(() => {
        async function getQnAById() {
            try {

                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(pageNumber - 1) + '/20?keyword=array&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveQA=' + true + '&sortBy=' + sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.search]);
                    console.log(res.data.search)
                });

            } catch (error) {
                console.log(error.message);
                setQnA(error.message);
            }
        }
        setQnA([])
        getQnAById();
    }, [props]);
    useEffect(() => {
        async function getQnAById() {
            try {

                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(pageNumber - 1) + '/20?keyword=array&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveQA=' + true + '&sortBy=' + sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.search]);
                    window.scrollTo(0, 0);
                });

            } catch (error) {
                setQnA(error.message);
            }
        }
        setQnA([])
        getQnAById();
    }, [pageNumber, sortMode]);

    return (
        <>
            {QnA.length > 0 &&
                <PageOutlineContentTemplate page={page} hasSwitch={false} mode='Post' Post={QnA} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode) => { setSortMode(sortMode); }} setPageProps={props.setPageProps} />

            }
        </>
    );


}

export default  QnARecommendPage;