import React, { useState, useEffect } from 'react'
import { Checkbox, message } from 'antd';
import { Note, Reward, QnA, Collab, Folder, Tag } from './AdvancedItem/AdvancedItem';
import Button from '../../../Button/Button';
import Text from '../../../Text/Text';
import "./AdvancedSearch.css";




const AdvancedSearch = (props) => {
    const [ options, setOptions ] = useState([]);
    const [ condition, setCondition ] = useState({
        keyword: null,
        school: null,
        subject: null,
        department: null,
        professor: null,
        headerName: null,
        tag: [],
        download: null,
    });
    const [type, setType] = useState(<Note setCondition={setCondition}/>);
    

    useEffect( () => {
        switch(props.type){
            case 'note': 
                setType(<Note setCondition={setCondition}/>);
                setOptions([{
                    label: 'Downloadable',
                    value: true,
                }]); break;
            case 'collab': 
            setType(<Collab setCondition={setCondition}/>);
                setOptions([{
                    label: 'Downloadable',
                    value: true,
                }]); break;
            case 'reward': setType(<Reward setCondition={setCondition}/>); break;
            case 'QnA': setType(<QnA setCondition={setCondition}/>); break;
            case 'folder': setType(<Folder setCondition={setCondition}/>); break;
            case 'tag': setType(<Tag setCondition={setCondition}/>); break;
            default : break;
        }
    },[]);

    const onChange = (value) => {
        setCondition({...condition, download: value[0]? true:false});
    };

    const onSearch = () => {
        // Todo: set type of condition
        const temp = JSON.parse(JSON.stringify(condition))
        temp.page = temp.page+'OutlinePage'
        temp.setPageProps = props.setPageProps
        temp.pageNumber=1
        if(temp.page!=='NoteOutlinePage')
            temp.sortMode='date'
        else
            temp.sortMode='likeCount'
        //console.log(temp)
        props.setPageProps(temp);
        
        console.log("condition:", condition);
    }

    return (
        <>
            {type}
            
            <div className="advanced__Bottom">
                <Checkbox.Group className='advanced__Option' options={options} defaultValue={['Pear']} onChange={onChange} />
                <div className="advanced__Button" onClick={onSearch}>
                    <Button color={"green"}><Text color='white' cls='Large' content={"Search"} fontSize='17' display="inline-block" /></Button>
                </div>
            </div>
        </>
    )
}

export default AdvancedSearch;

/* note
    keyword
    school
    subject
    department
    professor
    headerName
    haveNormal
    haveCollaboration
    haveReward
    download
    tag
*/

/*
    keyword
*/