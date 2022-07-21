import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import { Layout, message } from "antd";
import axios from "axios";
const { Header, Content, Footer } = Layout;
function FolderOutlinePage(props) {
    const page = 'FolderOutlinePage';
    const [Folder, setFolder] = useState([]);
    const [sortMode, setSortMode] = useState('date');


    useEffect(() => {
        //console.log(props.headerName)
        async function getFolderById() {
            try {
                await axios.get('http://localhost:8080/search/folder/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&creator=' + (props.headerName ? props.headerName : '')).then((res) => {
                    //console.log(res.data.search);
                    setFolder(oldArray => [...oldArray = [], res.data.search]);
                    props.setLoading(false)
                });
            } catch (error) {
                console.log(error.message);
                message.error("Server Error! Please try again later. (Get Folder Outline Error)")
                setFolder(error.message);
            }
        }
        getFolderById();
        //console.log('2222');
    }, [props]);
    useEffect(() => {
        props.setLoading(true)
        async function getFolderById() {
            try {


                await axios.get('http://localhost:8080/search/folder/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&creator=' + (props.headerName ? props.headerName : '')).then((res) => {
                    setFolder(oldArray => [...oldArray = [], res.data.search]);
                    //window.scrollTo(0, 0);
                    //console.log(pageNumber);
                    props.setLoading(false)
                });

            } catch (error) {
                //console.log(error.message);
                message.error("Server Error! Please try again later. (Get Folder Outline Error)")
                setFolder(error.message);


            }
        }
        //console.log(pageNumber-1);
        getFolderById();
        //console.log('1111');

    }, [sortMode]);

    return (
        <>
            {Folder.length > 0 &&
                <PageOutlineContentTemplate setPageProps={props.setPageProps} pageNumber={props.pageNumber} page={page} hasSwitch={false} mode='Folder' Post={Folder} changePageNumber={props.setPageNumber} changeSortMode={(sortMode) => { setSortMode(sortMode); }} />
            }
        </>
    );


}

export default FolderOutlinePage;