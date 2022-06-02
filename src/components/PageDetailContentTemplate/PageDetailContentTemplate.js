import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Tag } from "antd";
import Button from "../Button/Button";
import Text from "../Text/Text";
import Title from "../Title/Title";
import Information from "../Information/Information";
import CommentArea from "../CommentArea/CommentArea";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";
import OPInfo from "../OPInfo/OPInfo";
import OptionMenu from "../OptionMenu/OptionMenu";
import './PageDetailContentTemplate.css'
const { Header, Content, Sider, Footer } = Layout;

const PageDetailContentTemplate = (props) => {

    const [versionId, setVersionId] = useState(null);
    
    const setVersion = (index) => {
        setVersionId(props.data?.version[index].id);
        console.log("setVersion: " + versionId + "-" + index);
    }

    useEffect(()=>{
        if(props.page == "NoteDetailPage"){
            setVersionId(props.data?.version[0].id);
        }
    },[props])

    return (
        
        <div className="contentTemplate" >
            <Layout className="contentTemplate__Layout__outer">
                <Layout className="contentTemplate__Layout">
                    {/* Header */}
                    <Header className="contentTemplate__Header" >
                        <Row className="contentTemplate__Row">
                            <Col className="contentTemplate__Header__left" span={props.hasComment?7:4}>
                                <OPInfo
                                    className="contentTemplate__Title__OPInfo" 
                                    size={56}
                                    author={props.data?.author}
                                    date={props.data?.date} 
                                    dateFontSize="18"
                                >T</OPInfo>
                            </Col>
                            <Col className="contentTemplate__Header__middle"span={props.hasComment?16:18}>
                                <Title title={props.data?.title} size={props.hasComment?'30':'35'}/></Col>
                            <Col className="contentTemplate__Header__right contentTemplate__Dropdown" span={props.hasComment?1:2}>
                                <div className="contentTemplate__Dropdown">
                                    <OptionMenu 
                                        page={props.page}
                                        comments={props.data?.comments? props.data.comments:[]} 
                                        versions={props.data?.version? props.data.version:[]} 
                                        hasComment={props.hasComment}
                                        public={props.data?.public}
                                        setVersion={setVersion}
                                    /></div>
                                
                            </Col>
                        </Row>     
                    </Header>
                    {/* Content */}
                    <Content className="contentTemplate__Content" >
                        <Row className='contentTemplate__Row'>
                            <Col className='contentTemplate__Content__Information' >
                                <Information 
                                    school={props.data?.school}
                                    department={props.data?.department}
                                    subject={props.data?.subject}
                                    instructor={props.data?.professor}
                                    likeCount={props.data?.likeCount}
                                    favoriteCount={props.data?.favoriteCount}
                                    unlockCount={props.data?.unlockCount} 
                                    price={props.data?.price}
                                    downloadable={props.data?.downloadable}
                                />
                            </Col>
                        </Row>
                        
                        <Row className='contentTemplate__Row'>
                            <Col  className='contentTemplate__Content__Title' >
                                <Text color='black' cls='Default' content={"Content:"} fontSize='22' display="inline-block" />
                            </Col>
                        </Row>
                        <Row className='contentTemplate__Row'>
                            <Col className='contentTemplate__Content__Main'>
                                { props.hasEditor? 
                                    <ContentEditor versionId = {versionId}/>
                                    :
                                    props.data?.content
                                }
                            </Col>
                        </Row>
                    </Content>
                    {/* Footer */}
                    <Footer className="contentTemplate__Footer">
                        {props.hasTag &&
                            <>
                                <Text color='black' cls='Default' content={"Tags:"} fontSize='22' display="inline-block" />
                                <span className="left-margin"></span>
                                {props.data?.tag && props.data.tag.map( (tag) =>
                                    <>
                                        {/* 
                                        <Text color='black' cls='Default' content={tag} fontSize='18' display="inline-block" /> */}
                                        <Tag style={{ fontSize:"15px" }}>{tag}</Tag>
                                    </>
                                )}
                            </>
                        }
                        {props.footerBtn != null &&
                            <div className="contentTemplate__Footer__Button">
                                <Button color={"green"}><Text color='white' cls='Large' content={props.footerBtn} fontSize='17' display="inline-block" /></Button>
                            </div>
                        }
                        
                    </Footer>
                </Layout>
                
                {/* Sider */}
                {props.hasComment && 
                    <>
                        <Sider id="contentTemplate__Comment" className="contentTemplate__Comment" width='40%'>
                            <CommentArea page={props.page} comments={props.data?.comments? props.data.comments:[]} />
                        </Sider>
                    </>
                }
            </Layout>
        </div>
    );
}


PageDetailContentTemplate.defaultProps = {
    data: null,
    hasComment: false,
    hasEditor: false,
    hasTag: false,
    versionId: '',
    page:'',
    footerBtn: null,
};

export default PageDetailContentTemplate;