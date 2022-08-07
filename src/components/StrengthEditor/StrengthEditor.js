import React, { useState, useEffect, useRef } from 'react';
import { Input, message } from "antd";
import { CloseOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import './StrengthEditor.css'
import Text from '../Text/Text';
function StrengthEditor(props) {
    const [editing, setEditing] = useState(false);
    const [Tag, setTag] = useState('');
    
    const Save = () => {
        if (Tag !== '') {
          
            props.add(Tag);
            message.success('Add a new strength');
        }
        else {
            message.info('Please enter something');
        }
        setEditing(false);
    }

    const Delete = (key) => {
        message.success('Remove a strength');
        props.delete(key);
    }

    const strengthLists = [];

    for (let i = 0; i <= props.strength.length - 1; i++) {
        if(props.isAuthor){
            strengthLists.push(
                <div key={i} className='StrengthEditor__Tag'>
                    <Text className='StrengthEditor__Title' cls='Gerneral' fontSize='16' content={props.strength[i]} />
                    <CloseOutlined key={i} style={{ fontSize: '12px' }} className={'StrengthEditor__Delete'} onClick={e => Delete(i)} />
                </div>
            );
        }
        else{
            strengthLists.push(
                <div key={i} className='StrengthEditor__Tag__NotAuthor'>
                    <Text className='StrengthEditor__Title' cls='Gerneral' fontSize='16' content={props.strength[i]} />
                 
                </div>    
            );
        }
    };

    return (
        <div className='StrengthEditor'>
            <Text className='StrengthEditor__Title' cls='Gerneral' fontSize='20' content={'Strength :'} />
            <div className='StrengthEditor__Tags'>
                {strengthLists}
                {!editing&&props.isAuthor &&
                    <PlusCircleOutlined style={{ fontSize: '14px' }} className='StrengthEditor__Add' onClick={() => { setEditing(true) }} />}
                {editing&&props.isAuthor &&
                    <Input className='StrengthEditor__Input' placeholder='Enter New Strength' onChange={(e) => { const Tag = e.target.value; setTag(Tag) }} />}
                {editing&&props.isAuthor &&
                    <SaveOutlined className='StrengthEditor__Save' style={{ fontSize: '22px' }} onClick={() => { Save(); }} />}
            </div>
        </div>
    );
}
export default StrengthEditor;