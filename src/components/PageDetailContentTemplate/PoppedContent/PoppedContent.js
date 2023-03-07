import React, { useState, useEffect } from 'react'
import { Layout, Row, Col, List, Empty, Input, Avatar, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import OptionMenu from '../../OptionMenu/OptionMenu';
//import { ScreenCapture } from 'react-screen-capture';
import axios from '../../axios/axios';
import Cookie from '../../Cookies/Cookies';
import Button from '../../Button/Button';
import Text from '../../Text/Text';
import "./PoppedContent.css";
import { set } from 'react-hook-form';
const { Header, Content, Sider, Footer } = Layout;
const { TextArea } = Input;
const cookieParser = new Cookie(document.cookie);

const PoppedContent = (props) => {
    const { setPoppedContentShow } = props;
    const [content, setContent] = useState(<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />);
    const [startCapture, setStartCapture] = useState(false);
    const [applyContent, setApplyContent] = useState('');
    const [siderList, setSiderList] = useState([])

    // Screen Shot Capture
    const [screenCapture, setScreenCapture] = useState('');

    useEffect(() => {
        console.log("props.content: ", props.content)
        setSiderList(props.content)
    }, [props])

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

        let name = cookieParser.getCookieByName('name');
        let avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
        axios.put(`/post/add/${props.postId}/${email}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                props.sendPrivateMessage(
                    name + ' has agreed your application !',
                    'collaboration',
                    props.email,
                    name,
                    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
                    props.postId,
                    email
                )
                message.success("You approved the application!")
                const tempList = new Array();
                for (let i = 0; i < siderList.length; i++) {
                    if (siderList[i].userObj.userObjEmail != email) {
                        tempList.push(siderList[i])
                    }
                }
                setSiderList(tempList)
                setContent()
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
                    message.error('Server Error! Please refresh again! (Approve Application Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Approve Application Error)")
                }
            })
    }

    const reject = (email) => {
        axios.delete(`/post/apply/${props.postId}/${email}`, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You rejected the application!")
                const tempList = new Array();
                console.log("siderList", siderList)
                for (let i = 0; i < siderList.length; i++) {
                    if (siderList[i].userObj.userObjEmail != email) {
                        tempList.push(siderList[i])
                    }
                }
                setSiderList(tempList)
                setContent()
                // Todo: remove applicant from list
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
                    message.error('Server Error! Please refresh again! (Reject Application Error)')
                }
                else {
                    message.error('Server Error! Please try again later. (Reject Application Error)')
                }
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
                        <CloseOutlined onClick={() => { setPoppedContentShow(false) }} />

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
                            {!(props.page == 'CollabDetailPage' && !props.isAuthor) ?
                                content
                                :
                                props.haveApplied ?
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
                                        <TextArea rows={4} placeholder="maxLength is 100" maxLength={100} value={applyContent} onChange={(ev) => setApplyContent(ev.target.value)} />
                                        <div className="apply__Button" onClick={() => { props.apply(applyContent); setPoppedContentShow(false); props.setHaveApplied(applyContent); }}>
                                            <Button color={"green"}><Text color='white' cls='Large' content={"Apply"} fontSize='17' display="inline-block" /></Button>
                                        </div>
                                    </div>
                            }
                        </Content>
                        {(props.page == 'CollabDetailPage' && props.isManager) &&
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
                                            <Avatar style={{ cursor: "pointer", marginRight: ".5em" }} size={30} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: item.userObj.userObjEmail })}></Avatar>
                                            <Text color='black' cls='Default' content={item.userObj.userObjName} fontSize='15' display="inline-block" />
                                        </div>
                                        {/* <span className='answerAuthor'>{item.userObj.userObjName}</span> */}
                                    </List.Item>)}
                                />
                            </Sider>
                        }
                        {props.page == 'RewardDetailPage' &&
                            <Sider className='poppedContent__Sider' width='20%'>

                                {/* <button onClick={onStartCapture}>Capture</button>
                                <button onClick={handleSave}>Download</button> */}
                                <List
                                    size="large"
                                    dataSource={siderList}
                                    renderItem={(item, index) => (
                                        item.best ? <List.Item actions={
                                            [
                                                <p>Best</p>
                                            ]
                                        } >
                                            <div>
                                                <Avatar style={{ cursor: "pointer", marginRight: ".5em" }} size={30} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: item.userObj.userObjEmail })}></Avatar>
                                                <Text color='black' cls='Default' content={item.userObj.userObjName} fontSize='15' display="inline-block" />
                                            </div>
                                        </List.Item>
                                            :
                                            item.reference ? <List.Item actions={
                                                [
                                                    <p>Reference</p>
                                                ]
                                            } >
                                                <div>
                                                    <Avatar style={{ cursor: "pointer", marginRight: ".5em" }} size={30} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: item.userObj.userObjEmail })}></Avatar>
                                                    <Text color='black' cls='Default' content={item.userObj.userObjName} fontSize='15' display="inline-block" />
                                                </div>
                                            </List.Item>
                                                :
                                                <List.Item actions={
                                                    [
                                                        <OptionMenu setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} page="RewardDetailPageAnswer" answerId={item.id} index={index} setContent={setContent} postId={props.postId} refreshAnswer={props.refreshAnswer} />
                                                    ]
                                                } >
                                                    <div>
                                                        <Avatar style={{ cursor: "pointer", marginRight: ".5em" }} size={30} src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"} onClick={() => props.setPageProps({ page: 'ProfilePage', email: item.userObj.userObjEmail })}></Avatar>
                                                        <Text color='black' cls='Default' content={item.userObj.userObjName} fontSize='15' display="inline-block" />
                                                    </div>
                                                </List.Item>)}
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