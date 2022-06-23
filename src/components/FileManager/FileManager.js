import React, { useEffect, useState } from 'react';
import { List, Skeleton, Layout, message, Avatar } from 'antd';
import Button from '../Button/Button';
import Text from '../Text/Text';
import axios from '../axios/axios';
import { ArrowLeftOutlined, FolderAddOutlined } from "@ant-design/icons";
import './FileManager.css';
import { Note } from '../PostEditTemplate/InfoCategories';
import OptionMenu from '../OptionMenu/OptionMenu';
const { Content, Sider }  = Layout;
const email = "00857028@email.ntou.edu.tw"
const FileManager = (props) => {
    const [files, setFiles] = useState([])
    const [current, setCurrent] = useState(null)
    const [parent, setParent] = useState(null)
    const [notes, setNotes] = useState([])
    const [inFolder, setInFolder] = useState(false)
    useEffect(() => {
        async function getRootFile() {
            axios.get(`http://localhost:8080/folder/root/${email}`)
            .then(res => {
                console.log(res.data.res)
                setFiles([...res.data.res, {folderName:'QnA', id:''}, {folderName:'Reward', id:''}, {folderName:'Collab', id:''}])
            })
            .catch(err =>{
                console.log(err)
            })
        }
        getRootFile();
    },[])

    const onClickFolder = (folderId) => {
        setCurrent(folderId)
        axios.get(`http://localhost:8080/folder/${folderId}`)
        .then(res => {
            console.log(res.data.res)
            setFiles(res.data.res.children)
            const parentId = res.data.res.parent
            const tempNotes = res.data.res.notes;
            const path = res.data.res.path;
            path.split('/')[1] == 'Folder' ? setInFolder(true):setInFolder(false)
            if(parentId){
                console.log("parentId:",parentId)
                setParent(parentId)
            }
            console.log("tempNotes", tempNotes);
            if(tempNotes.length > 0){
                setNotes(
                    <List
                        className="fileManage_Note fileManage_List"
                        itemLayout="horizontal"
                        dataSource={tempNotes}
                        renderItem={(item, index) => (
                            <List.Item
                                className="fileManage_Note_Item fileManage_List_Item"
                                actions={[<OptionMenu page={props.page} noteId={item.id}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={item.title}
                                    description={item.description.substring(0, 120) + '...'}
                                    onClick={()=> onClickNote(item.id)}
                                />
                            </List.Item>
                        )}
                    />
                )
            }
            else{
                setNotes([])
            }

            
        })
        .catch(err =>{
            console.log(err)
        })
    }

    const onClickNote = (id) => {
        message.info("id: "+ id)
    }
    const back = () => {
        setCurrent(parent)
        if(parent){
            axios.get(`http://localhost:8080/folder/${parent}`)
            .then(res => {
                console.log(res.data.res)
                setFiles(res.data.res.children)
                const parentId = res.data.res.parent
                setParent(parentId)      
                const path = res.data.res.path;
                path.split('/')[1] == 'Folder' ? setInFolder(true):setInFolder(false)
                const tempNotes = res.data.res.notes;
                if(tempNotes.length > 0){
                    setNotes(
                        <List
                            className="fileManage_Note fileManage_List"
                            itemLayout="horizontal"
                            dataSource={tempNotes}
                            renderItem={(item, index) => (
                                <List.Item
                                    className="fileManage_Note_Item fileManage_List_Item"
                                    actions={[<OptionMenu page={props.page} noteId={item.id}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                        title={item.title}
                                        description={item.description.substring(0, 120) + '...'}
                                        onClick={()=> onClickNote(item.id)}
                                        />
                                </List.Item>
                            )}
                        />
                    )
                }
            })
            .catch(err =>{
                console.log(err)
            })
        }

        // No parent: root folder
        else{
            setCurrent(null);
            axios.get(`http://localhost:8080/folder/root/${email}`)
            .then(res => {
                console.log(res.data.res);
                setFiles(res.data.res);
                setNotes([])
                setInFolder(false)
            })
            .catch(err =>{
                console.log(err)
            })
        }
        
    }

    return (
        <div className='fileManager'>
            <Layout className='fileManager_Layout'>
                <Sider className='fileManager_Sider'>
                    {
                    <div className='fileManager_Buttons' >
                        <ArrowLeftOutlined onClick={back}/>
                        {inFolder && <FolderAddOutlined />}
                        
                    </div>
                    }
                    <List
                        className="fileManage_Folder fileManage_List"
                        itemLayout="horizontal"
                        dataSource={files}
                        renderItem={(item, index) => (
                            <List.Item
                                className="fileManage_Folder_Item fileManage_List_Item"
                                onClick={()=> onClickFolder(item.id)}
                            >
                                {item.folderName}
                            </List.Item>
                        )}
                    />
                </Sider>
                <Content className='fileManager_Content'>
                    {notes}
                </Content>
            </Layout>
            
        </div>
        
    );
}
export default FileManager;