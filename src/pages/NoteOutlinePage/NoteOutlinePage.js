import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
import { message } from "antd";
import Cookie from '../../components/Cookies/Cookies';
const cookieParser=new Cookie(document.cookie)
function NoteOutlinePage(props) {
    const page = 'NoteOutlinePage';
    const [Note, setNote] = useState([]);
    //const [sortMode,setSortMode] =useState('likeCount');

    useEffect(() => {
        props.setLoading(true)
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=props.sortMode;
                console.log(sortBy)
                //console.log(props.department);
                await axios.get('http://localhost:8080/search/note/'+ String(props.pageNumber-1) + '/10?keyword='+(props.keyword?props.keyword:'')+'&department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveNormal=true&haveCollaboration=true&sortBy='+sortBy,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                }).then((res) => {
                    console.log(res.data.search)
                    setNote(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false)
                });

            } catch (error) {
                message.error("Server Error! Please try again later. (Get Note Error)")
                console.log(error.message);
                setNote(error.message);


            }
        }
        setNote([])
        getNoteById();
    }, [props]);


    return (
        <>
            {Note.length > 0 && 
                <PageOutlineContentTemplate page={page}  hasSwitch={false} mode='Note' Post={Note} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={props.changeSortMode} setPageProps={props.setPageProps}/>
       
            }
        </>
    );


}

export default NoteOutlinePage;