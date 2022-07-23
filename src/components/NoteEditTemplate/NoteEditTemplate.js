import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Steps, Layout, Row, Col, Input, Popover, message, Select, Tag, Drawer, List, Tooltip } from 'antd';
import "./NoteEditTemplate.css"
import PostEditTemplate from '../PostEditTemplate/PostEditTemplate';
import Button from '../Button/Button';
import Text from '../Text/Text';
import InformationInput from '../InformationInput/InformationInput';
import RewardInformation from './RewardInformation/RewardInformation';
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../redux/actions/pageAction";
import { CaretLeftOutlined, CheckOutlined, InfoCircleOutlined, CaretRightFilled } from "@ant-design/icons";
import MyEditor from '../MyEditor/MyEditor';
import { NoteFormat, VersionFormat, ContentFormat } from './NoteFormat';
import axios from '../axios/axios';
import VersionArea from '../VersionArea/VersionArea';
import { editor } from '../../api_utils/geditor_config';
import moment from 'moment';
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';

const { Header, Content, Sider, Footer } = Layout;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const cookieParser = new Cookie(document.cookie)


const NoteEditTemplate = (props) => {
    const [email, setEmail] = useState('')
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [information, setInformation] = useState(null);
    const [step, setStep] = useState(0);
    const [noteId, setNoteId] = useState('');
    const [myEditor, setMyEditor] = useState(<></>);

    const [tagSelected, setTagSelected] = useState([])
    const [recommendTag, setRecommendTag] = useState(['OS', 'VM', 'Pagination', 'Virtual machine'])
    //['OS', 'VM', 'Pagination', 'Virtual machine']

    const [visible, setVisible] = useState(false);
    const [popoverContent, setPopoverContent] = useState(<></>);
    const [versions, setVersions] = useState([]);
    const [isAuthor, setIsAuthor] = useState(false)
    const [noteType, setNoteType] = useState('');
    const [isSubmit, setIsSubmit] = useState(false)
    const [postInfo, setPostInfo] = useState({})
    const [drawer, setDrawer] = useState(<></>)
    const [drawerTitle, setDrawerTitle] = useState('Version')
    const [drawerPlacement, setDrawerPlacement] = useState('right')
    const [postId, setPostId] = useState('');

    const { pageStore } = useSelector((state) => state);
    const { pages } = pageStore;

    useEffect(() => {
        
        const temp = cookieParser.getCookieByName('email')
        const tempEmail = Base64.decode(temp);
        setEmail(tempEmail)
        const note = props.note;
        if(props.postId) setPostId(props.postId)
        setNoteType(note?.type)
        setIsSubmit(note?.submit)
        if(note && props.mode == 'edit'){
            if(note?.type == 'reward'){
                setPostId(note?.postId);
                axios.get(`http://localhost:8080/post/${note?.postId}/`,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                })
                .then ( res => {
                    setPostInfo(res.data.res);
                })
                .catch (err => {
                    message.error("Server Error! Please try again later. (Get Reward Post Error)")
                    console.log(err)
                }) 
            }
            setTitle(note.title);
            setMyEditor(<MyEditor noteId={note.id} version={'0'} page={props.page} email={email}/>);
            setInformation({
                school: note.school,
                department: note.department,
                subject: note.subject,
                professor: note.professor,
                downloadable: note.downloadable,
                price: note.price,
                public: note.public
            })
            setContent(note.description)
            setNoteId(note.id)
            setVersions(note.version)
            setIsAuthor(note.headerEmail == tempEmail? true:false)
            /*setPopoverContent(
                <>
                    <List
                        dataSource={note.version}
                        renderItem={(item, index) => (index !=0 && <List.Item className='versionItem' onClick={()=>saveVersion(index)}><span>{item.name}</span></List.Item>)}
                    />
                    <List.Item className='newVersion'><Input placeholder="New Version" onPressEnter={(ev) => newVersion(ev.target.value)}/></List.Item>
                </>
            )*/
            setTagSelected(note.tag)
        }
        else if(props.mode == 'new'){
            setTitle('')
            setInformation({
                school: '',
                department: '',
                subject: '',
                professor: '',
                downloadable: false,
                price: '0',
                public: true,
            });
            setContent('')
        }
        else if(props.mode == 'newReward'){
            setTitle('')
            setInformation({
                school: '',
                department: '',
                subject: '',
                professor: '',
            });
            setContent('')
            // get post info
            axios.get(`http://localhost:8080/post/${props.postId}/`,{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            })
                .then ( res => {
                    setPostInfo(res.data.res);
                })
                .catch (err => {
                    message.error("Server Error! Please try again later. (Get Post Information In Note Error)")
                    console.log(err)
                })      
        }
    },[props])

    useEffect(() => {
        setPopoverContent(
            <>
                <List
                    dataSource={versions}
                    renderItem={(item, index) => (index !=0 && 
                        <Tooltip placement='left' title={moment(item.date).format('YYYY-MM-DD HH:mm:ss')}>
                            <List.Item className='versionItem' onClick={()=>saveVersion(index)}><span>{item.name}</span></List.Item>
                        </Tooltip>
                    )}
                />
                <List.Item className='newVersion'><Input placeholder="New Version" onPressEnter={(ev) => newVersion(ev.target.value)}/></List.Item>
            </>
        )
    },[versions])
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
        if(props.mode=="edit"){
            const note = props.note;
            note.department = information.department
            note.subject = information.subject
            note.title = title
            note.professor = information.professor
            note.school = information.school
            note.downloadable = information.downloadable
            note.price = information.price
            note.description = content
            note.public = information.public

            axios.put(`http://localhost:8080/note/${note.id}`, note,{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            })
            .then(contentRes => {
                console.log(contentRes)
                setStep(1);
                message.success("You updated the information of note!")
            })
            .catch (err => {
                message.error("Server Error! Please try again later. (Update Information Of Note Error)")
                console.log(err)
            })
        }
        else if(props.mode=="new"){
            NoteFormat.type = "normal"
            NoteFormat.department = information.department
            NoteFormat.subject = information.subject
            NoteFormat.title = title
            NoteFormat.professor = information.professor
            NoteFormat.school = information.school
            NoteFormat.downloadable = information.downloadable
            NoteFormat.price = information.price
            NoteFormat.description = content
            NoteFormat.public = information.public

            axios.post(`http://localhost:8080/note/${email}/${props.folderId}`, NoteFormat,{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            })
            .then(res => {
                const tempNote = res.data.res
                console.log(tempNote)
                const tempId = tempNote.id
                setNoteId(tempId)
                VersionFormat.name = "default"
                VersionFormat.slug = "default"
                VersionFormat.content = [ContentFormat]
                axios.put(`http://localhost:8080/note/${tempId}/0`, VersionFormat,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                })
                .then ( versionRes => {
                    setMyEditor(<MyEditor noteId={tempId} version={'0'} page={props.page} email={email}/>)
                    const version = versionRes.data.res;
                    setVersions([version])
                    setStep(1);
                    message.success("You submitted the information of note!")
                })
                .catch (err => {
                    message.error("Server Error! Please try again later. (Submit Information Of Note Error)")
                    console.log(err)
                })
            })
            .catch (err => {
                console.log(err)
            })    
        }
        else if(props.mode=="newReward"){
            NoteFormat.type = "reward"
            NoteFormat.department = information.department
            NoteFormat.subject = information.subject
            NoteFormat.title = title
            NoteFormat.professor = information.professor
            NoteFormat.school = information.school
            NoteFormat.description = content

            // let cookieParser = new Cookie(document.cookie);
            // let name = cookieParser.getCookieByName('name');
            // let avatar = cookieParser.getCookieByName('avatar');

            axios.post(`http://localhost:8080/post/reward/${props.postId}/${email}`, NoteFormat,{
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                  }
            })
            .then(res => {
                const tempNote = res.data.res
                console.log(tempNote)
                const tempId = tempNote.id
                setNoteId(tempId)
                VersionFormat.name = "default"
                VersionFormat.slug = "default"
                VersionFormat.content = [ContentFormat]
                axios.put(`http://localhost:8080/note/${tempId}/0`, VersionFormat,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                })
                .then ( versionRes => {
                    setMyEditor(<MyEditor noteId={tempId} version={'0'} page={props.page} email={email}/>)
                    const version = versionRes.data.res;
                    setVersions([version])
                    setStep(1);
                    message.success("You submitted the information of note!")
                })
                .catch (err => {
                    message.error("Server Error! Please try again later. (Submit Information Of Reward Note Error)")
                    console.log(err)
                })
                // props.sendPrivateMessage(
                //     name + ' has provided answers to your reward !',
                //     'reward',
                //     email,
                //     name,
                //     avatar,
                //     props.noteId,
                //     props.rewardAuthorEmail
                // )
            })
            .catch (err => {
                console.log(err)
            })    
        }
        
    }

    const showDrawer = (type) => {
        switch(type){
            case 'version':  
                setDrawer(<VersionArea page={'NoteEditPageVersion'} versions={versions} setVersion={setVersion} isAuthor={isAuthor}/>);
                setDrawerPlacement('right'); 
                setDrawerTitle('Version')
                break;
            case 'postInfo':  
                setDrawer(
                    <RewardInformation
                        title={postInfo?.title}
                        school={postInfo?.school}
                        department={postInfo?.department}
                        subject={postInfo?.subject}
                        professor={postInfo?.professor}
                        bestPrice={postInfo?.bestPrice}
                        referencePrice={postInfo?.referencePrice}
                        referenceNumber={postInfo?.referenceNumber}
                        content={postInfo?.content}
                    />
                );
                setDrawerPlacement('left'); 
                setDrawerTitle('Reward Information');
                break;
        }
        setVisible(true);
        setVisible(true);
      };
    
      const onClose = () => {
        setVisible(false);
      };


    const setVersion = (index) => {
        axios.get(`http://localhost:8080/note/${noteId}/${index}`,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        })
            .then(res => {
                const defaultVersion = res.data.res
                defaultVersion.name = "default"
                defaultVersion.slug = "default"
                axios.put(`http://localhost:8080/note/${noteId}/0`, defaultVersion,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                })
                .then ( async versionRes => {
                    setMyEditor(<MyEditor noteId={noteId} version={'0'} page={props.page} email={email}/>)
                    setStep(0);
                    setStep(1);
                    message.success("You copied the version!")
                })
                .catch (err => {
                    message.error("Server Error! Please try again later. (Copy Version Error)")
                    console.log(err)
                })
            })
            .catch (err => {
                console.log(err)
            })    
    }
    const noteFinish = async () => {
        /*const res = createPage(title)(dispatch);
        await res.then( result => {
            setNoteId(result._id)
            setEditor(<MyEditor noteId={result._id}/>)
            }
        )*/
        setStep(2);
        
    }

    const editNote = () => {
        setStep(1);
    }

    const tagSubmit = async () => {
        axios.get(`http://localhost:8080/note/${noteId}`,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        })
            .then(res => {
                const tempNote = res.data.res
                tempNote.tag = tagSelected
                axios.put(`http://localhost:8080/note/${noteId}`, tempNote,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                })
                    .then(res => {
                        console.log(res);
                        message.success("You submitted the tags!");
                        props.setPageProps({page:'NoteDetailPage', noteId: noteId})
                    })
                    .catch (err => {
                        message.error("Server Error! Please try again later. (Submit Tag Error)")
                        console.log(err)
                    }) 
            })
            .catch (err => {
                console.log(err)
            })   
        
    }

    const recommendTagRender = (props) => {
        const { label, closable } = props;
        const onSelect = (e) => {
            e.preventDefault();
            const value = e.target.parentNode.parentNode.parentNode.innerText.length!=0? e.target.parentNode.parentNode.parentNode.innerText:e.target.parentNode.parentNode.innerText.length!=0? e.target.parentNode.parentNode.innerText:'';
            if(!tagSelected.includes(value) && value.length !=0)
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
                color={recommendTag.includes(label)?'gold':'green'}
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
        message.success("Saved")
    }

    const newVersion = (name) => {
        const versionLength = versions.length
        VersionFormat.name = name
        VersionFormat.slug = name
        VersionFormat.content = [ContentFormat]
        axios.put(`http://localhost:8080/note/${noteId}/${versionLength}`, VersionFormat,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        })
        .then ( res => {
            const version = res.data.res;
            setVersions([...versions, version])
            editor.storeVersion({}, versionLength)
            message.success("You created a new version")
        })
        .catch (err => {
            message.error("Server Error! Please try again later. (New Version Error)")
            console.log(err)
        })
    }

    const saveDefault = () => {
        editor.storeVersion({}, 0)
        message.success("Saved!")
    }

    const submitRewardNote = () => {
        axios.get(`http://localhost:8080/note/${noteId}`,{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        })
            .then(res => {
                const tempNote = res.data.res
                tempNote.tag = tagSelected
                axios.put(`http://localhost:8080/note/${noteId}`, tempNote,{
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                      }
                })
                    .then(res => {
                        axios.put(`http://localhost:8080/note/submit/${noteId}`,{},{
                            headers: {
                                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                              }
                        })
                        .then ( res => {
                            message.success("You submitted a reward note!")
                            props.setPageProps({
                                page: "NoteDetailPage",
                                noteId: noteId
                            })
                        })
                        .catch(err =>{
                            message.error("Server Error! Please try again later. (Publish Reward Note Error)")
                            console.log(err)
                        })
                    })
                    .catch (err => {
                        message.error("Server Error! Please try again later. (Submit Reward Note Error)")
                        console.log(err)
                    }) 
            })
            .catch (err => {
                message.error("Server Error! Please try again later. (Get Tags Error)")
                console.log(err)
            })   
    }

    return (   
        <div className="noteEditTemplate">
            <Layout  className="noteEditTemplate__Layout" >
                <Header className="noteEditTemplate__Header">
                    <Row className="noteEditTemplate__Row">
                        <Col className="postEditTemplate__Header__Title">
                            <Text color='black' cls='Default' content={`New Note`} fontSize='30' display="inline-block" />
                        </Col>
                    </Row>  
                    <Row className="noteEditTemplate__Row noteEditTemplate__Steps" >
                        <Steps current={step}  progressDot={customDot}>
                            <Step title="Step 1" description="Information modify" icon={<InfoCircleOutlined />}/>
                            <Step title="Step 2" description="Note edit" />
                            <Step title="Step 3" description="Tag manage" />
                        </Steps>
                    </Row>  
                </Header>
                {/* ------------------------------- Content ---------------------------------- */}
                <Content className="noteEditTemplate__Content">
                    {step==0 &&
                        <>
                            <Row className='noteEditTemplate__Row'>
                                <Col  className='postEditTemplate__Content__Label' >
                                    <Text color='black' cls='Small' content={"Title"} fontSize='22' display="inline-block" />
                                </Col>
                            </Row>
                            <Row className='noteEditTemplate__Row'>
                                <Col className='postEditTemplate__Content__Title' >
                                    <Input showCount maxLength={50} placeholder="title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                                </Col>
                            </Row>
                            <Row className='noteEditTemplate__Row'>
                                <Col  className='postEditTemplate__Content__Label' >
                                    <Text color='black' cls='Small' content={"Information"} fontSize='22' display="inline-block" />
                                </Col>
                            </Row>
                            <Row className='noteEditTemplate__Row'>
                                <Col className='postEditTemplate__Content__Information' >
                                    <InformationInput 
                                        information={information}
                                        setInformation={setInformation}
                                    />
                                </Col>
                            </Row>
                            
                            <Row className='noteEditTemplate__Row'>
                                <Col  className='postEditTemplate__Content__Label' >
                                    <Text color='black' cls='Small' content={"Description"} fontSize='22' display="inline-block" />
                                </Col>
                            </Row>
                            <Row className='noteEditTemplate__Row'>
                                <Col className='postEditTemplate__Content__Main'>
                                        <TextArea rows={10} placeholder="type something..." value={content} onChange={(ev) => setContent(ev.target.value)}/>
                                </Col>
                            </Row>
                        </> 
                    }
                    {step==1 &&
                        myEditor
                    }
                    {step==2 &&
                        <div className='noteEditTemplate__Content__Tags'>
                            <div className='noteEditTemplate__Content__Tag noteEditTemplate__Content__RecommendTag'>
                                <Text color='black' cls='Small' content={"Recommend Tags"} fontSize='20' display="inline-block" />
                                <Select
                                    dropdownClassName="noteEditTemplate__Content__Tag__List"
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
                            <div className='noteEditTemplate__Content__Tag noteEditTemplate__Content__MyTag'>
                                <Text color='black' cls='Small' content={"Your Tags"} fontSize='20' display="inline-block" />
                                <Select
                                    dropdownClassName="noteEditTemplate__Content__Tag__List"
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
                {step==0 &&
                    <Footer className="noteEditTemplate__Footer">
                        <div className="noteEditTemplate__Footer__Button" onClick={infoSubmit}>
                            <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
                {step==1 &&
                    <Footer className="noteEditTemplate__Footer">
                        {(noteType=='reward' || props.mode=='newReward')?
                        <>
                            <div className="noteEditTemplate__Footer__Button" onClick={noteFinish}>
                                <Button color={"purple"}><Text color='white' cls='Large' content={"Next"} fontSize='17' display="inline-block" /></Button>
                            </div>
                            <div className="noteEditTemplate__Footer__Button" onClick={saveDefault}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Save"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        </>
                        :
                        <>
                            <div className="noteEditTemplate__Footer__Button" onClick={noteFinish}>
                                <Button color={"purple"}><Text color='white' cls='Large' content={"Next"} fontSize='17' display="inline-block" /></Button>
                            </div>
                            <Popover 
                                content={popoverContent} 
                                title={<Text color='black' cls='Small' content={"Choose a version to save"} fontSize='17' display="inline-block" />}
                                trigger="click">
                                <div className="noteEditTemplate__Footer__Button">
                                    <Button color={"green"}><Text color='white' cls='Large' content={"Save Current Version"} fontSize='17' display="inline-block" /></Button>
                                </div>
                            </Popover>
                            <div className="noteEditTemplate__Footer__Button" onClick={() => showDrawer('version')}>
                                <Button color={"green"}><Text color='white' cls='Large' content={"Copy Version"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        </>

                        }
                        
                    </Footer>
                }
                {step==2 &&
                    <Footer className="noteEditTemplate__Footer">
                        <Text color='black' cls='Large' content={"Tip: Press enter to confirm your tag"} fontSize='15' display="inline-block" />
                        {(noteType=='reward' || props.mode=='newReward')?
                        <>
                            {isSubmit?
                            <div className="noteEditTemplate__Footer__Button" onClick={tagSubmit}>
                                <Button color={"purple"}><Text color='white' cls='Large' content={"Save"} fontSize='17' display="inline-block" /></Button>
                            </div>
                            :
                            <>
                                <div className="noteEditTemplate__Footer__Button" onClick={submitRewardNote}>
                                    <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                                </div>
                                <div className="noteEditTemplate__Footer__Button" onClick={tagSubmit}>
                                    <Button color={"purple"}><Text color='white' cls='Large' content={"Save as draft"} fontSize='17' display="inline-block" /></Button>
                                </div>
                            </>
                            }
                            
                            <div className="noteEditTemplate__Footer__Button" onClick={editNote}>
                                <Button color={"green"}><CaretLeftOutlined /><Text color='white' cls='Large' content={"Edit Note"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        </>
                        :
                        <>
                            <div className="noteEditTemplate__Footer__Button" onClick={tagSubmit}>
                                <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                            </div>
                            <div className="noteEditTemplate__Footer__Button" onClick={editNote}>
                                <Button color={"purple"}><CaretLeftOutlined /><Text color='white' cls='Large' content={"Edit Note"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        </>
                        }
                    </Footer>
                }
            </Layout>
            <Drawer title={drawerTitle} placement={drawerPlacement} onClose={onClose} visible={visible}>
                {drawer}
                {/* <VersionArea page={'NoteEditPageVersion'} versions={versions} setVersion={setVersion} isAuthor={isAuthor}/> */}
            </Drawer>
            {(noteType=='reward' || props.mode=='newReward') &&
                <div className='noteEditTemplate__PostInfo' onClick={() => showDrawer('postInfo')}>
                    <div className='noteEditTemplate__PostInfo__Title'>Reward Information</div>
                    <CaretRightFilled  className={"Ring__Avatar"} />
                </div>
            }
        </div>
    )
}

export default NoteEditTemplate