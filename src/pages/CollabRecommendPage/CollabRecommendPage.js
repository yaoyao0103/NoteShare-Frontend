import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function CollabRecommendPage(props) {
    const page='CollabRecommendPage';
   
    const [Collab, setCollab] = useState([]);
    //const [sortMode,setSortMode] =useState('date');

   
    useEffect(() => {
        props.setLoading(true);
        async function getCollabById() {
            try {
                await axios.get('http://localhost:8080/post/hotPosts/' + String(props.pageNumber - 1) + '/20/collaboration',{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                }).then((res) => {
                    //console.log(res.data.res)
                    setCollab(oldArray => [...oldArray, res.data.res]);
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

    }, [props]);
    
   
    return (
        <>
            {Collab.length > 0 && 
                <PageOutlineContentTemplate page={page}   isMember={true} hasSwitch={false} mode='Post' Post={Collab} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} setPageProps={props.setPageProps}/>
            }
        </>
    );

}

export default  CollabRecommendPage;