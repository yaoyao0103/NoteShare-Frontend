import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { List, Skeleton, Layout, message, Avatar, Dropdown, Menu, Input, Modal, Tooltip, Popconfirm, Select } from 'antd';
import Button from '../Button/Button';
import Text from '../Text/Text';
import axios from '../axios/axios';
import { ArrowLeftOutlined, FolderAddOutlined, PlusOutlined, MoreOutlined, CloseOutlined, CheckOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import './FileManager.css';
import { Note } from '../PostEditTemplate/InfoCategories';
import OptionMenu from '../OptionMenu/OptionMenu';
import Cookie from '../Cookies/Cookies';
import Search from 'antd/lib/transfer/search';
const cookieParser = new Cookie(document.cookie)
const { Content, Sider } = Layout;
const { Option } = Select;
//const email = "00857028@email.ntou.edu.tw"
const FileManager = (props) => {
    const [files, setFiles] = useState([])
    const [posts, setPosts] = useState([])
    const [rootFolderId, setRootFolderId] = useState(null)
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
    const [originNotes, setOriginNotes] = useState([])
    
    const [width, setWindowWidth] = useState(0)
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
        async function getRootFile() {
            axios.get(`/folder/root/${props.email}`, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(folderRes => {
                    let tempRes = folderRes.data.res
                    setFiles(tempRes)
                    for(let i = 0; i < tempRes.length; i++){
                        if(tempRes[i].folderName == 'Folders') setRootFolderId(tempRes[i].id)
                    }
                    setPosts([{ folderName: 'QA Posts', value: 'QA' }, { folderName: 'Reward Posts', value: 'reward' }, { folderName: 'Collaborative Notes', value: 'collaboration' }])
                    props.setLoading(false)
                })
                .catch(err => {
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
                        message.error('Server Error! Please refresh again! (Get Root File Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Get Root File Error)")
                    }
                })

        }
        if (props.email) getRootFile();
        //setRoot([{folderName:'Buy', value:'buy'}, {folderName:'Favorite', value:'favorite'}, {folderName:'Folder', value:'folder'}, {folderName:'QnA', value:'QA'}, {folderName:'Reward', value:'reward'}, {folderName:'CollabNote',value:'collaboration'}])
    }, [props])


    useEffect(() => {
        if (copy){
            if(!parent){
                onClickFolderZone(rootFolderId);
                message.info("Please go to the folder you want to add, then click confirm button", 0)
            }
            else{
                message.info("Please go to the folder you want to copy, then click confirm button", 0)
            }
        }
        if (move)
            message.info("Please go to the folder you want to move, then click confirm button", 0)
    }, [copy, move])

    const onClickFolderZone = (folderId) => {
        props.setLoading(true)
        setCurrent(folderId)
        setBackBtnShow(true);
        axios.get(`/folder/${folderId}`, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log(res.data.res)
                setFiles(res.data.res.children)
                console.log("child", res.data.res.children)
                setPostShow(false)
                const parentId = res.data.res.parent
                const tempNotes = res.data.res.notes;
                setOriginNotes(tempNotes)
                const tempPath = res.data.res.path;
                setPath(tempPath)
                tempPath.split('/')[1] == 'Folders' ? setInFolder(true) : setInFolder(false)
                if (parentId) {
                    console.log("parentId:", parentId)
                    setParent(parentId)
                }
                console.log("tempNotes", tempNotes);
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
                                        tempPath.split('/')[1] == 'Folders' &&
                                        [<OptionMenu setLoggedIn={props.setLoggedIn} page={props.page} id={item.id} setPageProps={props.setPageProps} setCopy={setCopy} type={"note"} folderId={folderId} rerenderNotes={() => onClickFolderZone(folderId)} />]
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

    const onClickPostZone = (value) => {
        props.setLoading(true)
        axios.get(`/post/${props.email}/${value}`, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log(res.data.res)
                setFiles([])
                setPostShow(false)
                setBackBtnShow(true);
                const tempPosts = res.data.res;
                setOriginNotes(tempPosts)
                if (tempPosts.length > 0) {
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
                                                <Avatar src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} />
                                            </Tooltip>
                                        }
                                        title={item.title}
                                        description={item.content.substring(0, 120) + '...'}
                                        onClick={() => onClickPost(item.type, item.id)}
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
                    message.error('Server Error! Please refresh again! (Enter Post Folder Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Enter Post Folder Error)")
                }
            })
    }

    const onClickAllNotes = () => {
        props.setLoading(true)
        axios.get(`/note/all/${props.email}`, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                setFiles([])
                setPostShow(false)
                setBackBtnShow(true);
                const tempNotes = res.data.res.reverse()
                setOriginNotes(tempNotes)
                console.log("tempNotes", tempNotes)
                const tempCurrent = null
                setNotes(
                    <List
                        className="fileManage_Note fileManage_List"
                        itemLayout="horizontal"
                        dataSource={tempNotes}
                        renderItem={(item, index) => (
                            <List.Item
                                className="fileManage_Note_Item fileManage_List_Item"
                                actions={[<OptionMenu setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={props.page} id={item.id} allNote={true} setCopy={setCopy} type={"note"} folderId={tempCurrent} rerenderNotes={() => onClickFolderZone(tempCurrent)} />]}
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
                props.setLoading(false)
            })
            .catch(err => {
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
                    message.error('Server Error! Please refresh again! (Get Root File Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get Root File Error)")
                }
            })
    }

    const onClickNote = (id) => {
        props.setPageProps({
            noteId: id,
            page: 'NoteDetailPage'
        })
    }

    const onClickPost = (type, id) => {
        switch (type) {
            case 'reward': props.setPageProps({
                postId: id,
                page: 'RewardDetailPage'
            }); break;
            case 'QA': props.setPageProps({
                postId: id,
                page: 'QnADetailPage'
            }); break;
            case 'collaboration': props.setPageProps({
                postId: id,
                page: 'CollabDetailPage'
            }); break;
        }

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
                    setPostShow(false)
                    const parentId = res.data.res.parent
                    setParent(parentId)
                    const path = res.data.res.path;
                    setPath(path);
                    path.split('/')[1] == 'Folders' ? setInFolder(true) : setInFolder(false)
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
                                        actions={[<OptionMenu setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={props.page} id={item.id} setCopy={setCopy} type={"note"} folderId={tempCurrent} rerenderNotes={() => onClickFolderZone(tempCurrent)} />]}
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
            if(copy || move){
                setCopy(null)
                setMove(null);
                message.destroy();
                message.warn("Cancel!")
            } 
            axios.get(`/folder/root/${props.email}`, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    console.log(res.data.res);
                    setFiles(res.data.res);
                    setPostShow(true)
                    setBackBtnShow(false);
                    setOriginNotes([])
                    setNotes([])
                    setInFolder(false)
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

    const createFolder = (name) => {
        const data = {
            folderName: name,
            parent: current,
            path: path + `/${name}`,
            public: true,

        }
        if (!name) {
            message.warn("The folder name cannot be empty!")
            return;
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].folderName === name) {
                message.warn("The folder name is exist!")
                return;
            }
        }
        props.setLoading(true)
        //console.log("path", data)
        axios.post(`/folder/${props.email}`, data, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log(res.data.res);
                onClickFolderZone(current)
                setNewFolder(false)
                //message.success("You created a folder!")
            })
            .catch(err => {
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
                    message.error('Server Error! Please refresh again! (Create Folder Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Create Folder Error)")
                }
            })
    }

    const deleteFolder = (folderId) => {
        props.setLoading(true)
        axios.delete(`/folder/${props.email}/${folderId}`, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log(res);
                onClickFolderZone(current)
                props.setLoading(false)
                message.success("You deleted a folder!")
            })
            .catch(err => {
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
                    message.error('Server Error! Please refresh again! (Delete Folder Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Delete Folder Error)")
                }
            })
    }

    const renameFolder = (folderId, newName) => {
        if (newName == '') {
            message.warn("The folder name cannot be empty!")
            return;
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].folderName == newName) {
                message.warn("The folder name is exist!")
                return;
            }
        }
        props.setLoading(true)
        axios.put(`/folder/rename/${props.email}/${folderId}/${newName}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                //message.success("You renamed a folder")
                setRenaming(false)
                onClickFolderZone(current)
                props.setLoading(false)
            })
            .catch(err => {
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
                    message.error('Server Error! Please refresh again! (Rename Folder Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Rename Folder Error)")
                }
            })
    }



    const createMenu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a onClick={() => {
                            props.setPageProps({
                                folderId: current,
                                action: "new",
                                page: 'NoteNewPage'
                            })
                        }} style={{ textDecoration: "none" }}>Note</a>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Link to={'/CollabEditPage/new/0'} style={{ textDecoration: "none" }}>Collaboration Note</Link>
                    ),
                    disabled: true
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
        axios.put(`/note/save/${copy}/${current}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You copied a note!")
                onClickFolderZone(current)
                setCopy(null)
                props.setLoading(false)
            })
            .catch(err => {
                setCopy(null)
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
                    message.error('Server Error! Please refresh again! (Copy Note Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Copy Note Error)")
                }
            })

    }

    const moveFolder = () => {
        message.destroy();
        props.setLoading(true)
        const data = {
            path: path + '/' + move.folderName,
            parent: current,
        }

        axios.put(`/folder/save/${props.email}/${move.folderId}`, data, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                onClickFolderZone(current)
                setMove(null)
                message.success("You moved a folder!")
            })
            .catch(err => {
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
                    message.error('Server Error! Please refresh again! (Move Folder Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Move Folder Error)")
                }
            })
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
                                            path.split('/')[1] == 'Folders' &&
                                            [<OptionMenu setLoggedIn={props.setLoggedIn} page={props.page} id={item.id} setPageProps={props.setPageProps} setCopy={setCopy} type={"note"} folderId={current} rerenderNotes={() => onClickFolderZone(current)} />]
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

    const setFolderPublic = (index, folderId) => {
        const tempFolders = files;
        console.log(tempFolders[index])
        tempFolders[index].public = !tempFolders[index].public;
        setFiles([...tempFolders])

        axios.put(`/folder/public/${folderId}`, {} , {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("Success!")
            })
            .catch(err => {
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
                    message.error('Server Error! Please refresh again! (Move Folder Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Move Folder Error)")
                }
            })
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
                                {inFolder &&
                                    <>
                                        <FolderAddOutlined onClick={() => setNewFolder(true)} />
                                        <Dropdown overlay={createMenu} placement="bottomLeft" arrow>
                                            <PlusOutlined />
                                        </Dropdown>
                                        {(copy || move) &&
                                            <>
                                                <button className='copy_Button confirm_Button' onClick={copy ? copyNote : moveFolder}>
                                                    <CheckOutlined />
                                                </button>
                                                <button className='copy_Button cancel_Button' onClick={() => {
                                                    setCopy(null);
                                                    setMove(null);
                                                    message.destroy();
                                                    message.warn("Cancel!")
                                                }
                                                }>
                                                    <CloseOutlined />
                                                </button>
                                            </>
                                        }

                                    </>}
                            </div>
                            <>
                                {postShow &&
                                    <List>
                                        <List.Item
                                            className={"fileManage_Folder_Item fileManage_List_Item"}
                                        //onClick={()=> onClickFolderZone(item.id)}
                                        >
                                            <div className='fileManage_Folder_Item_Name' onClick={() => onClickAllNotes()}>All Notes</div>
                                        </List.Item>
                                    </List>
                                }

                                <List
                                    className="fileManage_Folder fileManage_List"
                                    itemLayout="horizontal"
                                    dataSource={files}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            className={renaming == item.id ? "fileManage_Folder_Item fileManage_List_Item_NoHover" : "fileManage_Folder_Item fileManage_List_Item"}
                                        //onClick={()=> onClickFolderZone(item.id)}
                                        >


                                            {renaming == item.id ? <Input placeholder='New Folder Name' bordered={false} onPressEnter={(ev) => renameFolder(item.id, ev.target.value)} className="fileManage_Folder_Item_Input" addonAfter={<CloseOutlined onClick={() => setRenaming(false)} />} /> : <div className='fileManage_Folder_Item_Name' onClick={() => onClickFolderZone(item.id)}><div>{item.folderName}</div></div>}

                                            {renaming != item.id && inFolder &&
                                                <>  
                                                    <div style={item.public?{marginRight:'0.6em', color: "green"}:{marginRight:'0.6em', color: "red"}}>{item.public?"Public":"Private"}</div>
                                                    <Dropdown 
                                                        overlay={<Menu
                                                        items={[
                                                            {
                                                                key: '1',
                                                                label: (
                                                                    <a onClick={() => setRenaming(item.id)} style={{ textDecoration: "none" }}>Rename</a>
                                                                ),
                                                            },
                                                            {
                                                                key: '2',
                                                                label: (
                                                                    <a onClick={() => setMove({ folderId: item.id, folderName: item.folderName })} style={{ textDecoration: "none" }}>Move</a>
                                                                ),
                                                            },
                                                            {
                                                                key: '3',
                                                                label: (
                                                                    <a onClick={() => setFolderPublic(index, item.id)} style={{ textDecoration: "none"}}>{item.public?"Set Private":"Set Public"}</a>
                                                                ),
                                                            },
                                                            {
                                                                key: '4',
                                                                label: (
                                                                    <Popconfirm
                                                                        title="Are you sure to delete the folder?"
                                                                        okText="Yes"
                                                                        cancelText="No"
                                                                        onConfirm={() => {
                                                                            deleteFolder(item.id);
                                                                        }}>
                                                                        <a style={{ textDecoration: "none", color: "red" }}>Delete</a>
                                                                    </Popconfirm>
                                                                ),
                                                            }
                                                        ]}
                                                    />} placement="bottomLeft" arrow>
                                                        <MoreOutlined />
                                                    </Dropdown>
                                                </>
                                            }
                                        </List.Item>

                                    )}
                                />
                                {newFolder &&
                                    <List.Item className="fileManage_Folder_Item fileManage_List_Item_NoHover">
                                        <Input placeholder='New Folder Name' bordered={false} onPressEnter={(ev) => createFolder(ev.target.value)} className="fileManage_Folder_Item_Input" addonAfter={<CloseOutlined onClick={() => setNewFolder(false)} />} />
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
                                            onClick={() => onClickPostZone(item.value)}
                                        >
                                            <div className='fileManage_Folder_Item_Name' ><div>{item.folderName}</div></div>
                                        </List.Item>
                                    )}
                                />
                            }
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
                                <Select placeholder={"Select an Area"} className="fileManager_Response__Top__Dropdown" onChange={(item) => {
                                    let flag = false; 
                                    switch(item){
                                        case "QA": case "reward": case "collaboration": 
                                            onClickPostZone(item);
                                            flag = true;
                                            break;
                                        case "All Notes":
                                            onClickAllNotes();
                                            flag = true;
                                            break;
                                    }
                                    if(!flag && !inFolder){
                                        props.setLoading(true)
                                        axios.get(`/folder/root/${props.email}`, {
                                            headers: {
                                                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                                            }
                                        })
                                        .then(folderRes => {
                                            let temp = folderRes.data.res;
                                            console.log(temp);
                                            for(let i = 0; i < temp.length; i++){
                                                if(temp[i].folderName == item){
                                                    onClickFolderZone(temp[i].id)
                                                    break;
                                                }
                                            }
                                            setFiles(temp)
                                            console.log(temp)
                                            props.setLoading(false)
                                        })
                                        .catch(err => {
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
                                                message.error('Server Error! Please refresh again! (Get Root File Error)')
                                            }
                                            else {
                                                message.error("Server Error! Please try again later. (Get Root File Error)")
                                            }
                                        })
                                    }
                                    if(inFolder){
                                        onClickFolderZone(item)
                                    }
                                }}>
                                    {inFolder?
                                    
                                        files.map((folder) => (
                                            <Option key={folder.id}>{folder.folderName}</Option>
                                        )):
                                        <>
                                            <Option key={"All Notes"}>{"All Notes"}</Option>
                                            <Option key={"Buy"}>{"Owned"}</Option>
                                            <Option key={"Favorite"}>{"Favorites"}</Option>
                                            <Option key={"Folder"}>{"Folders"}</Option>
                                            <Option key={"Temp Reward Note"}>{"Draft Reward Notes"}</Option>
                                            <Option key={"QA"}>{"QA Posts"}</Option>
                                            <Option key={"reward"}>{"Reward Posts"}</Option>
                                            <Option key={"collaboration"}>{"Collaborative Notes"}</Option>
                                        </>
                                    }
                                </Select>
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
export default FileManager;