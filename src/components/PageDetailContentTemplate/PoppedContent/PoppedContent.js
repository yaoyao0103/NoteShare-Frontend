import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, List, Empty, Input, Avatar, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import OptionMenu from '../../OptionMenu/OptionMenu';
import { ScreenCapture } from 'react-screen-capture';
import axios from '../../axios/axios';

import Button from '../../Button/Button';
import Text from '../../Text/Text';
import "./PoppedContent.css";
import { set } from 'react-hook-form';
const { Header, Content, Sider, Footer } = Layout;
const { TextArea } = Input;


const PoppedContent = (props) => {
    const { setPoppedContentShow } = props;
    const [ content, setContent ] = useState(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
    const [ startCapture, setStartCapture ] = useState(false);
    const [ applyContent, setApplyContent ] = useState('');
    const [ siderList, setSiderList ] = useState([])
    
    // Screen Shot Capture
    const [screenCapture, setScreenCapture] = useState('');

    useEffect(()=>{
        setSiderList(props.content)
    },[props])

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

    const approve = (email) => {
        axios.put(`http://localhost:8080/post/add/${props.postId}/${email}`)
        .then ( res => {
            message.success("Agree!!")
            const tempList = new Array();
            for(let i = 0; i < siderList.length; i++){
                if(siderList[i].userObj.userObjEmail != email){
                    tempList.push(siderList[i])
                }
            }
            setSiderList(tempList)
            setContent()
        })
        .catch(err =>{
            console.log(err)
        })
      }
  
      const reject = (email) => {
        axios.delete(`http://localhost:8080/post/apply/${props.postId}/${email}`)
        .then ( res => {
            message.success("reject!!")
            const tempList = new Array();
            console.log("siderList", siderList)
            for(let i = 0; i < siderList.length; i++){
                if(siderList[i].userObj.userObjEmail != email){
                    tempList.push(siderList[i])
                }
            }
            setSiderList(tempList)
            setContent()
            // Todo: remove applicant from list
        })
        .catch(err =>{
            console.log(err)
        })
      }

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
                                props.haveApplied?
                                <div className='apply_Form'>
                                    <Text color='black' cls='Small' content={"Message:"} fontSize='22' display="inline-block" />
                                    <TextArea disabled={true} rows={4} value={props.haveApplied} />
                                    <div className="poppedContent__Tip">
                                        <Text color='black' cls='Small' content={"You have been applied!!"} fontSize='16' display="inline-block" />
                                    </div>
                                </div>
                                :
                                <div className='apply_Form'>
                                    <Text color='black' cls='Small' content={"Message:"} fontSize='22' display="inline-block" />
                                    <TextArea rows={4} placeholder="maxLength is 100" maxLength={100} value={applyContent} onChange={(ev) => setApplyContent(ev.target.value)}/>
                                    <div className="apply__Button" onClick={()=> {props.apply(applyContent); setPoppedContentShow(false); props.setHaveApplied(applyContent);}}>
                                        <Button color={"green"}><Text color='white' cls='Large' content={"Apply"} fontSize='17' display="inline-block" /></Button>
                                    </div>
                                </div>
                            }
                        </Content>
                        {(props.page=='CollabDetailPage' && props.isManager) &&
                            <Sider className='poppedContent__Sider' width='30%'>
                                
                                {/* <button onClick={onStartCapture}>Capture</button>
                                <button onClick={handleSave}>Download</button> */}
                                <List
                                    size="large"
                                    dataSource={siderList}
                                    renderItem={(item, index) => (<List.Item 
                                        className="poppedContent__Sider__Item"
                                        onClick={() => setContent(
                                            <div className="commentFromApplicant">
                                                <div className="commentFromApplicantLabel">
                                                    <Text color='black' cls='Default' content={"Message:"} fontSize='28' display="inline-block" />
                                                </div>
                                                <div className="commentFromApplicantComment">
                                                    {item.commentFromApplicant}
                                                </div>
                                                <div className="commentFromApplicantButton" onClick={() => reject(item.userObj.userObjEmail)}>
                                                    <Button color={"red"}><Text color='white' cls='Large' content={"Reject"} fontSize='17' display="inline-block" /></Button>
                                                </div>
                                                <div className="commentFromApplicantButton" onClick={() => approve(item.userObj.userObjEmail)}>
                                                    <Button color={"green"}><Text color='white' cls='Large' content={"Agree"} fontSize='17' display="inline-block" /></Button>
                                                </div>
                                                </div>
                                        )}
                                    >
                                        <div>
                                            <Avatar style={{cursor:"pointer", marginRight:".5em"}} size={30} src={item.userObj.userObjAvatar} onClick={() => props.setPageProps({page: 'ProfilePage', email: item.userObj.userObjEmail})}></Avatar>
                                            <Text color='black' cls='Default' content={item.userObj.userObjName} fontSize='15' display="inline-block" />
                                        </div> 
                                        {/* <span className='answerAuthor'>{item.userObj.userObjName}</span> */}
                                    </List.Item>)}
                                />
                            </Sider>
                        }
                        {!props.page=='CollabDetailPage' &&
                            <Sider className='poppedContent__Sider' width='20%'>
                                
                                {/* <button onClick={onStartCapture}>Capture</button>
                                <button onClick={handleSave}>Download</button> */}
                                <List
                                    size="large"
                                    dataSource={siderList}
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