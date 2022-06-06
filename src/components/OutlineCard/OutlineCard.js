import React, { useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { message } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import OPInfo from '../OPInfo/OPInfo';
import Title from "../Title/Title";
import Text from "../Text/Text";
import { Avatar } from 'antd';
import './OutlineCard.css'
const { Paragraph } = Typography;
const { Header, Content, Sider, Footer } = Layout;
function OutlineCard(props) {
    const [ellipsis, setEllipsis] = useState(true);
    return (
        <Layout className={"OutlineCard__Layout__Outer" + '__' + props.mode}>
            <Content className={"OutlineCard__Content__Outer" + '__' + props.mode}>
                <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode}>
                    <Header className={"OutlineCard__Header" + '__' + props.mode} >
                        <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Header__Left" + '__' + props.mode} span={10}>
                                <OPInfo
                                    className="OutlineCard__OPInfo"
                                    mode="Outline"
                                    size={32}
                                    author={'Allen'}
                                    date={'2022-01-06'}
                                    authorFontSize='16'
                                    dateFontSize="12"
                                />
                            </Col>
                            <Col className={"OutlineCard__Header__Right" + '__' + props.mode} span={14}>
                                <Title mode='Outline' title={'Interrupt Vs Trap'} size={26} />
                            </Col>
                        </Row>
                    </Header>
                    <Content className={"OutlineCard__Content__Inner" + '__' + props.mode} >
                        <Paragraph
                            className={"OutlineCard__Paragraph" + '__' + props.mode}
                            ellipsis={
                                ellipsis
                                    ? {
                                        rows: 7,
                                        expandable: false,

                                        onExpand: () => {
                                            message.info('watch more');
                                            window.location.href = 'http://localhost:3000/QnADetailPage'
                                        }
                                    }
                                    : false
                            }
                        >
                            {/* <Text cls='Small' fontSize="18" content=" Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team." display="block"/> */}

                            Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team. Ant
                            Design, a design language for background applications, is refined by Ant UED Team.
                        </Paragraph>
                    </Content>
                </Layout>
            </Content>
            <Sider className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='35%'>
                <Row className={"OutlineCard__Sider__First__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__First__Row" + '__' + props.mode}>
                        <Text cls='Default' fontSize="16" Content='資訊工程學系' />
                    </Col>

                </Row>
            </Sider>
            {/* <div className={"OutlineCard__Sider__Outer" + '__' + props.mode}>

            </div> */}

        </Layout>
    );
}
export default OutlineCard;