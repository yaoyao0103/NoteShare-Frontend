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
import axios from "axios";

const { Header, Content, Sider, Footer } = Layout;
const { TextArea } = Input;

const email = '00857028@email.ntou.edu.tw';
const author = 'yao';

const PostEditTemplate = (props) => {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [information, setInformation] = useState(null);
    

    useEffect(() => {
        const post = props.post;
        if(post && props.mode == 'Edit'){
            setTitle(post.title);
            setContent(post.content);
            switch(props.type){
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
                        })
                        break;
            }
            console.log("post", post);
        }
        else{
            switch(props.type){
                case 'QA': setInformation(QnA); break;
                case 'reward': setInformation(Reward); break;
                case 'collaboration': setInformation(CollabNote); break;
            }
        }
        console.log(props)
    },[props])


    const onUpdate = () => {
        const post = props.post;
        if(props.type == 'QA'){
            post.title = title
            post.department = information.department
            post.subject = information.subject
            post.bestPrice = information.bestPrice
            post.content = content
        }
        else if(props.type == 'reward'){
            post.title = title
            post.department = information.department
            post.subject = information.subject
            post.school = information.school
            post.professor = information.professor? information.professor : null
            post.bestPrice = information.bestPrice
            post.referencePrice = information.referencePrice? information.referencePrice : null
            post.referenceNumber = information.referenceNumber? information.referenceNumber : null
            post.content = content
        }
        else if(props.type == 'collaboration'){
            post.title = title
            post.department = information.department
            post.subject = information.subject
            post.school = information.school
            post.professor = information.professor? information.professor : null
            post.bestPrice = information.bestPrice
            post.content = content
        }
        console.log(post)
        axios.put(`http://localhost:8080/post/${props.postId}`, post)
        .then(res => {
            console.log(res.data)
            message.info("Update!!");
        })
        .catch(err =>{
            console.log(err)
        })

    } 

    const onSubmit = () => {
        let data;
        if(props.type == 'QA'){
            QnAFormat.type = props.type;
            QnAFormat.email = [email]
            QnAFormat.author = author
            QnAFormat.title = title
            QnAFormat.department = information.department
            QnAFormat.subject = information.subject
            QnAFormat.bestPrice = information.bestPrice
            QnAFormat.content = content
            data = QnAFormat
        }
        else if(props.type == 'reward'){
            RewardFormat.type = props.type;
            RewardFormat.email = [email]
            RewardFormat.author = author
            RewardFormat.title = title
            RewardFormat.department = information.department
            RewardFormat.subject = information.subject
            RewardFormat.school = information.school
            RewardFormat.professor = information.professor? information.professor : null
            RewardFormat.bestPrice = information.bestPrice
            RewardFormat.referencePrice = information.referencePrice? information.referencePrice : null
            RewardFormat.referenceNumber = information.referenceNumber? information.referenceNumber : null
            RewardFormat.content = content
            data = RewardFormat
        }
        else if(props.type == 'collaboration'){
            CollabNoteFormat.type = props.type;
            CollabNoteFormat.email = [email]
            CollabNoteFormat.author = author
            CollabNoteFormat.title = title
            CollabNoteFormat.department = information.department
            CollabNoteFormat.subject = information.subject
            CollabNoteFormat.school = information.school
            CollabNoteFormat.professor = information.professor? information.professor : null
            CollabNoteFormat.bestPrice = information.bestPrice
            CollabNoteFormat.content = content
            data = CollabNoteFormat
        }
        console.log(data)
        axios.post(`http://localhost:8080/post/${email}`, data)
        .then(res => {
            console.log(res.data)
            message.info("Submit!!");
        })
        .catch(err =>{
            console.log(err)
        })
    } 

    return (
        
        <div className="postEditTemplate" >
            <Layout className="postEditTemplate__Layout">
                {/* Header */}
                <Header className="postEditTemplate__Header" >
                    <Row className="postEditTemplate__Row">
                        <Col className="postEditTemplate__Header__Title">
                            <Text color='black' cls='Default' content={`New ${props.type}`} fontSize='30' display="inline-block" />
                        </Col>
                    </Row>     
                </Header>
                {/* Content */}
                <Content className="postEditTemplate__Content" >
                    <Row className='postEditTemplate__Row'>
                        <Col  className='postEditTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Title"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Title' >
                            <Input showCount maxLength={20} placeholder="title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                        </Col>
                    </Row>
                    <Row className='postEditTemplate__Row'>
                        <Col  className='postEditTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Information"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Information' >
                            <InformationInput 
                                information={information}
                                setInformation={setInformation}
                            />
                        </Col>
                    </Row>
                    
                    <Row className='postEditTemplate__Row'>
                        <Col  className='postEditTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Description"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postEditTemplate__Row'>
                        <Col className='postEditTemplate__Content__Main'>
                            { props.page=='NoteEditPage' ? 
                                <ContentEditor versionId = {null}/>
                                :
                                <TextArea rows={10} placeholder="type something..." value={content} onChange={(ev) => setContent(ev.target.value)}/>
                            }
                        </Col>
                    </Row>
                </Content>
                {/* Footer */}
                <Footer className="postEditTemplate__Footer">
                    <div className="postEditTemplate__Footer__Button" onClick={props.mode=="Edit"? onUpdate:onSubmit}>
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
    page:'',
    footerBtn: null,
    isAuthor: false,
};

export default PostEditTemplate;