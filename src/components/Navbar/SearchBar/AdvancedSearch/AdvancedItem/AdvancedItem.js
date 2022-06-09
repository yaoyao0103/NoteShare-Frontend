import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import "./AdvancedItem.css"


export const Note = ({ setCondition }) => {
    
    const [tempCondition, setTempCondition] = useState({});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='school' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, school: ev.target.value})} value={tempCondition.school}/>
            <Input type="text" placeholder='subject' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, subject: ev.target.value})} value={tempCondition.subject}/>
            <Input type="text" placeholder='department' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, department: ev.target.value})} value={tempCondition.department}/>
            <Input type="text" placeholder='professor' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, professor: ev.target.value})} value={tempCondition.professor}/>
            <Input type="text" placeholder='headerName' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, headerName: ev.target.value})} value={tempCondition.headerName}/>
        </>
    )
};

export const Collab = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='school' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, school: ev.target.value})} value={tempCondition.school}/>
            <Input type="text" placeholder='subject' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, subject: ev.target.value})} value={tempCondition.subject}/>
            <Input type="text" placeholder='department' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, department: ev.target.value})} value={tempCondition.department}/>
            <Input type="text" placeholder='professor' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, professor: ev.target.value})} value={tempCondition.professor}/>
            <Input type="text" placeholder='headerName' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, headerName: ev.target.value})} value={tempCondition.headerName}/>
        </>
    )
};

export const Reward = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='school' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, school: ev.target.value})} value={tempCondition.school}/>
            <Input type="text" placeholder='subject' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, subject: ev.target.value})} value={tempCondition.subject}/>
            <Input type="text" placeholder='department' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, department: ev.target.value})} value={tempCondition.department}/>
            <Input type="text" placeholder='professor' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, professor: ev.target.value})} value={tempCondition.professor}/>
        </>
    )
};

export const QnA = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='subject' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, subject: ev.target.value})} value={tempCondition.subject}/>
            <Input type="text" placeholder='department' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, department: ev.target.value})} value={tempCondition.department}/>

        </>
    )
};


export const Folder = ({ setCondition }) => {

    const [tempCondition, setTempCondition] = useState({});
    useEffect(() => {
        setCondition(tempCondition);
    }, [tempCondition])

    return(
        <>
            <Input type="text" placeholder='keyword' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, keyword: ev.target.value})} value={tempCondition.keyword}/>
            <Input type="text" placeholder='headerName' className="advanced__Item" onChange={(ev) => setTempCondition({...tempCondition, headerName: ev.target.value})} value={tempCondition.headerName}/>
        </>
    )
};
