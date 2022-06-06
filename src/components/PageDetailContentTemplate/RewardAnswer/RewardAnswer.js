import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, List, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import OptionMenu from '../../OptionMenu/OptionMenu';
import ContentEditor from '../../../pages/NoteDetailPage/ContentEditor/ContentEditor';
import { ScreenCapture } from 'react-screen-capture';

import Button from '../../Button/Button';
import Text from '../../Text/Text';
import "./RewardAnswer.css";
const { Header, Content, Sider, Footer } = Layout;


const RewardAnswer = (props) => {
    const { setAnswerShow } = props;
    const [answerNote, setAnswerNote] = useState(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);

    
    const setAnswer = (id) => {
        setAnswerNote(<ContentEditor versionId = {id}/>)
    }
    /* 
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
    */

    return (
        <>
            {/* <div className='ScreenCapture'>
                <ScreenCapture onEndCapture={handleScreenCapture}>
                {({ onStartCapture }) => (
                    <button onClick={() => setOnStartCapture(onStartCapture)}>123456</button>
                )}
                </ScreenCapture>
            </div> */}
            <div className='rewardAnswer'>
                <Layout className='rewardAnswer__Layout__outer'>
                    <Header className='rewardAnswer__Header' width='100%'>
                        <CloseOutlined onClick={() => { setAnswerShow(false) }}/>
                        
                    </Header>
                    <Layout className='rewardAnswer__Layout'>
                        <Content className='rewardAnswer__Content'>{answerNote}</Content>
                        <Sider className='rewardAnswer__Sider' width='20%'>
                        {/* <button onClick={null}>Capture</button>
                        <button onClick={handleSave}>Download</button> */}
                            <List
                                size="large"
                                dataSource={props.answer}
                                renderItem={(item, index) => (<List.Item actions={
                                    [
                                        <OptionMenu page={"RewardDetailPageAnswer"} id={item} index = {index} answer={props.answer} setAnswer={setAnswer}/>
                                    ]
                                } ><span className='answerAuthor'>{item}</span></List.Item>)}
                            />
                        </Sider>
                    </Layout>
                </Layout>
            </div>  
        </>
    )
}

export default RewardAnswer

// https://www.npmjs.com/package/react-screen-capture