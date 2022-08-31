import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser = new Cookie(document.cookie)
function TagOutlinePage(props) {
    const page = 'TagOutlinePage';
    const [Note, setNote] = useState([]);
    //const [sortMode,setSortMode] =useState('likeCount');

    useEffect(() => {
        props.setLoading(true)
        async function getNoteByTag() {
            try {
                const haveNormal = true;
                const sortBy = props.sortMode;
                console.log(sortBy)
                //console.log(props.department);
                await axios.get('/search/tag/' + String(props.pageNumber - 1) + '/10/' + (props.tag ? props.tag : '')).then((res) => {
                    console.log(res.data.search)
                    setNote(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false)
                });

            } catch (error) {
                setNote(error.message);
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
                    message.error('Server Error! Please refresh again! (Get Note Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get Note Error)")
                }

            }
        }
        setNote([])
        getNoteByTag();
    }, [props]);


    return (
        <>
            {Note.length > 0 &&
                <PageOutlineContentTemplate setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={page} hasSwitch={false} isTag={true} mode='Note' Post={Note} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} />

            }
        </>
    );


}

export default TagOutlinePage;