import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { List, Skeleton, Layout, message, Avatar, Dropdown, Menu, Input, Modal, Tooltip } from 'antd';
import Button from '../Button/Button';
import Text from '../Text/Text';
import axios from '../axios/axios';
import { ArrowLeftOutlined, FolderAddOutlined, PlusOutlined, MoreOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
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
    const [copy, setCopy] = useState(null)
    const [move, setMove] = useState(null)

    useEffect(() => {
        async function getRootFile() {
            axios.get(`http://localhost:8080/folder/root/${props.email}`)
            .then(res => {
                console.log(res.data.res)
                setFiles(res.data.res)
                setPosts([{folderName:'QnA', value:'QA'}, {folderName:'Reward', value:'reward'}, {folderName:'Collab',value:'collaboration'}])
                props.setLoading(false)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Get Root File Error)")
                console.log(err)
            })
        }
        if(props.email) getRootFile();
        //setRoot([{folderName:'Buy', value:'buy'}, {folderName:'Favorite', value:'favorite'}, {folderName:'Folder', value:'folder'}, {folderName:'QnA', value:'QA'}, {folderName:'Reward', value:'reward'}, {folderName:'CollabNote',value:'collaboration'}])
    },[props])

   
    useEffect(()=>{ 
        if(copy)
            message.info("Please go to the folder you want to copy, then click confirm button",0) 
        if(move)
        message.info("Please go to the folder you want to move, then click confirm button",0) 
    },[copy, move])

    const onClickFolderZone = (folderId) => {
        props.setLoading(true)
        setCurrent(folderId)
        setBackBtnShow(true);
        axios.get(`http://localhost:8080/folder/${folderId}`)
        .then(res => {
            console.log(res.data.res)
            setFiles(res.data.res.children)
            setPostShow(false)
            const parentId = res.data.res.parent
            const tempNotes = res.data.res.notes;
            const tempPath = res.data.res.path;
            setPath(tempPath)
            tempPath.split('/')[1] == 'Folder' ? setInFolder(true):setInFolder(false)
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
                                actions={
                                    tempPath.split('/')[1] == 'Folder' &&
                                    [<OptionMenu page={props.page} id={item.id} setPageProps={props.setPageProps} setCopy={setCopy} type={"note"} folderId={folderId} rerenderNotes={() => onClickFolderZone(folderId)}/>]
                                }
                            >
                                <List.Item.Meta
                                    avatar={
                                    <Tooltip title={item.headerUserObj.userObjName}>
                                        <Avatar src={item.headerUserObj.userObjAvatar} />
                                    </Tooltip>}
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
            props.setLoading(false)
            
        })
        .catch(err =>{
            console.log(err)
            message.error("Server Error! Please try again later. (Enter Folder Error)")
            props.setLoading(false)
        })
    }

    const onClickPostZone = (value) => {
        props.setLoading(true)
        message.info(value.charAt(0).toUpperCase() + value.slice(1))
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
                                //actions={[<OptionMenu page={props.page} type={item.type} id={item.id} setPageProps={props.setPageProps} rerenderPosts={() => onClickPostZone(item.type)} setCopy={setCopy}/>]}
                                actions={[<p>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>]}
                            >
                                <List.Item.Meta
                                    avatar={
                                    <Tooltip title={item.authorUserObj.userObjName}>
                                        <Avatar src={item.authorUserObj.userObjAvatar} />
                                    </Tooltip>
                                    }                 
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
            props.setLoading(false)
        })
        .catch(err =>{
            console.log(err)
            message.error("Server Error! Please try again later. (Enter Post Folder Error)")
            props.setLoading(false)
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
        props.setLoading(true)
        let tempCurrent = parent
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
                                    actions={[<OptionMenu page={props.page} id={item.id} setCopy={setCopy} type={"note"} folderId={tempCurrent} rerenderNotes={() => onClickFolderZone(tempCurrent)}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Tooltip title={item.headerUserObj.userObjName}>
                                                <Avatar src={item.headerUserObj.userObjAvatar} />
                                            </Tooltip>
                                        }
                                        title={item.title}
                                        description={item.description.substring(0, 120) + '...'}
                                        onClick={()=> onClickNote(item.id)}
                                        />
                                </List.Item>
                            )}
                        />
                    )
                }
                props.setLoading(false)
            })
            .catch(err =>{
                console.log(err)
                message.error("Server Error! Please try again later. (Back To Last Layer Error)")
                props.setLoading(false)
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
                props.setLoading(false)
            })
            .catch(err =>{
                console.log(err)
                message.error("Server Error! Please try again later. (Back To Last Layer Error)")
                props.setLoading(false)
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
        if(!name){
            message.warn("The folder name cannot be empty!")
            return;
        }
        props.setLoading(true)
        //console.log("path", data)
        axios.post(`http://localhost:8080/folder/${props.email}`, data)
            .then(res => {
                console.log(res.data.res);
                onClickFolderZone(current)
                setNewFolder(false)
                message.success("You created a folder!")
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Create Folder Error)")
                console.log(err)
            })
    }

    const deleteFolder = (folderId) => {
        props.setLoading(true)
        axios.delete(`http://localhost:8080/folder/${props.email}/${folderId}`)
            .then(res => {
                console.log(res);
                onClickFolderZone(current)
                props.setLoading(false)
                message.success("You deleted a folder!")
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Delete Folder Error)")
                console.log(err)
            })
    }

    const renameFolder = (folderId, newName) => {
        props.setLoading(true)
        axios.put(`http://localhost:8080/folder/rename/${props.email}/${folderId}/${newName}`)
            .then(res => {
                console.log(res);
                message.success("You renamed a folder")
                setRenaming(false)
                onClickFolderZone(current)
                props.setLoading(false)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Rename Folder Error)")
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

    const copyNote = () => {
        props.setLoading(true)
        message.destroy();
        axios.put(`http://localhost:8080/note/save/${copy}/${current}`)
            .then(res => {
                message.success("You copied a note!")
                onClickFolderZone(current)
                setCopy(null)
                props.setLoading(false)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Copy Note Error)")
                setCopy(null)
            })
        
    }

    const moveFolder = () => {
        message.destroy(); 
        props.setLoading(true)
        const data = {
            path: path + '/' + move.folderName,
            parent: current,
        }
        
        axios.put(`http://localhost:8080/folder/save/${props.email}/${move.folderId}`, data)
            .then(res => {
                onClickFolderZone(current)
                setMove(null)
                message.success("You moved a folder!")
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Move Folder Error)")
            })
    }
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
                                {(copy||move)&&
                                    <>
                                        <button className='copy_Button confirm_Button' onClick={copy? copyNote: moveFolder}>
                                            <CheckOutlined/>
                                        </button>
                                        <button className='copy_Button cancel_Button' onClick={() => {
                                            setCopy(null);
                                            setMove(null);
                                            message.destroy(); 
                                            message.warn("Cancel!")}
                                            }>
                                            <CloseOutlined />
                                        </button>
                                    </>
                                }
                                
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
                                            
                                            
                                            {renaming==item.id? <Input bordered={false} onPressEnter={(ev) => renameFolder(item.id, ev.target.value)} className="fileManage_Folder_Item_Input" addonAfter={<CloseOutlined onClick={()=>setRenaming(false)}/>}/>:<div className='fileManage_Folder_Item_Name' onClick={()=> onClickFolderZone(item.id)}><div>{item.folderName}</div></div>}
                                            
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
                                                                <a onClick={() => setMove({folderId:item.id, folderName:item.folderName})} style={{textDecoration:"none"}}>Move</a>
                                                            ),
                                                            },
                                                        {
                                                        key: '3',
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
                                    <Input bordered={false} onPressEnter={(ev) => createFolder(ev.target.value)} className="fileManage_Folder_Item_Input" addonAfter={<CloseOutlined onClick={()=>setNewFolder(false)}/>}/>
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