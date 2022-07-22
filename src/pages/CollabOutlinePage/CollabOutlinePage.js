import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import { Layout, message } from "antd";
import axios from "axios";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser= new Cookie(document.cookie)
const { Header, Content, Footer } = Layout;
function CollabOutlinePage(props) {
    const page = 'CollabOutlinePage';
    
    const [Collab, setCollab] = useState([]);
    const [sortMode, setSortMode] = useState('date');
    
   
    useEffect(() => {
        props.setLoading(true);
        async function getCollabById() {
            try {

                const haveCollaboration = true;
                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveCollaboration=' + true + '&sortBy=' + sortBy,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                }).then((res) => {
                    //console.log(res.data.search);
                    setCollab(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false);

                });

            } catch (error) {
                console.log(error.message);
                message.error("Server Error! Please try again later. (Get Collaboration Outline Error)")
                setCollab(error.message);


            }
        }
        setCollab([]);
        getCollabById();
        //console.log('2222');
    }, [props]);
    useEffect(() => {
        props.setLoading(true);
        
        async function getCollabById() {
            try {
                const haveCollaboration = true;
                const sortBy = sortMode;

                await axios.get('http://localhost:8080/search/post/' + String(props.pageNumber - 1) + '/20?keyword=' + (props.keyword ? props.keyword : '') + '&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveCollaboration=' + true + '&sortBy=' + sortBy,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                }).then((res) => {
                    setCollab(oldArray => [...oldArray, res.data.search]);
                    //window.scrollTo(0, 0);
                    //console.log(pageNumber);
                    props.setLoading(false);
                });

            } catch (error) {
                //console.log(error.message);
                message.error("Server Error! Please try again later. (Get Collaboration Outline Error)")
                setCollab(error.message);


            }
        }
        //console.log(pageNumber-1);
        setCollab([]);
        getCollabById();
        //console.log('1111');

    }, [ sortMode]);

    return (
        <>
            {Collab.length > 0 &&
                <PageOutlineContentTemplate page={page} hasSwitch={false} mode='Post' Post={Collab} pageNumber={props.pageNumber} changePageNumber={ props.setPageNumber} changeSortMode={(sortMode) => { setSortMode(sortMode); }} setPageProps={props.setPageProps} />
            }
        </>
    );


}

export default CollabOutlinePage;