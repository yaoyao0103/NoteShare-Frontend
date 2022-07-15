import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
function QnAOutlinePage(props) {
    const page = "QnAOutlinePage";
    const [QnA, setQnA] = useState([]);
    const [sortMode, setSortMode] = useState('date');

    useEffect(() => {
        props.setLoading(true)
        async function getQnAById() {
            try {

                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveQA=' + true + '&sortBy=' + sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.search]);
                   
                    console.log(res.data.search)
                    props.setLoading(false)
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
        props.setLoading(true)
        async function getQnAById() {
            try {

                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveQA=' + true + '&sortBy=' + sortBy).then((res) => {
                    setQnA(oldArray => [...oldArray, res.data.search]);
                   
                    window.scrollTo(0, 0);
                    props.setLoading(false)
                });

            } catch (error) {
                setQnA(error.message);
            }
        }
        setQnA([])
        getQnAById();
    }, [sortMode]);

    return (
        <>
            {QnA.length > 0 &&
                <PageOutlineContentTemplate page={page} hasSwitch={false} mode='Post' Post={QnA} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={(sortMode) => { setSortMode(sortMode); }} setPageProps={props.setPageProps} />

            }
        </>
    );


}

export default QnAOutlinePage;

