import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import PageOutlineTemplate from '../../components/PageOutlineTemplate/PageOutlineTemplate';
import PageOutlineContentTemplate from '../../components/PageOutlineContentTemplate/PageOutlineContentTemplate';
import axios from "axios";

function MemberPage(props) {
    const page='MemberPage';
    
    const [pageNumber, setPageNumber] = useState(1);
    const [Note, setNote] = useState([]);
    const [sortMode,setSortMode] =useState('likeCount');

    useEffect(() => {
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
                console.log(props.department);
                await axios.get('http://localhost:8080/search/note/'+ String(pageNumber-1) + '/10?keyword=os&department=&subject=&haveNormal='+true+'&sortBy='+sortBy).then((res) => {
                    setNote(oldArray => [...oldArray, res.data.search]);

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
            
                await axios.get('http://localhost:8080/search/note/'+ String(pageNumber-1) + '/10?keyword=os&department=&subject=&haveNormal='+true+'&sortBy='+sortBy).then((res) => {
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
                <PageOutlineContentTemplate page={page}  hasSwitch={true} mode='Note' Post={Note} changePageNumber={(pagenumber) => { setPageNumber(pagenumber); }} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} setPageProps={props.setPageProps}/>
       
            }
        </>
    );
}

export default  MemberPage;