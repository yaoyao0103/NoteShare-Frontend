import React, { useState, useEffect, useRef } from 'react';
import { Input, message } from "antd";
import { CloseOutlined, PlusCircleOutlined, SaveOutlined } from '@ant-design/icons';
import './StrengthEditor.css'
import Text from '../Text/Text';
function StrengthEditor(props) {
    const [editing, setEditing] = useState(false);
    const [Tag, setTag] = useState('');
    const [strength, setStrength] = useState(
        ['資料結構', '程式設計', '演算法', 'Java', '資料結構', '程式設計', '演算法', 'Java']
    );
    const Save = () => {
        if (Tag !== '') {
            setStrength(oldArray => [...oldArray, Tag]);
            message.info('Add new strength');
        }
        else {

            message.info('Please enter something');
        }
        setEditing(false);

    }
    const Delete = (key) => {

        message.info('Remove ' + strength[key]);
        console.log(key);
        console.log(strength.length)
        // if(key===strength.length)
        // key=-2;
        // let temp=strength.slice(key);
        // strength.splice(key,1);
        setStrength([...strength.slice(0, key), ...strength.slice(key + 1, strength.length)]);
        console.log(strength)

    }
    const strengthLists = [];
    for (let i = 0; i <= strength.length - 1; i++) {
        strengthLists.push(
            <div key={i} className='StrengthEditor__Tag'>
                <Text className='StrengthEditor__Title' cls='Gerneral' fontSize='22' content={strength[i]} />
                <CloseOutlined key={i} style={{ fontSize: '16px' }} className={'StrengthEditor__Delete'} onClick={e => Delete(i)} />
            </div>
        );

    };
    return (
        <div className='StrengthEditor'>
            <Text className='StrengthEditor__Title' cls='Gerneral' fontSize='26' content={'Strength :'} />
            <div className='StrengthEditor__Tags'>
                {strengthLists}
                {!editing &&
                    <PlusCircleOutlined style={{ fontSize: '20px' }} className='StrengthEditor__Add' onClick={() => { setEditing(true) }} />}
                {editing &&
                    <Input className='StrengthEditor__Input' placeholder='Enter new Strength' onChange={(e) => { const Tag = e.target.value; setTag(Tag) }} />}
                {editing &&
                    <SaveOutlined className='StrengthEditor__Save' style={{ fontSize: '22px' }} onClick={() => { Save(); }} />}
            </div>
        </div>
    );

}
export default StrengthEditor;