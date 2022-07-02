import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import { Layout } from "antd";
import axios from "axios";
const { Header, Content, Footer } = Layout;
function CollabOutlinePage(props) {
    const page ='CollabOutlinePage';
    const [pageNumber, setPageNumber] = useState(1);
    const [Collab, setCollab] = useState([]);
    const [sortMode, setSortMode] = useState('date');

    
    useEffect(() => {
        async function getCollabById() {
            try {

                const haveCollaboration = true;
                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/'+ String(pageNumber - 1) + '/20?keyword='+(props.keyword?props.keyword:'')+'&department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveCollaboration=' +true + '&sortBy=' + sortBy).then((res) => {
                    console.log(res.data.search);
                    setCollab(oldArray => [...oldArray, res.data.search]);
                    

                });

            } catch (error) {
                console.log(error.message);
                setCollab(error.message);


            }
        }
        getCollabById();
        //console.log('2222');
    }, []);
    useEffect(() => {
        async function getCollabById() {
            try {
                const haveCollaboration = true;
                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/'+ String(pageNumber - 1) + '/20?keyword='+(props.keyword?props.keyword:'')+'&department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveCollaboration=' +true + '&sortBy=' + sortBy).then((res) => {
                    setCollab(oldArray => [...oldArray = [], res.data.search]);
                    window.scrollTo(0, 0);
                    //console.log(pageNumber);

                });

            } catch (error) {
                //console.log(error.message);
                setCollab(error.message);


            }
        }
        //console.log(pageNumber-1);
        getCollabById();
        //console.log('1111');

    }, [pageNumber,sortMode]);
   
    return (
        <>
            {Collab.length > 0 &&
                <PageOutlineContentTemplate page={page} hasSwitch={false} mode='Post' Post={Collab} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode) => { setSortMode(sortMode); }} setPageProps={props.setPageProps}/>
            }
        </>
    );


}

export default CollabOutlinePage;