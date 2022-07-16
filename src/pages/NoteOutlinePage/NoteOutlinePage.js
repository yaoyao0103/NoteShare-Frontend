import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
import { message } from "antd";

function NoteOutlinePage(props) {
    const page = 'NoteOutlinePage';
    const [pageNumber, setPageNumber] = useState(1);
    const [Note, setNote] = useState([]);
    const [sortMode,setSortMode] =useState('likeCount');

    useEffect(() => {
        props.setLoading(true)
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
                console.log(props.department);
                await axios.get('http://localhost:8080/search/note/'+ String(pageNumber-1) + '/10?keyword='+(props.keyword?props.keyword:'')+'&department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveNormal='+true+'&sortBy='+sortBy).then((res) => {
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
        //console.log('2222');
    }, [props]);
    useEffect(() => {
        props.setLoading(true)
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
            
                await axios.get('http://localhost:8080/search/note/'+ String(pageNumber-1) + '/10?keyword='+(props.keyword?props.keyword:'')+'&department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveNormal='+true+'&sortBy='+sortBy).then((res) => {
                    setNote(oldArray => [...oldArray=[], res.data.search]);
                    window.scrollTo(0, 0);
                    props.setLoading(false)
                    //console.log(pageNumber);

                });

            } catch (error) {
                //console.log(error.message);
                message.error("Server Error! Please try again later. (Get note Error)")
                setNote(error.message);


            }
        }
        //console.log(pageNumber-1);
        getNoteById();
        //console.log('1111');
        
    }, [pageNumber,sortMode]);

    return (
        <>
            {Note.length > 0 && 
                <PageOutlineContentTemplate page={page}  hasSwitch={false} mode='Note' Post={Note} pageNumber={pageNumber} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} setPageProps={props.setPageProps}/>
       
            }
        </>
    );


}

export default NoteOutlinePage;