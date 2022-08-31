import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { message } from "antd";
import { EllipsisFolderOutlined } from '@ant-design/icons';
import OPInfo from '../OPInfo/OPInfo';
import Title from "../Title/Title";
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './FolderOutlineCard.css'
import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        sm: 0,
        lm: 391,
        md: 768,
        lg: 1024,
        xl: 1192,
    },
})
const { Paragraph } = Typography;
const { Header, Content, Sider, Footer } = Layout;
function FolderOutlineCard(props) {
    const [ellipsis, setEllipsis] = useState(true);
    const [sider, setSider] = useState(
        <Sider className={"FolderOutlineCard__Sider__Outer" + '__' + props.mode} width='35%' ></Sider>
    );



    if (props.cardContent.tag) {
        var tags = '';
        for (let i = 0; i < props.cardContent.tag.length; i++) {
            tags += props.cardContent.tag[i];
            if (i != props.cardContent.tag.length - 1)
                tags += ' , ';
        }
    }

    const FolderSider = (
        <>{props.mode === 'Folder' &&
            < Sider className={"FolderOutlineCard__Sider__Outer"} width='10%' >
                <Row className={"FolderOutlineCard__Sider__NoteNumber"}>
                    <Text cls='Default' fontSize={22} content={'Note number : ' + props.cardContent.notes.length} />
                </Row>

            </Sider >
        }</>
    );
    var opSize = 42;
    var authorFontSize = '22';
    var dateFontSize = '12';
    var author = props.cardContent.creatorName;
    var email = props.cardContent.creatorEmail;
    useEffect(() => {
        // set menu

        setSider(FolderSider);
    }, [props])


    return (

        <Layout className={"FolderOutlineCard__Layout__Outer"}>
            <Content className={"FolderOutlineCard__Content__Outer"}>
                <MediaContextProvider >
                    <Media at="xl" className='FolderOutlineCard__Media'>
                        <Layout className={"FolderOutlineCard__Layout__Inner"}>
                            <Header className={"FolderOutlineCard__Header"} >
                                <Row className={"FolderOutlineCard__Header__Row"}>
                                    <Col className={"FolderOutlineCard__Header__Left"} span={10}>
                                        <OPInfo
                                            className="FolderOutlineCard__OPInfo"
                                            mode="FolderOutline"
                                            size={opSize}
                                            author={{ email: email, name: author, avatar: props.cardContent.headshotPhoto }}
                                            authorFontSize={authorFontSize}
                                            dateFontSize={dateFontSize}
                                            setPageProps={props.setPageProps}
                                        />
                                    </Col>
                                    <Col className={"FolderOutlineCard__Header__Right"} span={10}>
                                        <Title mode='FolderOutline' title={props.cardContent.folderName} size={26} />
                                    </Col>
                                    <Col span={4}>
                                        <Text cls='Default' fontSize={22} content={'Note number : ' + props.cardContent.notes.length} />
                                    </Col>
                                </Row>
                            </Header>
                        </Layout>
                    </Media>
                    <Media at="lg" className='FolderOutlineCard__Media'>
                        <Layout className={"FolderOutlineCard__Layout__Inner"}>
                            <Header className={"FolderOutlineCard__Header"} >
                                <Row className={"FolderOutlineCard__Header__Row"}>
                                    <Col className={"FolderOutlineCard__Header__Left"} span={10}>
                                        <OPInfo
                                            className="FolderOutlineCard__OPInfo"
                                            mode="FolderOutline"
                                            size={opSize}
                                            author={{ email: email, name: author, avatar: props.cardContent.headshotPhoto }}
                                            authorFontSize={authorFontSize}
                                            dateFontSize={dateFontSize}
                                            setPageProps={props.setPageProps}
                                        />
                                    </Col>
                                    <Col className={"FolderOutlineCard__Header__Right"} span={10}>
                                        <Title mode='FolderOutline' title={props.cardContent.folderName} size={26} />
                                    </Col>
                                    <Col span={4}>
                                        <Text cls='Default' fontSize={22} content={'Note number : ' + props.cardContent.notes.length} />
                                    </Col>
                                </Row>
                            </Header>
                        </Layout>
                    </Media>
                    <Media at="md" className='FolderOutlineCard__Media'>
                        <Layout className={"FolderOutlineCard__Layout__Inner"}>
                            <Header className={"FolderOutlineCard__Header"} >
                                <Row className={"FolderOutlineCard__Header__Row"}>
                                    <Col className={"FolderOutlineCard__Header__Left"} span={10}>
                                        <OPInfo
                                            className="FolderOutlineCard__OPInfo"
                                            mode="FolderOutline"
                                            size={opSize}
                                            author={{ email: email, name: author, avatar: props.cardContent.headshotPhoto }}
                                            authorFontSize={authorFontSize}
                                            dateFontSize={dateFontSize}
                                            setPageProps={props.setPageProps}
                                        />
                                    </Col>
                                    <Col className={"FolderOutlineCard__Header__Right"} span={10}>
                                        <Title mode='FolderOutline' title={props.cardContent.folderName} size={26} />
                                    </Col>
                                    <Col span={4}>
                                        <Text cls='Default' fontSize={22} content={'Note number : ' + props.cardContent.notes.length} />
                                    </Col>
                                </Row>
                            </Header>
                        </Layout>
                    </Media>
                    <Media at="lm" className='FolderOutlineCard__Media'>
                        <Layout className={"FolderOutlineCard__Layout__Inner"}>
                            <Header className={"FolderOutlineCard__Header"} >
                                <Row className={"FolderOutlineCard__Header__Row"}>
                                    <Col className={"FolderOutlineCard__Header__Left"} span={12}>
                                        <OPInfo
                                            className="FolderOutlineCard__OPInfo"
                                            mode="FolderOutline"
                                            size={opSize}
                                            author={{ email: email, name: author, avatar: props.cardContent.headshotPhoto }}
                                            authorFontSize={authorFontSize}
                                            dateFontSize={dateFontSize}
                                            setPageProps={props.setPageProps}
                                        />
                                    </Col>
                                    <Col className={"FolderOutlineCard__Header__Right"} span={12}>
                                        <Title mode='FolderOutline' title={props.cardContent.folderName} size={26} />
                                    </Col>
                                    <Col span={24} className={"FolderOutlineCard__Header__NoteNum"}>
                                        <Text cls='Default' fontSize={22} content={'Note number : ' + props.cardContent.notes.length} />
                                    </Col>
                                </Row>
                            </Header>
                        </Layout>
                    </Media>
                    <Media at="sm" className='FolderOutlineCard__Media'>
                        <Layout className={"FolderOutlineCard__Layout__Inner"}>
                            <Header className={"FolderOutlineCard__Header"} >
                            <Row className={"FolderOutlineCard__Header__Row"}>
                                    <Col className={"FolderOutlineCard__Header__Left"} span={24}>
                                        <OPInfo
                                            className="FolderOutlineCard__OPInfo"
                                            mode="FolderOutline"
                                            size={opSize}
                                            author={{ email: email, name: author, avatar: props.cardContent.headshotPhoto }}
                                            authorFontSize={authorFontSize}
                                            dateFontSize={dateFontSize}
                                            setPageProps={props.setPageProps}
                                        />
                                    </Col>
                                    <Col className={"FolderOutlineCard__Header__Right__sm"} span={24}>
                                        <Title mode='FolderOutline' title={props.cardContent.folderName} size={26} />
                                    </Col>
                                    <Col span={24} className={"FolderOutlineCard__Header__NoteNum__sm"}>
                                        <Text cls='Default' fontSize={22} content={'Note number : ' + props.cardContent.notes.length} />
                                    </Col>
                                </Row>
                            </Header>
                        </Layout>
                    </Media>
                </MediaContextProvider>
            </Content>
            {/* {sider} */}
        </Layout>

    );
}
export default FolderOutlineCard;