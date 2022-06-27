import React, { useState, useEffect } from 'react';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";
function NoteOutlinePage() {
    const [Page, setPage] = useState('NoteOutlinePage');
    const [pageNumber, setPageNumber] = useState(1);
    const [Note, setNote] = useState([]);
    const [sortMode,setSortMode] =useState('likeCount');

    useEffect(() => {
        setPage('NoteOutlinePage');
    }, [Page]);
    useEffect(() => {
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
                await axios.get('http://localhost:8080/search/note/OS/' + String(pageNumber-1) + '/10?haveNormal='+haveNormal+'&sortBy='+sortBy).then((res) => {
                    setNote(oldArray => [...oldArray, res.data.search]);
                    //console.log(res.data.search.totalPages);

                });

            } catch (error) {
                console.log(error.message);
                setNote(error.message);


            }
        }
        getNoteById();
        //console.log('2222');
    }, []);
    useEffect(() => {
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
            
                await axios.get('http://localhost:8080/search/note/OS/' + String(pageNumber-1) + '/10?haveNormal='+haveNormal+'&sortBy='+sortBy).then((res) => {
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
    // useEffect(() => {
    //     async function getNoteById() {
    //         try {
    //             const haveNormal= true;
    //             const sortBy=sortMode;
               
    //             await axios.get('http://localhost:8080/search/note/OS/' + String(pageNumber-1) + '/10?haveNormal='+haveNormal+'&sortBy='+sortBy).then((res) => {
    //                 setNote(oldArray => [...oldArray=[], res.data.search]);
    //                 window.scrollTo(0, 0);
    //                 //console.log(pageNumber);

    //             });

    //         } catch (error) {
    //             //console.log(error.message);
    //             setNote(error.message);


    //         }
    //     }
    //     //console.log(pageNumber-1);
    //     getNoteById();
    //     setPageNumber(1);
    //     //console.log('1111');
        
    // }, [sortMode]);
    return (
        <>
            {Note.length > 0 && <PageOutlineTemplate page={Page}>
                <PageOutlineContentTemplate page={Page}  hasSwitch={false} mode='Note' Post={Note} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} />
            </PageOutlineTemplate>
            }
        </>
    );


}

export default NoteOutlinePage;