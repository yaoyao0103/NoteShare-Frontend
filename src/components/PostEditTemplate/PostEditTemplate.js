import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag, Progress, message, Input } from "antd";
import Button from "../Button/Button";
import Text from "../Text/Text";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import InformationInput from "../InformationInput/InformationInput";
import { Note, QnA, Reward, CollabNote } from "./InfoCategories"
import './PostEditTemplate.css';

const { Header, Content, Sider, Footer } = Layout;
const { TextArea } = Input;

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
                case 'QnA': 
                        setInformation({
                            department: post.department,
                            subject: post.subject,
                            price: post.price,
                        })
                        break;
                case 'Reward': 
                        setInformation({
                            school: post.school,
                            department: post.department,
                            subject: post.subject,
                            professor: post.professor,
                            price: post.price,
                            refPrice: post.refPrice,
                        })
                        break;
                case 'Note':
                        setInformation({
                            school: post.school,
                            department: post.department,
                            subject: post.subject,
                            professor: post.professor,
                            downloadable: post.downloadable,
                            price: post.price,
                        })
                        break;
                case 'CollabNote':
                        setInformation({
                            school: post.school,
                            department: post.department,
                            subject: post.subject,
                            professor: post.professor,
                            price: post.price,
                        })
                        break;
            }
            console.log("post", post);
        }
        else{
            switch(props.type){
                case 'QnA': setInformation(QnA); break;
                case 'Reward': setInformation(Reward); break;
                case 'Note': setInformation(Note); break;
                case 'CollabNote': setInformation(CollabNote); break;
            }
        }
    },[props])


    const onUpdate = () => {
        message.info("Update!!");
    } 

    const onSubmit = () => {
        message.info("Submit!!");
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