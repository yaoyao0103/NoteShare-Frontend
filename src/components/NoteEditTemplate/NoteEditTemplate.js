import React, { useState, useEffect } from 'react'
import { Steps, Layout, Row, Col, Input, Popover, message, Select, Tag, Drawer, List } from 'antd';
import "./NoteEditTemplate.css"
import PostEditTemplate from '../PostEditTemplate/PostEditTemplate';
import Button from '../Button/Button';
import Text from '../Text/Text';
import InformationInput from '../InformationInput/InformationInput';
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../redux/actions/pageAction";
import { CaretLeftOutlined, CheckOutlined, InfoCircleOutlined } from "@ant-design/icons";
import MyEditor from '../MyEditor/MyEditor';
import { NoteFormat, VersionFormat, ContentFormat } from './NoteFormat';
import axios from '../axios/axios';
import VersionArea from '../VersionArea/VersionArea';
import { editor } from '../../api_utils/geditor_config';
const { Header, Content, Sider, Footer } = Layout;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const email = "00857028@email.ntou.edu.tw";
const folderID  = "62aee78ee913643da31b59e9";
const author = "Yao"


const NoteEditTemplate = (props) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [information, setInformation] = useState(null);
    const [step, setStep] = useState(0);
    const [noteId, setNoteId] = useState(null);
    const [myEditor, setMyEditor] = useState(<></>);
    const [tagSelected, setTagSelected] = useState([])
    const [visible, setVisible] = useState(false);
    const [popoverContent, setPopoverContent] = useState(<></>);
    const [versions, setVersions] = useState([]);
    const dispatch = useDispatch();
    const { pageStore } = useSelector((state) => state);
    const { pages } = pageStore;

    useEffect(() => {
        const note = props.note;
        if(note && props.mode == 'Edit'){
            setTitle(note.title);
            setMyEditor(<MyEditor noteId={note.id} version={'0'} page={props.page}/>);
            setInformation({
                school: note.school,
                department: note.department,
                subject: note.subject,
                professor: note.professor,
                downloadable: note.downloadable,
                price: note.price,
            })
            setNoteId(note.id)
        }
        else{
            setInformation({
                school: '',
                department: '',
                subject: '',
                professor: '',
                downloadable: false,
                price: '0',
            });
        }
        setVersions(props.note?.version)
        setPopoverContent(
            <>
                <List
                    dataSource={props.note?.version}
                    renderItem={(item, index) => (index !=0 && <List.Item className='versionItem' onClick={()=>saveVersion(index)}><span>{item.name}</span></List.Item>)}
                />
                <List.Item className='newVersion'><Input placeholder="New Version" onPressEnter={(ev) => newVersion(ev.target.value)}/></List.Item>
            </>
        )
    },[props])

    useEffect(() => {
        setPopoverContent(
            <>
                <List
                    dataSource={versions}
                    renderItem={(item, index) => (index !=0 && <List.Item className='versionItem' onClick={()=>saveVersion(index)}><span>{item.name}</span></List.Item>)}
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
        if(props.mode=="Edit"){
            message.info("Update info")
            const note = props.note;
            note.department = information.department
            note.subject = information.subject
            note.title = title
            note.professor = information.professor
            note.school = information.school
            note.downloadable = information.downloadable
            note.price = information.price
            axios.put(`http://localhost:8080/note/${note.id}`, note)
            .then(res => {
                setStep(1);
            })
            .catch (err => {
                console.log(err)
            })
        }
        else{
            NoteFormat.type = "normal"
            NoteFormat.department = information.department
            NoteFormat.subject = information.subject
            NoteFormat.title = title
            NoteFormat.headerEmail = email
            NoteFormat.headerName = author
            NoteFormat.authorEmail = [email]
            NoteFormat.authorName = [author]
            NoteFormat.managerEmail = email
            NoteFormat.professor = information.professor
            NoteFormat.school = information.school
            NoteFormat.downloadable = information.downloadable
            NoteFormat.price = information.price

            axios.post(`http://localhost:8080/note/${email}/${folderID}`, NoteFormat)
            .then(res => {
                console.log(res.data.res.id)
                const id = res.data.res.id
                setNoteId(id)
                VersionFormat.name = "default"
                VersionFormat.slug = "default"
                VersionFormat.content = [ContentFormat]
                axios.put(`http://localhost:8080/note/${id}/0`, VersionFormat)
                .then ( async versionRes => {
                    setMyEditor(<MyEditor noteId={id} version={'0'} page={props.page}/>)
                    setStep(1);
                })
                .catch (err => {
                    console.log(err)
                })
            })
            .catch (err => {
                console.log(err)
            })    
        }
        
    }

    const showDrawer = () => {
        setVisible(true);
      };
    
      const onClose = () => {
        setVisible(false);
      };


    const setVersion = (index) => {
        axios.get(`http://localhost:8080/note/${noteId}/${index}`)
            .then(res => {
                const defaultVersion = res.data.res
                defaultVersion.name = "default"
                defaultVersion.slug = "default"
                axios.put(`http://localhost:8080/note/${noteId}/0`, defaultVersion)
                .then ( async versionRes => {
                    setMyEditor(<MyEditor noteId={noteId} version={'0'} page={props.page}/>)
                    setStep(0);
                    setStep(1);
                })
                .catch (err => {
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
        /*const res = createPage(title)(dispatch);
        await res.then( result => {
            setNoteId(result._id)
            setEditor(<MyEditor noteId={result._id}/>)
            }
        )*/
        
    }
    const recommendTag = ['OS', 'VM', 'Pagination', 'Virtual machine']

    const recommendTagRender = (props) => {
        const { label, closable } = props;
        const onSelect = (e) => {
            e.preventDefault();
            const value = e.target.parentNode.parentNode.parentNode.innerText.length!=0? e.target.parentNode.parentNode.parentNode.innerText:e.target.parentNode.parentNode.innerText.length!=0? e.target.parentNode.parentNode.innerText:'';
            if(!tagSelected.includes(value) && value.length !=0)
                setTagSelected([...tagSelected, value])
            console.log(value);
            console.log(tagSelected)
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
        console.log(editor)
        editor.storeVersion({}, index)
        message.success("Saved")
    }

    const newVersion = (name) => {
        const versionLength = props.note?.version.length;
        VersionFormat.name = name
        VersionFormat.slug = name
        VersionFormat.content = [ContentFormat]
        axios.put(`http://localhost:8080/note/${noteId}/${versionLength}`, VersionFormat)
        .then ( res => {
            message.success("Saved")
            const version = res.data.res;
            setVersions([...versions, version])
            editor.storeVersion({}, versionLength)
        })
        .catch (err => {
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
                                    <Input showCount maxLength={20} placeholder="title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
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
                {step==0 &&
                    <Footer className="noteEditTemplate__Footer">
                        <div className="noteEditTemplate__Footer__Button" onClick={infoSubmit}>
                            <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
                {step==1 &&
                    <Footer className="noteEditTemplate__Footer">
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
                        <div className="noteEditTemplate__Footer__Button" onClick={showDrawer}>
                            <Button color={"green"}><Text color='white' cls='Large' content={"Copy Version"} fontSize='17' display="inline-block" /></Button>
                        </div>
                        
                    </Footer>
                }
                {step==2 &&
                    <Footer className="noteEditTemplate__Footer">
                        <Text color='black' cls='Large' content={"Tip: Press enter to confirm your tag"} fontSize='15' display="inline-block" />
                        <div className="noteEditTemplate__Footer__Button" onClick={tagSubmit}>
                            <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                        <div className="noteEditTemplate__Footer__Button" onClick={editNote}>
                            <Button color={"purple"}><CaretLeftOutlined /><Text color='white' cls='Large' content={"Edit Note"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
            </Layout>
            <Drawer title='Version' placement="right" onClose={onClose} visible={visible}>
                <VersionArea page={'NoteEditPageVersion'} versions={props.note?.version} setVersion={setVersion}/>
            </Drawer>
        </div>
    )
}

export default NoteEditTemplate