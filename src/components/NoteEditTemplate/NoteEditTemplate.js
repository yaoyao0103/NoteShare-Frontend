import React, { useState, useEffect } from 'react'
import { Steps, Layout, Row, Col, Input, Popover, message } from 'antd';
import "./NoteEditTemplate.css"
import PostEditTemplate from '../PostEditTemplate/PostEditTemplate';
import Button from '../Button/Button';
import Text from '../Text/Text';
import InformationInput from '../InformationInput/InformationInput';
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../redux/actions/pageAction";
import { CopyOutlined , EditOutlined, CommentOutlined, CheckOutlined, CloseOutlined, ShareAltOutlined, InboxOutlined, DeleteOutlined, EyeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import MyEditor from '../MyEditor/MyEditor';
const { Header, Content, Sider, Footer } = Layout;
const { Step } = Steps;
const { TextArea } = Input;

const NoteEditTemplate = (props) => {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [information, setInformation] = useState(null);
    const [step, setStep] = useState(0);
    const [noteId, setNoteId] = useState(null);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const { pageStore } = useSelector((state) => state);
    const { pages } = pageStore;

    useEffect(() => {
        const post = props.post;
        if(post && props.mode == 'Edit'){
            setTitle(post.title);
            setContent(post.content);
            setInformation({
                school: post.school,
                department: post.department,
                subject: post.subject,
                professor: post.professor,
                downloadable: post.downloadable,
                price: post.price,
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
        const res = createPage(title)(dispatch);
        await res.then( result => {
            setNoteId(result._id)
            setEditor(<MyEditor noteId={result._id}/>)
            }
        )
        setStep(1);
        
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
                            <Step title="Information" icon={<InfoCircleOutlined />}/>
                            <Step title="Editor" description="Note editing phase" />
                            <Step title="Tag" description="Tag manage phase" />
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
                            {/* Footer */}
                            <Footer className="noteEditTemplate__Footer">
                                <div className="noteEditTemplate__Footer__Button" onClick={infoSubmit}>
                                    <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                                </div>
                            </Footer>
                        </> 
                    }
                    {step==1 &&
                        editor
                    }
                </Content>
                
            </Layout>
        </div>
    )
}

export default NoteEditTemplate