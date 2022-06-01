import React, { useState, useEffect } from 'react';
import axios from "axios";
import PageDetailTemplate from "../../components/PageDetailTemplate/PageDetailTemplate"
import PageDetailContentTemplate from '../../components/PageDetailContentTemplate/PageDetailContentTemplate';

function QnADetailPage() {
    const [QnA, setQnA] = useState([]);

    useEffect(() => {
        // async function getQnAById() {
        //     try {
        //         const response = await axios.get(`http://localhost:8080/post/62627205a942b76c5114dbf8`);
        //         console.log(typeof (response.data.comments));
        //         setQnA(response.data);
        //     } catch (error) {
        //         console.log(error.message);
        //         setQnA(error.message);


        //     }
        // }
        // getQnAById();
        async function getQnAById() {
            try {
              const temp = require('./QnAJson.json');
            //   temp.author = temp.authorName[0];
            //   temp.date = temp.version[0].date;
              setQnA(temp);
            } catch (error) {
                console.log(error);
            }
          }
          getQnAById();
    }, []);

    return (
        <>
            <PageDetailTemplate page="NoteDetailPage">
                <PageDetailContentTemplate data={QnA} hasEditor={false} hasComment={true}/>  
            </PageDetailTemplate>
        </>
    );
}
export default QnADetailPage;