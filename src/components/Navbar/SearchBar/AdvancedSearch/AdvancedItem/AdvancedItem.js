import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import "./AdvancedItem.css"


export const Note = ({ setCondition }) => {
    
    const [tempCondition, setTempCondition] = useState({page:'Note'});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='Keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='School' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, school: ev.target.value})} value={tempCondition.school}/>
            <Input type="text" placeholder='Subject' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, subject: ev.target.value})} value={tempCondition.subject}/>
            <Input type="text" placeholder='Department' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, department: ev.target.value})} value={tempCondition.department}/>
            <Input type="text" placeholder='Instructor' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, professor: ev.target.value})} value={tempCondition.professor}/>
            <Input type="text" placeholder='Author' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, headerName: ev.target.value})} value={tempCondition.headerName}/>
        </>
    )
};

export const Collab = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({page:'Collab'});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='Keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='School' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, school: ev.target.value})} value={tempCondition.school}/>
            <Input type="text" placeholder='Subject' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, subject: ev.target.value})} value={tempCondition.subject}/>
            <Input type="text" placeholder='Department' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, department: ev.target.value})} value={tempCondition.department}/>
            <Input type="text" placeholder='Instructor' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, professor: ev.target.value})} value={tempCondition.professor}/>
            <Input type="text" placeholder='Author' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, headerName: ev.target.value})} value={tempCondition.headerName}/>
        </>
    )
};

export const Reward = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({page:'Reward'});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='Keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='School' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, school: ev.target.value})} value={tempCondition.school}/>
            <Input type="text" placeholder='Subject' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, subject: ev.target.value})} value={tempCondition.subject}/>
            <Input type="text" placeholder='Department' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, department: ev.target.value})} value={tempCondition.department}/>
            <Input type="text" placeholder='Instructor' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, professor: ev.target.value})} value={tempCondition.professor}/>
        </>
    )
};

export const QnA = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({page:'QnA'});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='Keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='Subject' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, subject: ev.target.value})} value={tempCondition.subject}/>
            <Input type="text" placeholder='Department' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, department: ev.target.value})} value={tempCondition.department}/>

        </>
    )
};


export const Folder = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({page:'Folder'});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='author' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, headerName: ev.target.value})} value={tempCondition.headerName}/>
        </>
    )
};
export const Tag = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({page:'Tag'});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='tag' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, tag: ev.target.value})} value={tempCondition.tag}/>
        </>
    )
};
