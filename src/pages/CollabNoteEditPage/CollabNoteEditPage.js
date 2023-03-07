import React, { useState, useEffect } from 'react'
import { Steps, Layout, Row, Col, Input, Popover, message, Select, Tag, Drawer, List, Avatar, Tooltip } from 'antd';
import "./CollabNoteEditPage.css"
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import InformationInput from '../../components/InformationInput/InformationInput';
import { useSelector, useDispatch } from "react-redux";
import { CaretLeftOutlined, CheckOutlined, InfoCircleOutlined, CaretRightFilled } from "@ant-design/icons";
import MyEditor from '../../components/MyEditor/MyEditor';
import { NoteFormat, VersionFormat, ContentFormat } from '../../components/NoteEditTemplate/NoteFormat';
import axios from '../../components/axios/axios';
import VersionArea from '../../components/VersionArea/VersionArea';
import { editor } from '../../api_utils/geditor_config';
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';
import moment from 'moment';

const { Header, Content, Sider, Footer } = Layout;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const cookieParser = new Cookie(document.cookie)
//const email = "00857028@email.ntou.edu.tw";
//const folderID  = "62aee78ee913643da31b59e9";
const author = "Yao"


const CollabNoteEditPage = (props) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [information, setInformation] = useState(null);
    const [step, setStep] = useState(0);
    const [note, setNote] = useState('');
    const [myEditor, setMyEditor] = useState(<></>);

    const [tagSelected, setTagSelected] = useState([])
    const [recommendTag, setRecommendTag] = useState(['OS', 'VM', 'Pagination', 'Virtual machine'])
    //['OS', 'VM', 'Pagination', 'Virtual machine']

    const [visible, setVisible] = useState(false);
    const [popoverContent, setPopoverContent] = useState(<></>);
    const [versions, setVersions] = useState([]);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState("https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x")
    const [drawer, setDrawer] = useState(<></>)
    const [drawerTitle, setDrawerTitle] = useState('Version')
    const [drawerPlacement, setDrawerPlacement] = useState('right')
    const [queue, setQueue] = useState([])
    const [preQueue, setPreQueue] = useState([])
    const [queueDom, setQueueDom] = useState({})
    const [queueAvatar, setQueueAvatar] = useState(
        <>
            <Avatar className={"Queue__Avatar"} size={36} src="https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"></Avatar>
            <Avatar className={"Queue__Avatar"} size={36} src="https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x" ></Avatar>
            <Avatar className={"Queue__Avatar"} size={36} src="https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x" ></Avatar>
            <Avatar className={"Queue__Avatar"} size={36} src="https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x" ></Avatar>
        </>
    )
    const { pageStore } = useSelector((state) => state);

    useEffect(() => {

        const temp = cookieParser.getCookieByName('email')
        if (temp)
            var tempEmail = Base64.decode(temp);
        const tempName = cookieParser.getCookieByName('name')
        const tempAvatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"
        setEmail(tempEmail)
        setName(tempName)
        setAvatar("https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x")
        console.log("tempEmail", tempEmail)
        //const note = props.note;
        axios.get(`/note/${props.noteId}`)
            .then(res => {
                console.log(res.data.res)
                const tempNote = res.data.res
                setNote(res.data.res)
                setTitle(tempNote.title);
                if(!props.isManager){
                    message.info("not manager")
                    setMyEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={props.noteId} version={'0'} page={props.page} email={tempEmail} name={tempName} avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} isCollab={true} setQueue={setQueue} />);
                    setStep(1)
                }

                setInformation({
                    school: tempNote.school,
                    department: tempNote.department,
                    subject: tempNote.subject,
                    professor: tempNote.professor,
                    downloadable: tempNote.downloadable,
                    price: tempNote.price,
                })
                setContent(tempNote.description)
                setVersions(tempNote.version)
                setTagSelected(tempNote.tag)
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
                    message.error('Server Error! Please refresh again! (Get Note Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Get Note Error)")
                }
            })
    }, [props])

    useEffect(() => {
        setPopoverContent(
            <>
                <List
                    dataSource={versions}
                    renderItem={(item, index) => (index != 0 &&
                        <Tooltip placement='left' title={moment(item.date).format('YYYY-MM-DD HH:mm:ss')}>
                            <List.Item className='versionItem' onClick={() => saveVersion(index)}><span>{item.name}</span></List.Item>
                        </Tooltip>
                    )}
                />
                {versions.length < 6 &&
                    <List.Item className='newVersion'><Input placeholder="New Version" onPressEnter={(ev) => newVersion(ev.target.value)} /></List.Item>
                }
            </>
        )
    }, [versions])


    useEffect(() => {
        //  queue:[1,2,3,4], preQueue:[1,2], newcomer:[3,4]
        let newcomer = queue.filter(x => !preQueue.includes(x));
        // preQueue:[1,2,3,4] queue:[1,2], leaver:[3,4]
        let leaver = preQueue.filter(x => !queue.includes(x));
        setPreQueue(queue)
        if (leaver.length != 0) {
            leaver.map(userEmail => {
                setQueueDom(current => {
                    // 👇️ create copy of state object
                    const copy = { ...current };
                    // 👇️ remove salary key from object
                    delete copy[userEmail];
                    return copy;
                });
            })
        }
        if (newcomer.length != 0) {
            newcomer.map(userEmail => {
                axios.get(`/user/${userEmail}`, {
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                    }
                })
                    .then(res => {
                        const temp = queueDom;
                        temp[userEmail] = (<Tooltip title={res.data.res.name}>
                            <Avatar className={"Queue__Avatar"} size={36} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: userEmail })}></Avatar>
                        </Tooltip>)
                        setQueueDom({ ...temp });
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
                            message.error('Server Error! Please refresh again! (Get Author Information In Queue Error)')
                        }
                        else {
                            message.error("Server Error! Please try again later. (Get Author Information In Queue Error)")
                        }
                    })

            })
        }
        console.log("queue: ", queue)
        //setQueueAvatar(<></>);
    }, [queue])

    /*
    (
                        <Tooltip title={res.data.res.name}>
                            <Avatar className={"Ring__Avatar"} size={36} src={res.data.res.headshotPhoto} ></Avatar>
                        </Tooltip>
                    )
    */

    useEffect(() => {
        console.log("queueDom:", queueDom)
        setQueueAvatar(
            <>
                {Object.values(queueDom).map(item => (
                    item
                ))}
            </>

        )
    }, [queueDom])

    const customDot = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    step {index} status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );

    const infoSubmit = () => {
        if (!title) {
            message.error("Title can't be empty");
            return;
        }
        message.success("You updated the information of note")
        const tempNote = JSON.parse(JSON.stringify(note))
        tempNote.department = information.department
        tempNote.subject = information.subject
        tempNote.title = title
        tempNote.professor = information.professor
        tempNote.school = information.school
        tempNote.downloadable = information.downloadable
        tempNote.price = information.price
        tempNote.description = content

        console.log("tempNote:", tempNote);


        axios.put(`/note/${props.noteId}`, tempNote, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(contentRes => {
                console.log(contentRes)
                const temp = cookieParser.getCookieByName('email')
                const tempEmail = Base64.decode(temp);
                const tempName = cookieParser.getCookieByName('name')
                const tempAvatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"
                setMyEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={props.noteId} version={'0'} page={props.page} email={tempEmail} name={tempName} avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} isCollab={true} setQueue={setQueue} />);
                setStep(1);
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
                    message.error('Server Error! Please refresh again! (Update Note Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Update Note Error)")
                }
            })
        //setStep(1);
    }

    const showDrawer = (type) => {
        switch (type) {
            case 'version':
                setDrawer(<VersionArea setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={'NoteEditPageVersion'} id={note.id} notePublic={note.public} versions={versions} setVersions={setVersions} setVersion={setVersion} />);
                setDrawerPlacement('right');
                setDrawerTitle('Version')
                break;
            case 'chatroom':
                setDrawer(<VersionArea setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page={'NoteEditPageVersion'} versions={versions} setVersion={setVersion} />);
                setDrawerPlacement('left');
                setDrawerTitle('Chatroom');
                break;
        }
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    const setVersion = (index) => {
        axios.get(`/note/${props.noteId}/${index}`)
            .then(res => {
                const defaultVersion = res.data.res
                defaultVersion.name = "default"
                defaultVersion.slug = "default"
                axios.put(`/note/${props.noteId}/0`, defaultVersion, {
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                    }
                })
                    .then(async versionRes => {
                        setMyEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={props.noteId} version={'0'} page={props.page} email={email} name={name} avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} isCollab={true} setQueue={setQueue} />)
                        setStep(0);
                        setStep(1);
                        message.success("You changed the version!")
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
                            message.error('Server Error! Please refresh again! (Change Version Error)')
                        }
                        else {
                            message.error("Server Error! Please try again later. (Change Version Error)")
                        }
                    })
            })
            .catch(err => {
                //console.log(err)
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
                    message.error('Server Error! Please refresh again! (Get Note Versoin Error)')
                }
                else {
                    message.error('Server Error! Please try again later. (Get Note Versoin Error)')
                }
            })
    }
    const noteFinish = async () => {

        if (props.isManager) {
            props.setLoading(true);
            axios.get(`/note/tag/wordSuggestion/${note.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    console.log("suggestive tag: ", res)
                    setRecommendTag(res.data.generatedTags)
                    axios.get(`/note/plagiarism/${note.id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                        }
                    })
                        .then(plagiarismRes => {
                            editor.disconnectWS()
                            setStep(2);
                            props.setLoading(false)
                        })
                        .catch(plagiarismRrr => {
                            //console.log(err)
                            if (plagiarismRrr.response.status === 500 || plagiarismRrr.response.status === 404 || plagiarismRrr.response.status === 403) {
                                if (plagiarismRrr.response.data.message.slice(0, 13) === 'Malformed JWT') {
                                    document.cookie = 'error=Jwt'
                                    message.destroy()
                                    message.warning('The connection timed out, please login again !')
                                    document.cookie = 'email=;'
                                    props.setLoggedIn(false)
                                    props.setPageProps({ page: 'LoginPage' })
                                }
                                else
                                    document.cookie = 'error=true'
                                message.error('Server Error! Please refresh again!')
                            }
                            else {
                                message.error('Server Error! Please try again later.')
                            }
                        })
                })
                .catch(err => {
                    //console.log(err)
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
                        message.error('Server Error! Please refresh again! (Upgrade Note Recommend Tags Error)')
                    }
                    else {
                        message.error('Server Error! Please try again later. (Upgrade Note Recommend Tags Error)')
                    }
                })
        }
        else {
            // end
            props.setPageProps({
                page: 'CollabDetailPage',
                postId: props.postId
            })
        }


    }

    const editNote = () => {
        setMyEditor(<MyEditor setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} noteId={props.noteId} version={'0'} page={props.page} email={email} name={name} avatar={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} isCollab={true} setQueue={setQueue} />)
        setStep(1);
    }

    const tagSubmit = async () => {
            
            axios.put(`/note/tag/updateTags/${props.noteId}`, {"tags":tagSelected},  {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    message.success("You submitted the tags!");
                    props.setPageProps({ page: 'CollabDetailPage', postId: props.postId })
                
                })
                .catch(err => {
                    //console.log(err)
                    if (err.response.status === 500 || err.response.status === 404||err.response.status === 403){
                        if(err.response.data.message.slice(0,13)==='Malformed JWT')
                        document.cookie = 'error=Jwt'
                        else
                        document.cookie = 'error=true'
                        message.error('Server Error! Please refresh again!')
                    }
                    else{
                        message.error('Server Error! Please try again later.')
                    }
                })
    }

    const recommendTagRender = (props) => {
        const { label, closable } = props;
        const onSelect = (e) => {
            e.preventDefault();
            const value = e.target.parentNode.parentNode.parentNode.innerText.length != 0 ? e.target.parentNode.parentNode.parentNode.innerText : e.target.parentNode.parentNode.innerText.length != 0 ? e.target.parentNode.parentNode.innerText : '';
            if (!tagSelected.includes(value) && value.length != 0)
                setTagSelected([...tagSelected, value])
            // console.log(value);
            // console.log(tagSelected)
        };

        return (
            <Tag
                color={'gold'}
                closable={closable}
                onClose={onSelect}
                style={{
                    marginRight: 3,
                }}
                closeIcon={<CheckOutlined />}
            >
                {label}
            </Tag>
        );
    };
    const myTagRender = (props) => {
        const { label, closable, onClose } = props;
        return (
            <Tag
                color={recommendTag.includes(label) ? 'gold' : 'green'}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };

    const saveVersion = (index) => {
        editor.storeVersion({}, index)
        message.success("Saved!")
    }

    const newVersion = (name) => {
        const versionLength = versions.length
        VersionFormat.name = name
        VersionFormat.slug = name
        VersionFormat.content = [ContentFormat]
        axios.put(`/note/${props.noteId}/${versionLength}`, VersionFormat, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You saved current note as the new version!")
                const version = res.data.res;
                setVersions([...versions, version])
                editor.storeVersion({}, versionLength)
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
                    message.error('Server Error! Please refresh again! (Create Version Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Create Version Error)")
                }
            })
    }

    return (
        <div className="collabNoteEditPage">
            <Layout className="collabNoteEditPage__Layout" >
                <Header className="collabNoteEditPage__Header">
                    <Row className="collabNoteEditPage__Row">
                        <Col className="postEditTemplate__Header__Title">
                            <Text color='black' cls='Default' content={`New Note`} fontSize='30' display="inline-block" />
                        </Col>
                    </Row>
                    {props.isManager &&
                        <Row className="collabNoteEditPage__Row collabNoteEditPage__Steps" >
                            <Steps current={step} progressDot={customDot}>
                                <Step title="Step 1" description="Information modify" icon={<InfoCircleOutlined />} />
                                <Step title="Step 2" description="Note edit" />
                                <Step title="Step 3" description="Tag manage" />
                            </Steps>
                        </Row>
                    }
                </Header>
                {/* ------------------------------- Content ---------------------------------- */}
                <Content className="collabNoteEditPage__Content">
                    {step == 0 &&
                        <>
                            <Row className='collabNoteEditPage__Row'>
                                <Col className='postEditTemplate__Content__Label' >
                                    <Text color='black' cls='Small' content={"Title"} fontSize='22' display="inline-block" />
                                </Col>
                            </Row>
                            <Row className='collabNoteEditPage__Row'>
                                <Col className='postEditTemplate__Content__Title' >
                                    <Input showCount maxLength={50} placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                                </Col>
                            </Row>
                            <Row className='collabNoteEditPage__Row'>
                                <Col className='postEditTemplate__Content__Label' >
                                    <Text color='black' cls='Small' content={"Information"} fontSize='22' display="inline-block" />
                                </Col>
                            </Row>
                            <Row className='collabNoteEditPage__Row'>
                                <Col className='postEditTemplate__Content__Information' >
                                    <InformationInput
                                        information={information}
                                        setInformation={setInformation}
                                    />
                                </Col>
                            </Row>

                            <Row className='collabNoteEditPage__Row'>
                                <Col className='postEditTemplate__Content__Label' >
                                    <Text color='black' cls='Small' content={"Description"} fontSize='22' display="inline-block" />
                                </Col>
                            </Row>
                            <Row className='collabNoteEditPage__Row'>
                                <Col className='postEditTemplate__Content__Main'>
                                    <TextArea rows={10} placeholder="type something..." value={content} onChange={(ev) => setContent(ev.target.value)} />
                                </Col>
                            </Row>
                        </>
                    }
                    {step == 1 &&
                        myEditor
                    }
                    {step == 2 &&
                        <div className='collabNoteEditPage__Content__Tags'>
                            <div className='collabNoteEditPage__Content__Tag collabNoteEditPage__Content__RecommendTag'>
                                <Text color='black' cls='Small' content={"Recommended Tags"} fontSize='20' display="inline-block" />
                                <Select
                                    dropdownClassName="collabNoteEditPage__Content__Tag__List"
                                    defaultValue={recommendTag}
                                    tagRender={recommendTagRender}
                                    mode="tags"
                                    //size='large'
                                    style={{
                                        width: '100%',
                                    }}
                                    removeIcon={<CheckOutlined />}
                                >
                                </Select>
                            </div>
                            <div className='collabNoteEditPage__Content__Tag collabNoteEditPage__Content__MyTag'>
                                <Text color='black' cls='Small' content={"Your Tags"} fontSize='20' display="inline-block" />
                                <Select
                                    dropdownClassName="collabNoteEditPage__Content__Tag__List"
                                    mode="tags"
                                    value={tagSelected}
                                    tagRender={myTagRender}
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={(value) => setTagSelected(value)}
                                >
                                </Select>
                            </div>
                        </div>
                    }

                </Content>
                {/* ------------------------------- Footer ---------------------------------- */}
                {step == 0 &&
                    <Footer className="collabNoteEditPage__Footer">
                        <div className="collabNoteEditPage__Footer__Button" onClick={infoSubmit}>
                            <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
                {step == 1 &&
                    <Footer className="collabNoteEditPage__Footer">
                        {props.isManager ?
                            (versions.length == 1 ?
                                <Tooltip title={"You have to create a version first!"}>
                                    <div className="collabNoteEditPage__Footer__Button">
                                        <Button color={"purple--disabled"}><Text color='white' cls='Large' content={"Next"} fontSize='17' display="inline-block" /></Button>
                                    </div>
                                </Tooltip>
                                :
                                <div className="collabNoteEditPage__Footer__Button" onClick={noteFinish}>
                                    <Button color={"purple"}><Text color='white' cls='Large' content={"Next"} fontSize='17' display="inline-block" /></Button>
                                </div>
                            )
                            :
                            (versions.length == 1 ?
                                <Tooltip title={"You have to create a version first!"}>
                                    <div className="collabNoteEditPage__Footer__Button" onClick={noteFinish}>
                                        <Button color={"purple--disabled"}><Text color='white' cls='Large' content={"Finish"} fontSize='17' display="inline-block" /></Button>
                                    </div>
                                </Tooltip>
                                :
                                <div className="collabNoteEditPage__Footer__Button" onClick={noteFinish}>
                                    <Button color={"purple"}><Text color='white' cls='Large' content={"Finish"} fontSize='17' display="inline-block" /></Button>
                                </div>
                            )
                        }

                        <Popover
                            content={popoverContent}
                            title={<Text color='black' cls='Small' content={"Choose a version to save"} fontSize='17' display="inline-block" />}
                            trigger="click">
                            <div className="collabNoteEditPage__Footer__Button">
                                <Button color={"green"}><Text color='white' cls='Large' content={"Save Current Version"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        </Popover>
                        <div className="collabNoteEditPage__Footer__Button" onClick={() => showDrawer('version')}>
                            <Button color={"green"}><Text color='white' cls='Large' content={"Copy Version"} fontSize='17' display="inline-block" /></Button>
                        </div>

                    </Footer>
                }
                {step == 2 &&
                    <Footer className="collabNoteEditPage__Footer">
                        <Text color='black' cls='Large' content={"Tip: Press enter to confirm your tag"} fontSize='15' display="inline-block" />
                        <div className="collabNoteEditPage__Footer__Button" onClick={tagSubmit}>
                            <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                        <div className="collabNoteEditPage__Footer__Button" onClick={editNote}>
                            <Button color={"purple"}><CaretLeftOutlined /><Text color='white' cls='Large' content={"Edit Note"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
            </Layout>
            <Drawer title={drawerTitle} placement={drawerPlacement} onClose={onClose} visible={visible}>
                {drawer}
                {/* <VersionArea page={'NoteEditPageVersion'} versions={versions} setVersion={setVersion}/> */}
            </Drawer>
            {step == 1 &&
                <div className='collabNoteEditPage__Queue'>
                    {queueAvatar}
                    {/* <Avatar className={"Ring__Avatar"} size={36} src='https://joeschmoe.io/api/v1/james' ></Avatar>
                <Avatar className={"Ring__Avatar"} size={36} src='https://joeschmoe.io/api/v1/james' ></Avatar>
                <Avatar className={"Ring__Avatar"} size={36} src='https://joeschmoe.io/api/v1/james' ></Avatar>
                <Avatar className={"Ring__Avatar"} size={36} src='https://joeschmoe.io/api/v1/james' ></Avatar> */}
                    <CaretRightFilled className={"Ring__Avatar"} onClick={() => showDrawer('chatroom')} />
                </div>
            }
        </div>
    )
}

export default CollabNoteEditPage