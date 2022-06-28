import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
function NoteOutlinePage(props) {
    const page = 'NoteOutlinePage';
    const [pageNumber, setPageNumber] = useState(1);
    const [Note, setNote] = useState([]);
    const [sortMode,setSortMode] =useState('likeCount');

    useEffect(() => {
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
                console.log(props.keyword);
                await axios.get('http://localhost:8080/search/note/'+props.keyword+'/' + String(pageNumber-1) + '/10?department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveNormal='+true+'&sortBy='+sortBy).then((res) => {
                    setNote(oldArray => [...oldArray, res.data.search]);
                    //console.log(res.data.search.totalPages);

                });

            } catch (error) {
                console.log(error.message);
                setNote(error.message);


            }
        }
        setNote([])
        getNoteById();
        //console.log('2222');
    }, [props]);
    useEffect(() => {
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
            
                await axios.get('http://localhost:8080/search/note/'+props.keyword+'/' + String(pageNumber-1) + '/10?department='+(props.department?props.department:'')+'&subject='+(props.subject?props.subject:'')+'&haveNormal='+true+'&sortBy='+sortBy).then((res) => {
                    setNote(oldArray => [...oldArray=[], res.data.search]);
                    window.scrollTo(0, 0);
                    //console.log(pageNumber);

                });

            } catch (error) {
                //console.log(error.message);
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
                <PageOutlineContentTemplate page={page}  hasSwitch={false} mode='Note' Post={Note} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} />
       
            }
        </>
    );


}

export default NoteOutlinePage;