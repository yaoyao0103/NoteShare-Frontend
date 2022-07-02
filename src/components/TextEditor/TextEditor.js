import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Input, message } from "antd";
import { EditFilled, SaveOutlined } from '@ant-design/icons';
import './TextEditor.css'
import Text from '../Text/Text';
function TextEditor(props) {
    return (
        <div className='TextEditor'>
            <Text className='TextEditor__Title' cls='Gerneral' fontSize='22' content={'Name :'} />

            <div className='TextEditor__Name'>
                <Text cls='Gerneral' fontSize='22' content={props.name} />
            </div>

        </div>
    );

}
export default TextEditor;