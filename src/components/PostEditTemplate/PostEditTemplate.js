import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag, Progress, message, Input } from "antd";
import Button from "../Button/Button";
import Text from "../Text/Text";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import InformationInput from "../InformationInput/InformationInput";
import { QnA, Reward, CollabNote } from "./InfoCategories"
import { QnAFormat, RewardFormat, CollabNoteFormat } from "./PostFormat"
import './PostEditTemplate.css';
import axios from "../axios/axios";
import { NoteFormat, VersionFormat, ContentFormat } from "../NoteEditTemplate/NoteFormat";
import Cookie from "../Cookies/Cookies";
import { Base64 } from 'js-base64';


const { Header, Content, Sider, Footer } = Layout;
const { TextArea } = Input;

//const email = '00857028@email.ntou.edu.tw';
const author = 'yao';
const cookieParser = new Cookie(document.cookie)
const PostEditTemplate = (props) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [information, setInformation] = useState(null);
    const [email, setEmail] = useState('')

    useEffect(() => {

        const temp = cookieParser.getCookieByName('email')
        if (temp)
            var tempEmail = Base64.decode(temp);
        setEmail(tempEmail);
    }, [])


    useEffect(() => {
        props.setLoading(true);
        const post = props.post;
        if (post && props.mode == 'edit') {
            setTitle(post.title);
            setContent(post.content);
            switch (props.type) {
                case 'QA':
                    setInformation({
                        department: post.department,
                        subject: post.subject,
                        bestPrice: post.bestPrice,
                    })
                    break;
                case 'reward':
                    setInformation({
                        school: post.school,
                        department: post.department,
                        subject: post.subject,
                        professor: post.professor,
                        bestPrice: post.bestPrice,
                        referencePrice: post.referencePrice,
                        referenceNumber: post.referenceNumber,
                    })
                    break;
                /*case 'Note':
                        setInformation({
                            school: post.school,
                            department: post.department,
                            subject: post.subject,
                            professor: post.professor,
                            downloadable: post.downloadable,
                            bestPrice: post.bestPrice,
                        })
                        break;*/
                case 'collaboration':
                    setInformation({
                        school: post.school,
                        department: post.department,
                        subject: post.subject,
                        professor: post.professor,
                        bestPrice: post.bestPrice,
                        downloadable: post.downloadable,
                    })
                    break;
            }
            console.log("post", post);
        }
        else {
            setTitle('')
            switch (props.type) {
                case 'QA': setInformation(QnA); break;
                case 'reward': setInformation(Reward); break;
                case 'collaboration': setInformation(CollabNote); break;
            }
            setContent('')
        }
        console.log(props)
    }, [props])
    
    useEffect(() => {  
        if(information){
            props.setLoading(false);
        }
    }, [information])


    const onUpdate = () => {
        const post = props.post;
        let page;
        if (props.type == 'QA') {
            post.title = title
            post.department = information.department
            post.subject = information.subject
            post.bestPrice = information.bestPrice
            post.content = content
            page = 'QnADetailPage'
        }
        else if (props.type == 'reward') {
            post.title = title
            post.department = information.department
            post.subject = information.subject
            post.school = information.school
            post.professor = information.professor ? information.professor : null
            post.bestPrice = information.bestPrice
            post.referencePrice = information.referencePrice ? information.referencePrice : null
            post.referenceNumber = information.referenceNumber ? information.referenceNumber : null
            post.content = content
            page = 'RewardDetailPage'
        }
        else if (props.type == 'collaboration') {
            post.title = title
            post.department = information.department
            post.subject = information.subject
            post.school = information.school
            post.professor = information.professor ? information.professor : null
            post.bestPrice = information.bestPrice
            post.content = content
            page = 'CollabDetailPage'
        }
        console.log(post)
        axios.put(`/post/${props.postId}`, post, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log(res.data)
                message.success("You updated the information!");
                props.setPageProps({ page: page, postId: props.postId });
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
                    message.error('Server Error! Please refresh again! (Update Post Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Update Post Error)")
                }
            })

    }

    const onSubmit = () => {
        let data;
        let msg = '';
        let type = ''
        if (props.type == 'QA') {
            QnAFormat.type = props.type;
            QnAFormat.title = title
            QnAFormat.department = information.department
            QnAFormat.subject = information.subject
            QnAFormat.bestPrice = information.bestPrice
            QnAFormat.content = content
            data = QnAFormat
            msg = ' has posted a QA'
            type = 'QnADetailPage'
        }
        else if (props.type == 'reward') {
            RewardFormat.type = props.type;
            RewardFormat.title = title
            RewardFormat.department = information.department
            RewardFormat.subject = information.subject
            RewardFormat.school = information.school
            RewardFormat.professor = information.professor ? information.professor : null
            RewardFormat.bestPrice = information.bestPrice
            RewardFormat.referencePrice = information.referencePrice ? information.referencePrice : null
            RewardFormat.referenceNumber = information.referenceNumber ? information.referenceNumber : null
            RewardFormat.content = content
            data = RewardFormat
            msg = ' has posted a Reward'
            type = 'RewardDetailPage'
        }
        else if (props.type == 'collaboration') {
            CollabNoteFormat.type = props.type;
            CollabNoteFormat.title = title
            CollabNoteFormat.department = information.department
            CollabNoteFormat.subject = information.subject
            CollabNoteFormat.school = information.school
            CollabNoteFormat.professor = information.professor ? information.professor : null
            CollabNoteFormat.bestPrice = information.bestPrice
            CollabNoteFormat.content = content
            data = CollabNoteFormat
            msg = ' has posted a Collaboration'
            type = 'CollabDetailPage'

        }

        console.log(data)
        let cookieParser = new Cookie(document.cookie);
        let name = cookieParser.getCookieByName('name');
        let avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
        axios.post(`/post/${email}`, data, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log(res)
                props.sendBellMessage(
                    name + msg,
                    type,
                    email,
                    name,
                    "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x",
                    res.data.res.id
                );
                console.log(res.data.res)
                message.success("You submitted a post!");
                if (props.type == 'collaboration') {
                    const tempId = res.data.res.answers[0]
                    VersionFormat.name = "default"
                    VersionFormat.slug = "default"
                    VersionFormat.content = [ContentFormat]
                    axios.put(`/note/${tempId}/0`, VersionFormat, {
                        headers: {
                            'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                        }
                    })
                        .then(versionRes => {
                            props.setPageProps({ page: type, postId: res.data.res.id });
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
                                message.error('Server Error! Please refresh again! (Upgrade Note Default Of Collaboration)')
                            }
                            else {
                                message.error("Serevr Error! Please try again later. (Upgrade Note Default Of Collaboration)")
                            }
                        })
                }
                else {
                    props.setPageProps({ page: type, postId: res.data.res.id });
                }

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
                    message.error('Server Error! Please refresh again! (Submit Post Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Submit Post Error)")
                }
            })
    }

    return (

        <div className="postEditTemplate" >
            <Layout className="postEditTemplate__Layout">
                {/* Header */}
                {/* Content */}
                <Content className="postEditTemplate__Content" >
                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Title"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Title' >
                            <Input showCount maxLength={100} placeholder="Title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                        </Col>
                    </Row>
                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Information"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Information' >
                            <InformationInput
                                information={information}
                                setInformation={setInformation}
                                page={props.page}
                            />
                        </Col>
                    </Row>

                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Description"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Main'>
                            {props.page == 'NoteEditPage' ?
                                <ContentEditor versionId={null} />
                                :
                                <TextArea rows={10} placeholder="type something..." value={content} onChange={(ev) => setContent(ev.target.value)} />
                            }
                        </Col>
                    </Row>
                </Content>
                {/* Footer */}
                <Footer className="postEditTemplate__Footer">
                    <div className="postEditTemplate__Footer__Button" onClick={props.mode == "edit" ? onUpdate : onSubmit}>
                        <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                    </div>
                </Footer>
            </Layout>
        </div>
    );
}


PostEditTemplate.defaultProps = {
    data: null,
    versionId: '',
    page: '',
    footerBtn: null,
    isAuthor: false,
};

export default PostEditTemplate;