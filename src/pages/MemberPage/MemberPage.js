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
        props.setLoading(true)
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
                console.log(props.department);
                await axios.get('http://localhost:8080/search/note/'+ String(props.pageNumber-1) + '/10?keyword=os&department=&subject=&haveNormal='+true+'&sortBy='+sortBy).then((res) => {
                    setNote(oldArray => [...oldArray, res.data.search]);
                    props.setLoading(false)
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
        props.setLoading(true)
        async function getNoteById() {
            try {
                const haveNormal= true;
                const sortBy=sortMode;
            
                await axios.get('http://localhost:8080/search/note/'+ String(props.pageNumber-1) + '/10?keyword=os&department=&subject=&haveNormal='+true+'&sortBy='+sortBy).then((res) => {
                    setNote(oldArray => [...oldArray=[], res.data.search]);
                    
                    window.scrollTo(0, 0);
                    props.setLoading(false)
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
        
    }, [sortMode]);

    return (
        <>
            {Note.length > 0 && 
                <PageOutlineContentTemplate page={page}  hasSwitch={true} mode='Note' Post={Note} pageNumber={props.pageNumber} changePageNumber={props.setPageNumber} changeSortMode={(sortMode)=>{setSortMode(sortMode);}} setPageProps={props.setPageProps}/>
       
            }
        </>
    );
}

export default  MemberPage;