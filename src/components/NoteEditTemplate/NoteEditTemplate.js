import React, { useState, useEffect } from 'react'
import { Steps, Layout, Row, Col, Input, Popover, message, Select, Tag } from 'antd';
import "./NoteEditTemplate.css"
import PostEditTemplate from '../PostEditTemplate/PostEditTemplate';
import Button from '../Button/Button';
import Text from '../Text/Text';
import InformationInput from '../InformationInput/InformationInput';
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../redux/actions/pageAction";
import { CaretLeftOutlined, CheckOutlined, InfoCircleOutlined } from "@ant-design/icons";
import MyEditor from '../MyEditor/MyEditor';
const { Header, Content, Sider, Footer } = Layout;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const NoteEditTemplate = (props) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [information, setInformation] = useState(null);
    const [step, setStep] = useState(2);
    const [noteId, setNoteId] = useState(null);
    const [editor, setEditor] = useState(null);
    const [tagSelected, setTagSelected] = useState([])
    const dispatch = useDispatch();
    const { pageStore } = useSelector((state) => state);
    const { pages } = pageStore;

    useEffect(() => {
        const note = props.note;
        if(note && props.mode == 'Edit'){
            setTitle(note.title);
            setEditor(<MyEditor noteId={note._id}/>);
            setInformation({
                school: note.school,
                department: note.department,
                subject: note.subject,
                professor: note.professor,
                downloadable: note.downloadable,
                price: note.price,
            })
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
    },[props])

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

    const infoSubmit = async () => {
        if (!title) {
            message.error("Title can't be empty");
            return;
        }
        if(props.mode=="Edit"){
            message.info("Update info")
        }
        else{
            const res = createPage(title)(dispatch);
            await res.then( result => {
            setNoteId(result._id)
            setEditor(<MyEditor noteId={result._id}/>)
                }
            )
            setStep(1);
        }
        //setStep(1);
        
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
                        {editor}
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
                            <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
                {step==1 &&
                    <Footer className="noteEditTemplate__Footer">
                        <div className="noteEditTemplate__Footer__Button" onClick={noteFinish}>
                            <Button color={"green"}><Text color='white' cls='Large' content={"Next"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
                {step==2 &&
                    <Footer className="noteEditTemplate__Footer">
                        <Text color='black' cls='Large' content={"Tip: Press enter to confirm your tag"} fontSize='15' display="inline-block" />
                        <div className="noteEditTemplate__Footer__Button" onClick={tagSubmit}>
                            <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                        </div>
                        <div className="noteEditTemplate__Footer__Button" onClick={editNote}>
                            <Button color={"green"}><CaretLeftOutlined /><Text color='white' cls='Large' content={"Edit Note"} fontSize='17' display="inline-block" /></Button>
                        </div>
                    </Footer>
                }
            </Layout>
        </div>
    )
}

export default NoteEditTemplate