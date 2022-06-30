import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, List, Empty, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import OptionMenu from '../../OptionMenu/OptionMenu';
import { ScreenCapture } from 'react-screen-capture';

import Button from '../../Button/Button';
import Text from '../../Text/Text';
import "./PoppedContent.css";
const { Header, Content, Sider, Footer } = Layout;
const { TextArea } = Input;


const PoppedContent = (props) => {
    const { setPoppedContentShow } = props;
    const [ content, setContent ] = useState(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
    const [ startCapture, setStartCapture ] = useState(false);
    const [ applyContent, setApplyContent ] = useState('');
    
    // Screen Shot Capture
    const [screenCapture, setScreenCapture] = useState('');
    const handleScreenCapture = (screenCapture) => {
        setScreenCapture(screenCapture);
    };
    
    const handleSave = () => {
        const screenCaptureSource = screenCapture;
        const downloadLink = document.createElement('a');
        const fileName = 'react-screen-capture.png';
    
        downloadLink.href = screenCaptureSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    useEffect(()=>{
        console.log("content", props.content)
    },[props.content])

    

    return (
        <>
            {/* <div className='ScreenCapture'>
                <ScreenCapture onEndCapture={handleScreenCapture}>
                {({ onStartCapture }) => (
                    <button onClick={() => setOnStartCapture(onStartCapture)}>123456</button>
                )}
                </ScreenCapture>
            </div> */}
            <div className='poppedContent'>
                <Layout className='poppedContent__Layout__outer'>
                    <Header className='poppedContent__Header' width='100%'>
                        <CloseOutlined onClick={() => { setPoppedContentShow(false) }}/>
                        
                    </Header>
                    <Layout className='poppedContent__Layout'>
                        <Content className='poppedContent__Content'>
                            {/* <div className={`screenCapture ${startCapture && 'screenCapture--startCapture'}`}>
                                    <ScreenCapture onEndCapture={handleScreenCapture}>
                                        {({ onStartCapture }) => 
                                            {
                                                //setOnStartCapture(onStartCapture);
                                                //console.log("123");
                                                return (
                                                <>
                                                    <div className="screenCapture__Button" onClick={ () => 
                                                        {
                                                            setStartCapture(true)
                                                            onStartCapture()
                                                            //setStartCapture(false)
                                                        }}>
                                                        <Button color={"green"}><Text color='white' cls='Large' content={"Capture"} fontSize='17' display="inline-block" /></Button>
                                                    </div>
                                                    <div className="screenCapture__Button1" onClick={handleSave}>
                                                        <Button color={"green"}><Text color='white' cls='Large' content={"Download"} fontSize='17' display="inline-block" /></Button>
                                                    </div>
                                                </>
                                                )
                                            }
                                        }
                                    </ScreenCapture>
                                </div> */}
                            {!(props.page=='CollabDetailPage' && !props.isAuthor)?
                                content
                                :
                                <>
                                    <TextArea rows={4} placeholder="maxLength is 100" maxLength={100} value={applyContent} onChange={(ev) => setApplyContent(ev.target.value)}/>
                                    <div className="apply__Button" onClick={()=>props.apply(applyContent)}>
                                        <Button color={"green"}><Text color='white' cls='Large' content={"Apply"} fontSize='17' display="inline-block" /></Button>
                                    </div>
                                </>
                            }
                        </Content>
                        {(props.page=='CollabDetailPage' && props.isManager) &&
                            <Sider className='poppedContent__Sider' width='30%'>
                                
                                {/* <button onClick={onStartCapture}>Capture</button>
                                <button onClick={handleSave}>Download</button> */}
                                <List
                                    size="large"
                                    dataSource={props.content}
                                    renderItem={(item, index) => (<List.Item actions={
                                        [
                                            <OptionMenu page="CollabDetailPageApplier" email={item.wantEnterUsersEmail} index = {index} commentFromApplicant={item.commentFromApplicant} setContent={setContent} postId={props.postId}/>
                                        ]
                                    } ><span className='answerAuthor'>{item.wantEnterUsersEmail}</span></List.Item>)}
                                />
                            </Sider>
                        }
                        {!(props.page=='CollabDetailPage' && props.isAuthor) &&
                            <Sider className='poppedContent__Sider' width='20%'>
                                
                                {/* <button onClick={onStartCapture}>Capture</button>
                                <button onClick={handleSave}>Download</button> */}
                                <List
                                    size="large"
                                    dataSource={props.content}
                                    renderItem={(item, index) => (<List.Item actions={
                                        [
                                            <OptionMenu page="RewardDetailPageAnswer" answerId={item} index = {index} setContent={setContent} postId={props.postId}/>
                                        ]
                                    } ><span className='answerAuthor'>{item}</span></List.Item>)}
                                />
                            </Sider>
                        }
                    </Layout>
                </Layout>
            </div>  
        </>
    )
}

export default PoppedContent

// https://www.npmjs.com/package/react-screen-capture