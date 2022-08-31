import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from '../../components/axios/axios';
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser = new Cookie(document.cookie)
function NoteOutlinePage(props) {
    const page = 'NoteOutlinePage';
    const [Note, setNote] = useState([]);
    //const [sortMode,setSortMode] =useState('likeCount');

    useEffect(() => {
        props.setLoading(true)
        async function getNoteById() {
            try {
                const haveNormal = true;
                const sortBy = props.sortMode;
                console.log(sortBy)
                //console.log(props.department);
                await axios.get('/search/note/' + String(props.pageNumber - 1) + '/10?keyword=' + (props.keyword ? props.keyword : '') + '&department=' + (props.department ? props.department : '') + '&subject=' + (props.subject ? props.subject : '') + '&haveNormal=true&haveCollaboration=true&sortBy=' + sortBy).then((res) => {
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
        getNoteById();
    }, [props]);


    return (
        <>
            {Note.length > 0 &&
                <PageOutlineContentTemplate setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={page} hasSwitch={false} mode='Note' Post={Note} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} />

            }
        </>
    );


}

export default NoteOutlinePage;