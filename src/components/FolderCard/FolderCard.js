import React, { useState, useEffect } from 'react';
import { List, message } from "antd";
import PropTypes from 'prop-types';
import { FolderOutlined, ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from "axios";
import Text from '../Text/Text';
import './FolderCard.css'

function FolderCard(props) {
    const folderClick = (item) => {
        if (item.notes.length !== 0 && item.folderName) {
            props.clickFolder(item.id);
        }
        else if (item.notes.length !== 0 && !item.folderName) {

        }
        else
            message.info("There hasn't note in this folder!");
    }
    console.log(props.folderList);

    return (
        <div className='FolderCard'>
            {!props.isRoot && <div onClick={() => props.clickBack(props.folderList[0].parent)}><ArrowLeftOutlined  className='FolderCard__Back' /></div>}
            <List
                className='FolderCard__List'
                itemLayout="horizontal"
                dataSource={props.folderList}
                renderItem={(item) => (

                    < List.Item className='FolderCard__List__Item' onClick={() => folderClick(item)}>
                        {item.folderName &&
                            <FolderOutlined style={{ fontSize: '150%' }} />}
                        {!item.folderName &&
                            <FileTextOutlined style={{ fontSize: '150%' }} />}
                        {item.folderName &&
                            <List.Item.Meta
                                className='FolderCard__List__Sec__Col'
                                title={<Text cls='Default' fontSize={20} content={item.folderName} />}

                            />}
                        {!item.folderName &&
                            <List.Item.Meta
                                className='FolderCard__List__Sec__Col'
                                title={<Text cls='Default' fontSize={20} content={item.title} />}
                                description={item.description}
                            />}
                        {item.folderName &&
                            <div className='FolderCard__List__NoteNumber'>
                                <Text cls='Default' fontSize={16} content={'Note number : ' + item.notes.length} />
                            </div>
                        }

                    </List.Item>

                )}
            />

        </div>
    );
}

export default FolderCard;