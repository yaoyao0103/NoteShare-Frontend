import React, { useState, useEffect } from 'react';
import { List, message } from "antd";
import PropTypes from 'prop-types';
import { FolderOutlined, ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import axios from '../axios/axios';
import Text from '../Text/Text';
import './FolderCard.css'

function FolderCard(props) {
    const folderClick = (item) => {
        props.setLoading(true)
        if (item.notes.length !== 0 && item.folderName) {
            props.clickFolder(item.id);
        }
        else if (item.notes.length !== 0 && !item.folderName) {

        }
        else
            message.info("There are no notes in this folder!");
    }
    //console.log(props.folderList);
    const generatedFolder = (item) => {
       // console.log(props.folderList)
        //console.log(item)
        if (item.public) {
            return (
                < List.Item className='FolderCard__List__Item' onClick={() => folderClick(item)}>
                    {item.folderName &&
                        <FolderOutlined style={{ fontSize: '150%' }} />}
                    {!item.folderName &&
                        <FileTextOutlined style={{ fontSize: '150%' }} />}
                    {item.folderName &&
                        <List.Item.Meta
                            className='FolderCard__List__Sec__Col'
                            title={<Text cls='Default' fontSize={'20'} content={item.folderName} />}

                        />}
                    {!item.folderName &&
                        <List.Item.Meta
                            className='FolderCard__List__Sec__Col'
                            title={<Text cls='Default' fontSize={'20'} content={item.title} />}
                            description={item.description}
                            onClick={()=>{props.setPageProps({
                                noteId: item.id,
                                page: "NoteDetailPage"
                            })}}
                        />}
                    {item.folderName &&
                        <div className='FolderCard__List__NoteNumber'>
                            <Text cls='Default' fontSize={'16'} content={'Note number : ' + item.notes.length} />
                        </div>
                    }

                </List.Item>

            )
        } else {
            return ("");
        }
    }
    return (
        <div className='FolderCard'>
            {!props.isRoot && <div onClick={() => {props.clickBack(props.folderList[0][0].parent)}}><ArrowLeftOutlined className='FolderCard__Back' /></div>}
            <List
                className='FolderCard__List'
                itemLayout="horizontal"
                dataSource={props.folderList[0]}
                renderItem={(item) => generatedFolder(item)}
            />

        </div>
    );
}

export default FolderCard;