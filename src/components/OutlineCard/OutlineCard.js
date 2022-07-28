import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography } from "antd";
import { message } from "antd";
import { EllipsisOutlined, LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import OPInfo from '../OPInfo/OPInfo';
import Title from "../Title/Title";
import Text from "../Text/Text";
import axios from "axios";
import { Avatar } from 'antd';
import './OutlineCard.css'
import Cookie from "../Cookies/Cookies";
import { Base64 } from "js-base64";
import { set } from "react-hook-form";
const { Paragraph } = Typography;
const { Header, Content, Sider, Footer } = Layout;
const cookieParser = new Cookie(document.cookie)
function OutlineCard(props) {
    const [ellipsis, setEllipsis] = useState(true);
    const [hasLike, setHasLike] = useState(props.hasLike);
    const [sider, setSider] = useState(
        <Sider className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='35%' ></Sider>
    );


    if (props.cardContent.tag) {
        var tags = '';
        for (let i = 0; i < props.cardContent.tag.length; i++) {
            tags += props.cardContent.tag[i];
            if (i !== props.cardContent.tag.length - 1)
                tags += ' , ';
        }
    }
    const onClickCard = (type, id) => {
        console.log(type, id)
        switch (type) {
            case 'QA': props.setPageProps({
                page: 'QnADetailPage',
                postId: id,
            }); break;
            case 'reward': props.setPageProps({
                page: 'RewardDetailPage',
                postId: id,
            }); break;
            case 'collaboration': props.setPageProps({
                page: 'CollabDetailPage',
                postId: id,
            }); break;
            case 'normal': props.setPageProps({
                page: 'NoteDetailPage',
                noteId: id,
            }); break;
        }

    }
    const likeNote = () => {
        axios.put('http://localhost:8080/like/note/' + props.cardContent.id + '/' + props.email, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then((res) => {
            message.success('Like it successfully!')
            setHasLike(true)
        }).catch(err => {
            message.error("Server Error! Please try again later. (like Note Error)")
            console.log(err)
        });

    }
    const unLikeNote = () => {
        axios.put('http://localhost:8080/unlike/note/' + props.cardContent.id + '/' + props.email, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then((res) => {
            message.success('Cancel like successfully!')
            setHasLike(false)
        }).catch(err => {
            message.error("Server Error! Please try again later. (Cancel like Error)")
            console.log(err)
        });

    }

    const QnASider = (
        <>{props.mode === 'Post' &&
            < Sider onClick={props.onClick} className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='35%' >


                <Row className={"OutlineCard__Sider__First__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={18}>
                        <Text cls='Default' fontSize="16" content={props.cardContent.department} />
                    </Col>

                </Row>
                <Row className={"OutlineCard__Sider__Sec__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={props.cardContent.subject} />
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Third__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__CommentCount" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'留言數 : ' + props.cardContent.comments.length} />
                    </Col>
                </Row>
                {props.cardContent.answers.length !== 0 &&
                    <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                        <Col className={"OutlineCard__Sider__HasBestAns" + '__' + props.mode} span={20}>
                            <Text cls='Default' fontSize="16" content='已解答' color='green' />
                        </Col>
                    </Row>
                }
                {props.cardContent.answers.length === 0 &&
                    <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                        <Col className={"OutlineCard__Sider__Price" + '__' + props.mode} span={20}>
                            <Text cls='Default' fontSize="16" content={'最高賞金 : ' + props.cardContent.bestPrice} color='red' />
                        </Col>
                    </Row>
                }




            </Sider >
        }</>
    );
    const RewardSider = (
        <>{props.mode === 'Post' &&
            < Sider onClick={props.onClick} className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='35%' >

                <Row className={"OutlineCard__Sider__First__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={props.cardContent.department} />
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Sec__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={props.cardContent.subject} />
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Sec__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'教授 : ' + props.cardContent.professor} />
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Third__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__CommentCount" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'留言數 : ' + props.cardContent.comments.length} />
                    </Col>
                </Row>

                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__BestPrice" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'最佳解賞金 : ' + props.cardContent.bestPrice} />
                    </Col>

                </Row>
                <Row className={"OutlineCard__Sider__Fifth__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__RefPrice" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'參考解賞金 : ' + props.cardContent.referencePrice} />
                    </Col>
                </Row>


            </Sider >
        }</>
    );
    const CollabSider = (
        <>{props.mode === 'Post' &&
            < Sider onClick={props.onClick} className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='35%' >
                <Layout className={"OutlineCard__Sider__Inner__Layout" + '__' + props.mode}>

                    <Content className={"OutlineCard__Sider__Inner__Content" + '__' + props.mode}>
                        <Row className={"OutlineCard__Sider__First__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={20}>
                                <Text cls='Default' fontSize="16" content={props.cardContent.department} />
                            </Col>
                        </Row>
                        <Row className={"OutlineCard__Sider__Sec__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={20}>
                                <Text cls='Default' fontSize="16" content={props.cardContent.subject} />
                            </Col>
                        </Row>
                        <Row className={"OutlineCard__Sider__Third__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={20}>
                                <Text cls='Default' fontSize="16" content={props.cardContent.school} />
                            </Col>
                        </Row>
                        <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={20}>
                                <Text cls='Default' fontSize="16" content={'教授 : ' + props.cardContent.professor} />
                            </Col>
                        </Row>
                    </Content>
                    <Footer className={"OutlineCard__Sider__Footer" + '__' + props.mode}>
                        <Row className={"OutlineCard__Sider__Footer__Fir" + '__' + props.mode}>
                            <Col span={6} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>
                                {props.hasJoin &&


                                    <Text cls='Default' fontSize="14" color='green' content={'已加入'} />
                                }
                                {!props.hasJoin &&


                                    <Text cls='Default' fontSize="14" color='red' content={'未加入'} />
                                }
                            </Col>
                            <Col span={14}>
                            </Col>

                        </Row>

                    </Footer>
                </Layout>
            </Sider >
        }</>
    );
    const NoteSider = (
        <>{props.mode === 'Note' &&
            < Sider onClick={props.onClick} className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='30%' >
                <Layout className={"OutlineCard__Sider__Inner__Layout" + '__' + props.mode}>

                    <Content className={"OutlineCard__Sider__Inner__Content" + '__' + props.mode}>
                        <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={8}>
                                <Text cls='Default' fontSize="16" content={props.cardContent.department} />
                            </Col>
                            <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={16}>
                                <Text cls='Default' fontSize="16" content={props.cardContent.subject} />
                            </Col>

                        </Row>
                        <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={20}>
                                <Text cls='Default' fontSize="16" content={props.cardContent.school} />
                            </Col>
                        </Row>
                        <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={20}>
                                <Text cls='Default' fontSize="16" content={props.cardContent.professor + '教授'} />
                            </Col>
                        </Row>
                        {props.cardContent.tag.length > 0 && <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Tag__Title" + '__' + props.mode} span={20}>
                                <Text cls='Default' fontSize="16" content={'Tags : '} />
                            </Col>
                        </Row>
                        }
                        {props.cardContent.tag.length > 0 && <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                            <Paragraph
                                className={"OutlineCard__Sider__Paragraph" + '__' + props.mode}
                                ellipsis={
                                    ellipsis
                                        ? {
                                            rows: 1,
                                            expandable: false,
                                        }
                                        : false
                                }
                            >
                                {tags}
                            </Paragraph>
                            {/* <Text cls='Small' fontSize="14" content={tags} /> */}

                        </Row>
                        }
                        <Row className={"OutlineCard__Sider__Row__Like" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__LikeCount" + '__' + props.mode} span={8}>
                                <Text cls='Default' fontSize="14" content={'喜歡數 : ' + props.cardContent.likeCount} />
                            </Col>
                            <Col className={"OutlineCard__Sider__UnlockCount" + '__' + props.mode} span={8}>
                                <Text cls='Default' fontSize="14" content={'購買數 : ' + props.cardContent.unlockCount} />
                            </Col>
                            <Col className={"OutlineCard__Sider__FavoriteCount" + '__' + props.mode} span={8}>
                                <Text cls='Default' fontSize="14" content={'收藏數 : ' + props.cardContent.favoriteCount} />
                            </Col>

                        </Row>

                        <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={16}>
                                <Text cls='Default' fontSize="14" content={props.cardContent.downloadable ? 'Downloadable' : 'Undownloadable'} />
                            </Col>
                            <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={8}>
                                <Text cls='Default' fontSize="14" content={'Coin : ' + props.cardContent.price} />
                            </Col>
                        </Row>
                        <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>

                        </Row>
                    </Content>
                    <Footer className={"OutlineCard__Sider__Footer" + '__' + props.mode}>
                        <Row className={"OutlineCard__Sider__Footer__Fir" + '__' + props.mode}>
                            <Col span={6} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>{props.hasBuy &&


                                <Text cls='Default' fontSize="14" color='green' content={'已購買'} />
                            }
                                {!props.hasBuy &&


                                    <Text cls='Default' fontSize="14" color='red' content={'未購買'} />
                                }
                            </Col>
                            <Col span={14}>
                            </Col>
                            {!hasLike && <Col hasLike={hasLike} span={2} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>
                                <LikeOutlined onClick={() => { likeNote() }} style={{
                                    fontSize: '26px',
                                }} size={'large'} />


                            </Col>}
                            {hasLike && <Col hasLike={hasLike} span={2} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>


                                <LikeTwoTone onClick={() => { unLikeNote() }} style={{
                                    fontSize: '26px',
                                }} size={'large'} />

                            </Col>}
                        </Row>

                    </Footer>
                </Layout>
            </Sider >
        }</>
    );
    const FolderSider = (
        <>{props.mode === 'Folder' &&
            < Sider className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='30%' >
                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={8}>
                        <Text cls='Default' fontSize="16" content={props.cardContent.department} />
                    </Col>
                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={16}>
                        <Text cls='Default' fontSize="16" content={props.cardContent.subject} />
                    </Col>

                </Row>
                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={props.cardContent.school} />
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={props.cardContent.professor + '教授'} />
                    </Col>
                </Row>
                {props.cardContent.tag.length > 0 && <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Tag__Title" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'Tags : '} />
                    </Col>
                </Row>
                }
                {props.cardContent.tag.length > 0 && <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                    <Paragraph
                        className={"OutlineCard__Sider__Paragraph" + '__' + props.mode}
                        ellipsis={
                            ellipsis
                                ? {
                                    rows: 1,
                                    expandable: false,
                                }
                                : false
                        }
                    >
                        {tags}
                    </Paragraph>
                    {/* <Text cls='Small' fontSize="14" content={tags} /> */}

                </Row>
                }
                <Row className={"OutlineCard__Sider__Row__Like" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__LikeCount" + '__' + props.mode} span={8}>
                        <Text cls='Default' fontSize="14" content={'喜歡數 : ' + props.cardContent.likeCount} />
                    </Col>
                    <Col className={"OutlineCard__Sider__UnlockCount" + '__' + props.mode} span={8}>
                        <Text cls='Default' fontSize="14" content={'購買數 : ' + props.cardContent.unlockCount} />
                    </Col>
                    <Col className={"OutlineCard__Sider__FavoriteCount" + '__' + props.mode} span={8}>
                        <Text cls='Default' fontSize="14" content={'收藏數 : ' + props.cardContent.favoriteCount} />
                    </Col>

                </Row>

                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={16}>
                        <Text cls='Default' fontSize="14" content={props.cardContent.downloadable ? 'Downloadable' : 'Undownloadable'} />
                    </Col>
                    <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={8}>
                        <Text cls='Default' fontSize="14" content={'Coin : ' + props.cardContent.price} />
                    </Col>
                </Row>

            </Sider >
        }</>
    );
    var opSize = 32;
    var authorFontSize = '16';
    var dateFontSize = '12';
    var email = '';
    var author = '';
    var avatar = '';
    var date = props.cardContent.date ? props.cardContent.date : '';
    if (props.mode === 'Post') {
        email = props.cardContent.authorUserObj.userObjEmail ? props.cardContent.authorUserObj.userObjEmail : '';
        author = props.cardContent.authorUserObj.userObjName ? props.cardContent.authorUserObj.userObjName : "";
        avatar = props.cardContent.authorUserObj.userObjAvatar ? props.cardContent.authorUserObj.userObjAvatar : '';
    }
    if (props.mode == 'Note') {
        opSize = 48;
        authorFontSize = '22';
        dateFontSize = '16';
        date = props.cardContent.publishDate;
        if (props.cardContent.headerEmailUserObj) {
            //console.log('1')
            email = props.cardContent.headerEmailUserObj.userObjEmail;
            author = props.cardContent.headerEmailUserObj.userObjName;
            avatar = props.cardContent.headerEmailUserObj.userObjAvatar;
        }
        else {
            email = props.cardContent.headerUserObj.userObjEmail;
            author = props.cardContent.headerUserObj.userObjName;
            avatar = props.cardContent.headerUserObj.userObjAvatar;
        }
    }

    useEffect(() => {
        // set menu
        switch (props.page) {
            case 'QnAOutlinePage': setSider(QnASider); break;
            case 'QnARecommendPage': setSider(QnASider); break;
            case 'RewardOutlinePage': setSider(RewardSider); break;
            case 'RewardRecommendPage': setSider(RewardSider); break;
            case 'CollabOutlinePage': setSider(CollabSider); break;
            case 'CollabRecommendPage': setSider(CollabSider); break;
            case 'NoteOutlinePage': setSider(NoteSider); break;
            case 'MemberPage': setSider(NoteSider); break;
        }
        //console.log(props.page);
    }, [hasLike])
    return (
        <Layout className={"OutlineCard__Layout__Outer" + '__' + props.mode}>
            <Content className={"OutlineCard__Content__Outer" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode}>
                    <Header className={"OutlineCard__Header" + '__' + props.mode} >
                        <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                            <Col onClick={null} className={"OutlineCard__Header__Left" + '__' + props.mode} span={12}>
                                <OPInfo
                                    className="OutlineCard__OPInfo"
                                    mode="Outline"
                                    size={opSize}
                                    author={{ email: email, name: author, avatar: avatar }}
                                    date={date}
                                    authorFontSize={authorFontSize}
                                    dateFontSize={dateFontSize}

                                    setPageProps={props.setPageProps}
                                />
                            </Col>
                            <Col onClick={props.onClick} className={"OutlineCard__Header__Right" + '__' + props.mode} span={12}>
                                <Title mode='Outline' title={props.cardContent.title} size={26} />
                            </Col>
                        </Row>
                    </Header>
                    <Content onClick={props.onClick} className={"OutlineCard__Content__Inner" + '__' + props.mode} >
                        <Paragraph
                            className={"OutlineCard__Paragraph" + '__' + props.mode}
                            ellipsis={
                                ellipsis
                                    ? {
                                        rows: 7,
                                        expandable: false,
                                    }
                                    : false
                            }
                        >
                            {props.cardContent.content}
                        </Paragraph>
                    </Content>

                </Layout>
            </Content>
            {sider}

        </Layout>
    );
}
export default OutlineCard;