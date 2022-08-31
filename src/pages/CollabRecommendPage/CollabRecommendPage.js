import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser = new Cookie(document.cookie)
function CollabRecommendPage(props) {
    const page = 'CollabRecommendPage';

    const [Collab, setCollab] = useState([]);
    //const [sortMode,setSortMode] =useState('date');


    useEffect(() => {
        props.setLoading(true);
        async function getCollabById() {
            try {
                await axios.get('/post/hotPosts/' + String(props.pageNumber - 1) + '/20/collaboration').then((res) => {
                    //console.log(res.data.res)
                    setCollab(oldArray => [...oldArray, res.data.res]);
                    props.setLoading(false);
                });

            } catch (error) {
                setCollab(error.message);
                if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                    if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Get Collaboration Outline Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get Collaboration Outline Error)")
                }


            }
        }
        setCollab([]);
        getCollabById();

    }, [props]);


    return (
        <>
            {Collab.length > 0 &&
                <PageOutlineContentTemplate setLoggedIn={props.setLoggedIn} page={page} isMember={true} hasSwitch={false} mode='Post' Post={Collab} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} setPageProps={props.setPageProps} />
            }
        </>
    );

}

export default CollabRecommendPage;