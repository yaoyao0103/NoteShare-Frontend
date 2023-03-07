import React, { useEffect, useState } from 'react';
import { List, Skeleton, Layout, message, Avatar, Dropdown, Menu, Input, Modal, Tooltip, Popconfirm, Select } from 'antd';
import axios from '../../components/axios/axios';
import { ArrowLeftOutlined, FolderAddOutlined, PlusOutlined, MoreOutlined, CloseOutlined, CheckOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import '../../components/FileManager/FileManager.css';
import { Note } from '../../components/PostEditTemplate/InfoCategories';
import OptionMenu from '../../components/OptionMenu/OptionMenu';
import Cookie from '../../components/Cookies/Cookies';
import Search from 'antd/lib/transfer/search';
const cookieParser = new Cookie(document.cookie)
const { Content, Sider } = Layout;
const { Option } = Select;
//const email = "00857028@email.ntou.edu.tw"

const FolderDetailPage = (props) => {
    const [files, setFiles] = useState([])
    const [rootFolderId, setRootFolderId] = useState(null)
    const [backBtnShow, setBackBtnShow] = useState(false)
    const [current, setCurrent] = useState(null)
    const [parent, setParent] = useState(null)
    const [notes, setNotes] = useState([])
    const [originNotes, setOriginNotes] = useState([])
    
    const [width, setWindowWidth] = useState(0)

    const getFolderById = (folderId) => {
        props.setLoading(true)
        setCurrent(folderId)
        axios.get(`/folder/${folderId}`, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                setFiles(res.data.res.children)
                console.log("child", res.data.res.children)
                const parentId = res.data.res.parent
                const tempNotes = res.data.res.notes;
                setOriginNotes(tempNotes)
                setParent(parentId)
                console.log("vs" + parentId + " + " + props.id)
                if(!parent)
                    setBackBtnShow(false);
                else
                    setBackBtnShow(true);
                if (tempNotes.length > 0) {
                    setNotes(
                        <List
                            className="fileManage_Note fileManage_List"
                            itemLayout="horizontal"
                            dataSource={tempNotes}
                            renderItem={(item, index) => (
                                <List.Item
                                    className="fileManage_Note_Item fileManage_List_Item"
                                    actions={
                                        [<OptionMenu setLoggedIn={props.setLoggedIn} page={"PersonalPage"} mode={"search"} id={item.id} setPageProps={props.setPageProps} type={"note"} folderId={folderId} rerenderNotes={() => getFolderById(folderId)} />]
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Tooltip title={item.headerUserObj.userObjName}>
                                                <Avatar src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} />
                                            </Tooltip>}
                                        title={item.title}
                                        description={item.description ? item.description.substring(0, 120) + "..." : "..."}
                                        onClick={() => onClickNote(item.id)}
                                    />
                                </List.Item>
                            )}
                        />

                    )
                }
                else {
                    setOriginNotes([])
                    setNotes([])
                }
                props.setLoading(false)

            })
            .catch(err => {
                props.setLoading(false)
                if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                    if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                        document.cookie = 'error=Jwt'
                        message.destroy()
                        message.warning('The connection timed out, please login again !')
                        document.cookie = 'email=;'
                        props.setLoggedIn(false)
                        props.setPageProps({ page: 'LoginPage' })
                    }
                    else
                        document.cookie = 'error=true'
                    message.error('Server Error! Please refresh again! (Enter Folder Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Enter Folder Error)")
                }
            })

    }
    useEffect(() => { 

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => 
            window.removeEventListener("resize",updateDimensions);
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }
    const responsive = {
        showSider: width >= 768
    }

    useEffect(() => {
        getFolderById(props.id);
        //setRoot([{folderName:'Buy', value:'buy'}, {folderName:'Favorite', value:'favorite'}, {folderName:'Folder', value:'folder'}, {folderName:'QnA', value:'QA'}, {folderName:'Reward', value:'reward'}, {folderName:'CollabNote',value:'collaboration'}])
    }, [props])



    const onClickNote = (id) => {
        props.setPageProps({
            noteId: id,
            page: 'NoteDetailPage'
        })
    }

    const back = () => {
        props.setLoading(true)
        let tempCurrent = parent
        setCurrent(parent)
        if (parent) {
            axios.get(`/folder/${parent}`, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    console.log(res.data.res)
                    setFiles(res.data.res.children)
                    const parentId = res.data.res.parent
                    setParent(parentId)
                    const tempNotes = res.data.res.notes;
                    setOriginNotes(tempNotes)
                    if (tempNotes.length > 0) {
                        setNotes(
                            <List
                                className="fileManage_Note fileManage_List"
                                itemLayout="horizontal"
                                dataSource={tempNotes}
                                renderItem={(item, index) => (
                                    <List.Item
                                        className="fileManage_Note_Item fileManage_List_Item"
                                        actions={[<OptionMenu setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={props.page} id={item.id} type={"note"} folderId={tempCurrent} rerenderNotes={() => getFolderById(tempCurrent)} />]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Tooltip title={item.headerUserObj.userObjName}>
                                                    <Avatar src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} />
                                                </Tooltip>
                                            }
                                            title={item.title}
                                            description={item.description ? item.description.substring(0, 120) + "..." : "..."}
                                            onClick={() => onClickNote(item.id)}
                                        />
                                    </List.Item>
                                )}
                            />
                        )
                    }
                    props.setLoading(false)
                })
                .catch(err => {
                    props.setLoading(false)
                    if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                        if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                            document.cookie = 'error=Jwt'
                            message.destroy()
                            message.warning('The connection timed out, please login again !')
                            document.cookie = 'email=;'
                            props.setLoggedIn(false)
                            props.setPageProps({ page: 'LoginPage' })
                        }
                        else
                            document.cookie = 'error=true'
                        message.error('Server Error! Please refresh again! (Back To Last Layer Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Back To Last Layer Error)")
                    }
                })
        }

        // No parent: root folder
        else {
            setCurrent(null);
            axios.get(`/folder/root/${props.email}`, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    console.log(res.data.res);
                    setFiles(res.data.res);
                    const parentId = res.data.res.parent
                    if(parentId == props.id){
                        setBackBtnShow(false);
                    }
                    else{
                        setBackBtnShow(true);
                    }
                    setOriginNotes([])
                    setNotes([])
                    props.setLoading(false)
                })
                .catch(err => {
                    props.setLoading(false)
                    if (err.response.status === 500 || err.response.status === 404 || err.response.status === 403) {
                        if (err.response.data.message.slice(0, 13) === 'Malformed JWT') {
                            document.cookie = 'error=Jwt'
                            message.destroy()
                            message.warning('The connection timed out, please login again !')
                            document.cookie = 'email=;'
                            props.setLoggedIn(false)
                            props.setPageProps({ page: 'LoginPage' })
                        }
                        else
                            document.cookie = 'error=true'
                        message.error('Server Error! Please refresh again! (Back To Last Layer Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Back To Last Layer Error)")
                    }
                })
        }

    }


    const SearchOnChange = (ev) => {
        const keyword = ev.target.value;
        const tempNote = [];
        for(let i = 0; i < originNotes.length; i++){
            if(originNotes[i].title.toLowerCase().includes(keyword.toLowerCase())){
                tempNote.push(originNotes[i])
            }
        }
        setNotes(
            <List
                className="fileManage_Note fileManage_List"
                itemLayout="horizontal"
                dataSource={tempNote}
                renderItem={(item, index) => (
                    <List.Item
                        className="fileManage_Note_Item fileManage_List_Item"
                        actions={
                            [<OptionMenu setLoggedIn={props.setLoggedIn} page={props.page} id={item.id} setPageProps={props.setPageProps} type={"note"} folderId={current} rerenderNotes={() => getFolderById(current)} />]
                        }
                    >
                        <List.Item.Meta
                            avatar={
                                <Tooltip title={item.headerUserObj.userObjName}>
                                    <Avatar src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} />
                                </Tooltip>}
                            title={item.title}
                            description={item.description ? item.description.substring(0, 120) + "..." : "..."}
                            onClick={() => onClickNote(item.id)}
                        />
                    </List.Item>
                )}
            />
        )
    }


    return (
        <>
            <div className='fileManager'>

                <Layout className='fileManager_Layout'>
                    {responsive.showSider ?
                        <>
                        <Sider className='fileManager_Sider'>
                            <div className='fileManager_Buttons' >

                                {backBtnShow ?
                                    <ArrowLeftOutlined onClick={back} />
                                    :
                                    <ArrowLeftOutlined onClick={null} style={{ cursor: "default", color: "#bbb" }} />
                                }
                            </div>
                            <List
                                className="fileManage_Folder fileManage_List"
                                itemLayout="horizontal"
                                dataSource={files}
                                renderItem={(item, index) => (
                                    <List.Item
                                        className="fileManage_Folder_Item fileManage_List_Item"
                                    //onClick={()=> onClickFolderZone(item.id)}
                                    >
                                    {item.public &&
                                        <div className='fileManage_Folder_Item_Name' onClick={() => getFolderById(item.id)}><div>{item.folderName}</div></div>
                                    }
                                    </List.Item>

                                )}
                            />
                        </Sider>
                        <Content className='fileManager_Content'>
                            {notes.length!=0 &&
                                <Input className='fileManager_Content__Search' placeholder="Keyword" onChange={SearchOnChange}/>
                            }
                            {notes}
                        </Content>
                        </>
                        :
                        <>  
                            <div className='fileManager_Response__Top'>
                                {backBtnShow ?
                                    <ArrowLeftOutlined onClick={back} />
                                    :
                                    <ArrowLeftOutlined onClick={null} style={{ cursor: "default", color: "#bbb" }} />
                                }
                                {notes.length!=0 &&
                                    <Input className='fileManager_Response__Top__Dropdown' placeholder="Keyword" onChange={SearchOnChange}/>
                                }
                            </div>

                            <Content className='fileManager_Response__Content'>
                                {notes}
                            </Content>
                        </>
                    }
                </Layout>
            </div>
        </>
    );
}
export default FolderDetailPage;