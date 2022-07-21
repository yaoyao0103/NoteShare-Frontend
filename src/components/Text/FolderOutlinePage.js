import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import { Layout, message } from "antd";
import axios from "axios";
const { Header, Content, Footer } = Layout;
function FolderOutlinePage(props) {
    const page ='FolderOutlinePage';
    const [pageNumber, setPageNumber] = useState(1);
    const [Folder, setFolder] = useState([]);
    const [sortMode, setSortMode] = useState('date');

    
    useEffect(() => {
        async function getFolderById() {
            try {
                await axios.get('http://localhost:8080/search/folder/'+props.keyword+'/'+ String(pageNumber - 1) + '/20?creator='+props.author).then((res) => {
                    //console.log(res.data.search);
                    setFolder(oldArray => [...oldArray, res.data.search]);
                });
            } catch (error) {
                console.log(error.message);
                message.error("Server Error! Please try again later. (Get Folder Error)")
                setFolder(error.message);
            }
        }
        getFolderById();
        //console.log('2222');
    }, []);
    useEffect(() => {
        async function getFolderById() {
            try {
                

                await axios.get('http://localhost:8080/search/folder/'+props.keyword+'/'+ String(pageNumber - 1) + '/20').then((res) => {
                    setFolder(oldArray => [...oldArray = [], res.data.search]);
                    window.scrollTo(0, 0);
                    //console.log(pageNumber);

                });

            } catch (error) {
                //console.log(error.message);
                setFolder(error.message);


            }
        }
        //console.log(pageNumber-1);
        getFolderById();
        //console.log('1111');

    }, [pageNumber,sortMode]);
   
    return (
        <>
            {Folder.length > 0 &&
                <PageOutlineContentTemplate page={page} hasSwitch={false} mode='Folder' Post={Folder} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode) => { setSortMode(sortMode); }} />
            }
        </>
    );


}

export default FolderOutlinePage;