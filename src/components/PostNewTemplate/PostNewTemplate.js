import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag, Progress, message, Input } from "antd";
import Button from "../Button/Button";
import Text from "../Text/Text";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import InformationInput from "../InformationInput/InformationInput";
import { Note, QnA, Reward, Collab } from "./InfoCategories"
import './PostNewTemplate.css'

const { Header, Content, Sider, Footer } = Layout;
const { TextArea } = Input;

const PostNewTemplate = (props) => {

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [information, setInformation] = useState(null);
    

    useEffect(() => {
        switch(props.type){
            case 'QnA': setInformation(QnA);break;
            case 'Reward': setInformation(Reward);break;
            case 'Note': setInformation(Note);break;
            case 'CollabNote': setInformation(Collab);break;
        }
    },[])


    useEffect(() => {
        console.log(information)
    },[information])

    const onSubmit = () => {
        message.info("Submit!!");
    } 

    return (
        
        <div className="postNewTemplate" >
            <Layout className="postNewTemplate__Layout">
                {/* Header */}
                <Header className="postNewTemplate__Header" >
                    <Row className="postNewTemplate__Row">
                        <Col className="postNewTemplate__Header__Title">
                            <Text color='black' cls='Default' content={`New ${props.type}`} fontSize='30' display="inline-block" />
                        </Col>
                    </Row>     
                </Header>
                {/* Content */}
                <Content className="postNewTemplate__Content" >
                    <Row className='postNewTemplate__Row'>
                        <Col  className='postNewTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Title"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postNewTemplate__Row'>
                        <Col className='postNewTemplate__Content__Title' >
                            <Input showCount maxLength={20} placeholder="title" value={title} onChange={(ev) => setTitle(ev.target.value)} />
                        </Col>
                    </Row>
                    <Row className='postNewTemplate__Row'>
                        <Col  className='postNewTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Information"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postNewTemplate__Row'>
                        <Col className='postNewTemplate__Content__Information' >
                            <InformationInput 
                                information={information}
                                setInformation={setInformation}
                            />
                        </Col>
                    </Row>
                    
                    <Row className='postNewTemplate__Row'>
                        <Col  className='postNewTemplate__Content__Label' >
                            <Text color='black' cls='Small' content={"Description"} fontSize='22' display="inline-block" />
                        </Col>
                    </Row>
                    <Row className='postNewTemplate__Row'>
                        <Col className='postNewTemplate__Content__Main'>
                            { (props.page=='NewNotePage' || (props.page=='NewCollabPage')) ? 
                                <ContentEditor versionId = {null}/>
                                :
                                <TextArea rows={10} placeholder="type something..." value={content} onChange={(ev) => setContent(ev.target.value)}/>
                            }
                        </Col>
                    </Row>
                </Content>
                {/* Footer */}
                <Footer className="postNewTemplate__Footer">
                    <div className="postNewTemplate__Footer__Button" onClick={onSubmit}>
                        <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                    </div>
                </Footer>
            </Layout> 
        </div>
    );
}


PostNewTemplate.defaultProps = {
    data: null,
    versionId: '',
    page:'',
    footerBtn: null,
    isAuthor: false,
};

export default PostNewTemplate;