import React, { useState, useEffect } from 'react'
import { Steps, Layout, Row, Col, Input, Popover, message, Select, Tag, Drawer, List } from 'antd';
import "./CollabNoteEditPage.css"
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import InformationInput from '../../components/InformationInput/InformationInput';
import { useSelector, useDispatch } from "react-redux";
import { CaretLeftOutlined, CheckOutlined, InfoCircleOutlined } from "@ant-design/icons";
import MyEditor from '../../components/MyEditor/MyEditor';
import { NoteFormat, VersionFormat, ContentFormat } from '../../components/NoteEditTemplate/NoteFormat';
import axios from '../../components/axios/axios';
import VersionArea from '../../components/VersionArea/VersionArea';
import { editor } from '../../api_utils/geditor_config';
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';


const { Header, Content, Sider, Footer } = Layout;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

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
    const { pageStore } = useSelector((state) => state);

    useEffect(() => {
        const cookieParser = new Cookie(document.cookie)
        const temp = cookieParser.getCookieByName('email')
        const tempEmail = Base64.decode(temp);
        setEmail(tempEmail)
        console.log("tempEmail", tempEmail)
        //const note = props.note;
        axios.get(`http://localhost:8080/note/${props.noteId}`)
        .then ( res => {
            console.log(res.data.res)
            const tempNote = res.data.res
            setNote(res.data.res)
            setTitle(tempNote.title);
            setMyEditor(<MyEditor noteId={props.noteId} version={'0'} page={props.page} email={tempEmail} isCollab={true}/>);
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
            if(!props.isManager){
                setStep(1)
            }
        })
        .catch(err =>{
            console.log(err)
        })
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
        message.info("Update info")
        /*const tempNote = JSON.parse(JSON.stringify(note))
        tempNote.department = information.department
        tempNote.subject = information.subject
        tempNote.title = title
        tempNote.professor = information.professor
        tempNote.school = information.school
        tempNote.downloadable = information.downloadable
        tempNote.price = information.price
        tempNote.description = content

        delete tempNote.authorUserObj
        delete tempNote.buyerUserObj
        delete tempNote.favoriterUserObj
        delete tempNote.headerUserObj
        delete tempNote.contributorUserObj
        delete tempNote.likerUserObj
        delete tempNote.managerUserObj
        console.log("tempNote:", tempNote);


        axios.put(`http://localhost:8080/note/${props.noteId}`, tempNote)
        .then(contentRes => {
            console.log(contentRes)
            setStep(1);
        })
        .catch (err => {
            console.log(err)
        })*/
        setStep(1);
    }

    const showDrawer = () => {
        setVisible(true);
      };
    
      const onClose = () => {
        setVisible(false);
      };


    const setVersion = (index) => {
        axios.get(`http://localhost:8080/note/${props.noteId}/${index}`)
            .then(res => {
                const defaultVersion = res.data.res
                defaultVersion.name = "default"
                defaultVersion.slug = "default"
                axios.put(`http://localhost:8080/note/${props.noteId}/0`, defaultVersion)
                .then ( async versionRes => {
                    setMyEditor(<MyEditor noteId={props.noteId} version={'0'} page={props.page} email={email} isCollab={true}/>)
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
        if(props.isManager){
            setStep(2);
        }
        else{
            // end
            props.setPageProps({
                page:'CollabDetail',
                postId: props.postId
            })
        }
        
        
    }

    const editNote = () => {
        setStep(1);
    }

    const tagSubmit = async () => {
        axios.get(`http://localhost:8080/note/${props.noteId}`)
            .then(res => {
                const tempNote = res.data.res
                tempNote.tag = tagSelected
                axios.put(`http://localhost:8080/note/${props.noteId}`, tempNote)
                    .then(res => {
                        console.log(res);
                        message.success("Submit!");
                        props.setPageProps({page:'PersonalPage'})
                    })
                    .catch (err => {
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
        axios.put(`http://localhost:8080/note/${props.noteId}/${versionLength}`, VersionFormat)
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
        <div className="collabNoteEditPage">
            <Layout  className="collabNoteEditPage__Layout" >
                <Header className="collabNoteEditPage__Header">
                    <Row className="collabNoteEditPage__Row">
                        <Col className="postEditTemplate__Header__Title">
                            <Text color='black' cls='Default' content={`New Note`} fontSize='30' display="inline-block" />
                        </Col>
                    </Row>  
                    {props.isManager &&
                    <Row className="collabNoteEditPage__Row collabNoteEditPage__Steps" >
                        <Steps current={step}  progressDot={customDot}>
                            <Step title="Step 1" description="Information modify" icon={<InfoCircleOutlined />}/>
                            <Step title="Step 2" description="Note edit" />
                            <Step title="Step 3" description="Tag manage" />
                        </Steps>
                    </Row>  
                    }
                </Header>
                {/* ------------------------------- Content ---------------------------------- */}
                <Content className="collabNoteEditPage__Content">
                    {step==0 &&
                        <>
                            <Row className='collabNoteEditPage__Row'>
                                <Col  className='postEditTemplate__Content__Label' >
                                    <Text color='black' cls='Small' content={"Title"} fontSize='22' display="inline-block" />
                                </Col>
                            </Row>
                            <Row className='collabNoteEditPage__Row'>
                                <Col className='postEditTemplate__Content__Title' >
                                    <Input showCount maxLength={50} placeholder="title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                                </Col>
                            </Row>
                            <Row className='collabNoteEditPage__Row'>
                                <Col  className='postEditTemplate__Content__Label' >
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
                                <Col  className='postEditTemplate__Content__Label' >
                                    <Text color='black' cls='Small' content={"Description"} fontSize='22' display="inline-block" />
                                </Col>
                            </Row>
                            <Row className='collabNoteEditPage__Row'>
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
                        <div className='collabNoteEditPage__Content__Tags'>
                            <div className='collabNoteEditPage__Content__Tag collabNoteEditPage__Content__RecommendTag'>
                                <Text color='black' cls='Small' content={"Recommend Tags"} fontSize='20' display="inline-block" />
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
                {step==0 &&
                    <Footer className="collabNoteEditPage__Footer">
                        <div className="collabNoteEditPage__Footer__Button" onClick={infoSubmit}>
                            <Button color={"purple"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
                {step==1 &&
                    <Footer className="collabNoteEditPage__Footer">
                        <div className="collabNoteEditPage__Footer__Button" onClick={noteFinish}>
                            {props.isManager? 
                            <Button color={"purple"}><Text color='white' cls='Large' content={"Next"} fontSize='17' display="inline-block" /></Button>
                            :
                            <Button color={"purple"}><Text color='white' cls='Large' content={"Finish"} fontSize='17' display="inline-block" /></Button>
                            }
                        </div>
                        <Popover 
                            content={popoverContent} 
                            title={<Text color='black' cls='Small' content={"Choose a version to save"} fontSize='17' display="inline-block" />}
                            trigger="click">
                            <div className="collabNoteEditPage__Footer__Button">
                                <Button color={"green"}><Text color='white' cls='Large' content={"Save Current Version"} fontSize='17' display="inline-block" /></Button>
                            </div>
                        </Popover>
                        <div className="collabNoteEditPage__Footer__Button" onClick={showDrawer}>
                            <Button color={"green"}><Text color='white' cls='Large' content={"Copy Version"} fontSize='17' display="inline-block" /></Button>
                        </div>
                        
                    </Footer>
                }
                {step==2 &&
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
            <Drawer title='Version' placement="right" onClose={onClose} visible={visible}>
                <VersionArea page={'NoteEditPageVersion'} versions={versions} setVersion={setVersion}/>
            </Drawer>
        </div>
    )
}

export default CollabNoteEditPage