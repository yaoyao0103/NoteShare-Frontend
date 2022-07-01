import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { List, Skeleton, Layout, message, Avatar, Dropdown, Menu, Input, Modal } from 'antd';
import Button from '../Button/Button';
import Text from '../Text/Text';
import axios from '../axios/axios';
import { ArrowLeftOutlined, FolderAddOutlined, PlusOutlined, MoreOutlined, CloseOutlined } from "@ant-design/icons";
import './FileManager.css';
import { Note } from '../PostEditTemplate/InfoCategories';
import OptionMenu from '../OptionMenu/OptionMenu';
const { Content, Sider }  = Layout;
//const email = "00857028@email.ntou.edu.tw"
const FileManager = (props) => {
    const [files, setFiles] = useState([])
    const [posts, setPosts] = useState([])
    const [postShow, setPostShow] = useState(true)
    const [backBtnShow, setBackBtnShow] = useState(false)
    const [current, setCurrent] = useState(null)
    const [parent, setParent] = useState(null)
    const [notes, setNotes] = useState([])
    const [inFolder, setInFolder] = useState(false)
    const [renaming, setRenaming] = useState(false)
    const [newFolder, setNewFolder] = useState(false)
    const [path, setPath] = useState('/')
    useEffect(() => {
        async function getRootFile() {
            axios.get(`http://localhost:8080/folder/root/${props.email}`)
            .then(res => {
                console.log(res.data.res)
                setFiles(res.data.res)
                setPosts([{folderName:'QnA', value:'QA'}, {folderName:'Reward', value:'reward'}, {folderName:'Collab',value:'collaboration'}])
            })
            .catch(err =>{
                console.log(err)
            })
        }
        if(props.email) getRootFile();
        //setRoot([{folderName:'Buy', value:'buy'}, {folderName:'Favorite', value:'favorite'}, {folderName:'Folder', value:'folder'}, {folderName:'QnA', value:'QA'}, {folderName:'Reward', value:'reward'}, {folderName:'CollabNote',value:'collaboration'}])
    },[props.email])

    const onClickFolderZone = (folderId) => {
        setCurrent(folderId)
        setBackBtnShow(true);
        axios.get(`http://localhost:8080/folder/${folderId}`)
        .then(res => {
            console.log(res.data.res)
            setFiles(res.data.res.children)
            setPostShow(false)
            const parentId = res.data.res.parent
            const tempNotes = res.data.res.notes;
            const path = res.data.res.path;
            setPath(path)
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
                                actions={[<OptionMenu page={props.page} id={item.id} setPageProps={props.setPageProps} />]}
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

    const onClickPostZone = (value) => {
        message.info(value)
        axios.get(`http://localhost:8080/post/${props.email}/${value}`)
        .then(res => {
            console.log(res.data.res)
            setFiles([])
            setPostShow(false)
            const tempPosts = res.data.res;
            if(tempPosts.length > 0){
                setNotes(
                    <List
                        className="fileManage_Note fileManage_List"
                        itemLayout="horizontal"
                        dataSource={tempPosts}
                        renderItem={(item, index) => (
                            <List.Item
                                className="fileManage_Note_Item fileManage_List_Item"
                                actions={[<OptionMenu page={props.page} type={item.type} id={item.id} setPageProps={props.setPageProps} rerenderPosts={() => onClickPostZone(item.type)}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                    title={item.title}
                                    description={item.content.substring(0, 120) + '...'}
                                    onClick={()=> onClickPost(item.type, item.id)}
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
        props.setPageProps({
            noteId:id,
            page:'NoteDetailPage'
        })
    }

    const onClickPost = (type, id) => {
        switch(type){
            case 'reward': props.setPageProps({
                postId: id,
                page:'RewardDetailPage'
            });break;
            case 'QA': props.setPageProps({
                postId: id,
                page:'QnADetailPage'
            });break;
            case 'collaboration': props.setPageProps({
                postId: id,
                page:'CollabDetailPage'
            });break;
        }
        
    }

    const back = () => {
        setCurrent(parent)
        if(parent){
            axios.get(`http://localhost:8080/folder/${parent}`)
            .then(res => {
                console.log(res.data.res)
                setFiles(res.data.res.children)
                setPostShow(false)
                const parentId = res.data.res.parent
                setParent(parentId)      
                const path = res.data.res.path;
                setPath(path);
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
                                    actions={[<OptionMenu page={props.page} id={item.id}/>]}
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
            axios.get(`http://localhost:8080/folder/root/${props.email}`)
            .then(res => {
                console.log(res.data.res);
                setFiles(res.data.res);
                setPostShow(true)
                setBackBtnShow(false);
                setNotes([])
                setInFolder(false)
            })
            .catch(err =>{
                console.log(err)
            })
        }
        
    }

    const createFolder = (name) => {
        const data = {
            folderName: name,
            parent: current,
            path: path + `/${name}`,
            public: true,

        }
        //console.log("path", data)
        axios.post(`http://localhost:8080/folder/${props.email}`, data)
            .then(res => {
                console.log(res.data.res);
                onClickFolderZone(current)
                setNewFolder(false)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    const deleteFolder = (folderId) => {
        axios.delete(`http://localhost:8080/folder/${props.email}/${folderId}`)
            .then(res => {
                console.log(res);
                onClickFolderZone(current)
            })
            .catch(err =>{
                console.log(err)
            })
    }

    const renameFolder = (folderId, newName) => {
        axios.put(`http://localhost:8080/folder/rename/${props.email}/${folderId}/${newName}`)
            .then(res => {
                console.log(res);
                message.success("Success")
                setRenaming(false)
                onClickFolderZone(current)
            })
            .catch(err =>{
                console.log(err)
            })
    }



    const createMenu = (
        <Menu
            items={[
                {
                key: '1',
                label: (
                    <a onClick={()=>{
                        props.setPageProps({
                            folderId: current,
                            action: "new",
                            page: 'NoteNewPage'
                        })
                    }} style={{textDecoration:"none"}}>Note</a>
                ),
                },
                {
                key: '2',
                label: (
                    <Link to={'/CollabEditPage/new/0'} style={{textDecoration:"none"}}>Collaboration Note</Link>
                ),
                }
            ]}
            />
        );

        /*const folderMenu = (
            <Menu
                items={[
                    {
                    key: '1',
                    label: (
                        <a onclick={() => setRenaming(id)} style={{textDecoration:"none"}}>Rename Folder</a>
                    ),
                    },
                    {
                    key: '2',
                    label: (
                        <Link to={'/CollabEditPage/new/0'} style={{textDecoration:"none"}}>Delete Folder</Link>
                    ),
                    }
                ]}
                />
            );
*/
    return (
        <>
            <div className='fileManager'>
                <Layout className='fileManager_Layout'>
                    <Sider className='fileManager_Sider'>
                        <div className='fileManager_Buttons' >
                            {backBtnShow?
                                <ArrowLeftOutlined onClick={back}/>
                                :
                                <ArrowLeftOutlined onClick={null} style={{cursor:"default", color:"#bbb"}}/>
                            }
                            {inFolder && 
                            <>
                                <FolderAddOutlined onClick={()=>setNewFolder(true)}/>
                                <Dropdown overlay={createMenu} placement="bottomLeft" arrow>
                                    <PlusOutlined/>
                                </Dropdown>
                            </>}
                        </div>
                        <>
                            <List
                                className="fileManage_Folder fileManage_List"
                                itemLayout="horizontal"
                                dataSource={files}
                                renderItem={(item, index) => (
                                        <List.Item
                                            className={renaming==item.id? "fileManage_Folder_Item fileManage_List_Item_NoHover" : "fileManage_Folder_Item fileManage_List_Item"}
                                            //onClick={()=> onClickFolderZone(item.id)}
                                        >
                                            
                                            
                                            {renaming==item.id? <Input onPressEnter={(ev) => renameFolder(item.id, ev.target.value)} className="fileManage_Folder_Item_Input" addonAfter={<CloseOutlined onClick={()=>setRenaming(false)}/>}/>:<div className='fileManage_Folder_Item_Name' onClick={()=> onClickFolderZone(item.id)}><div>{item.folderName}</div></div>}
                                            
                                            {renaming!=item.id && inFolder && 
                                                <Dropdown overlay={<Menu
                                                    items={[
                                                        {
                                                        key: '1',
                                                        label: (
                                                            <a onClick={() => setRenaming(item.id)} style={{textDecoration:"none"}}>Rename</a>
                                                        ),
                                                        },
                                                        {
                                                        key: '2',
                                                        label: (
                                                            <a onClick={() => deleteFolder(item.id)} style={{textDecoration:"none"}}>Delete</a>
                                                        ),
                                                        }
                                                    ]}
                                                    />} placement="bottomLeft" arrow>
                                                    <MoreOutlined/>
                                                </Dropdown>
                                            }
                                        </List.Item>
                                    
                                )}
                            />
                            {newFolder &&
                                <List.Item className="fileManage_Folder_Item fileManage_List_Item_NoHover">
                                    <Input onPressEnter={(ev) => createFolder(ev.target.value)} className="fileManage_Folder_Item_Input" addonAfter={<CloseOutlined onClick={()=>setNewFolder(false)}/>}/>
                                </List.Item>
                            }
                        </>
                        {postShow &&
                            <List
                                className="fileManage_Post fileManage_List"
                                itemLayout="horizontal"
                                dataSource={posts}
                                renderItem={(item, index) => (
                                    <List.Item
                                        className="fileManage_Folder_Item fileManage_List_Item"
                                        onClick={()=> onClickPostZone(item.value)}
                                    >
                                        <div className='fileManage_Folder_Item_Name' onClick={()=> onClickFolderZone(item.id)}><div>{item.folderName}</div></div>
                                    </List.Item>
                                )}
                            />
                        }
                    </Sider>
                    <Content className='fileManager_Content'>
                        {notes}
                    </Content>
                </Layout>
                
            </div>
        </>
    );
}
export default FileManager;