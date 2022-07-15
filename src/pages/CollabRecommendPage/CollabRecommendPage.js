import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";

function CollabRecommendPage(props) {
    const page='CollabRecommendPage';
   
    const [Collab, setCollab] = useState([]);
    const [sortMode,setSortMode] =useState('date');

   
    useEffect(() => {
        props.setLoading(true);
        async function getCollabById() {
            try {
                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/'+ String(props.pageNumber-1) + '/20?keyword=interrupt&haveCollaboration='+true+'&sortBy='+sortBy).then((res) => {

                    setCollab(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false);
                });

            } catch (error) {
                console.log(error.message);
                setCollab(error.message);


            }
        }
        setCollab([]);
        getCollabById();

    }, [props]);
    useEffect(() => {
        props.setLoading(true)
        async function getCollabById() {
            try {
                const sortBy=sortMode;
                
                await axios.get('http://localhost:8080/search/post/'+ String(props.pageNumber-1) + '/20?keyword=interrupt&haveCollaboration='+true+'&sortBy='+sortBy).then((res) => {
                    setCollab(oldArray => [...oldArray, res.data.search]);
                    window.scrollTo(0, 0);
                    props.setLoading(false)

                });

            } catch (error) {

                setCollab(error.message);


            }
        }
        setCollab([]);
        getCollabById();

        
    }, [sortMode]);
   
    return (
        <>
            {Collab.length > 0 && 
                <PageOutlineContentTemplate page={page}  hasSwitch={false} mode='Post' Post={Collab} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} setPageProps={props.setPageProps}/>
            }
        </>
    );

}

export default  CollabRecommendPage;