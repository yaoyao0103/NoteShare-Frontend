import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Typography, Modal } from "antd";
import { message } from "antd";
import { EllipsisOutlined, LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import OPInfo from '../OPInfo/OPInfo';
import Title from "../Title/Title";
import Text from "../Text/Text";
import axios from "../axios/axios";
import { Avatar } from 'antd';
import './OutlineCard.css'
import Cookie from "../Cookies/Cookies";
import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        sm: 0,
        lm: 500,
        md: 768,
        lg: 1024,
        xl: 1192,
    },
})

const { Paragraph } = Typography;
const { Header, Content, Sider, Footer } = Layout;
const cookieParser = new Cookie(document.cookie)
function OutlineCard(props) {
    const [width, setWindowWidth] = useState(window.innerWidth)
    useEffect(() => {

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () =>
            window.removeEventListener("resize", updateDimensions);
    }, [])

    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }
    const responsive = {
        showInformation: width >= 500,

    }

    const [ellipsis, setEllipsis] = useState(true);
    const [hasLike, setHasLike] = useState(props.hasLike);
    const [likeNum, setLikeNum] = useState(props.cardContent.likeCount)
    const [sider, setSider] = useState(
        <Sider className={"OutlineCard__Sider__Outer" + '__' + props.mode} width={'35%'}></Sider>
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
        if (props.mode === 'Note') {
            props.setPageProps({
                page: 'NoteDetailPage',
                noteId: id,
            })
        }
        else {
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


    }
    useEffect(() => {
        console.log(likeNum)
    }, [likeNum])
    const likeNote = () => {
        if (cookieParser.getCookieByName('email')) {
            axios.put('/like/note/' + props.cardContent.id + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then((res) => {
                //message.success('Like it successfully!')
                setHasLike(true)
                if (props.hasLike)
                    setLikeNum(props.cardContent.likeCount)
                else
                    setLikeNum(props.cardContent.likeCount + 1)
            }).catch(err => {
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
                    message.error('Server Error! Please refresh again! (like Note Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (like Note Error)")
                }
            });
        }
        else {
            message.error("Please log in first!")
            props.setPageProps({ page: 'LoginPage' })
        }
    }
    const unLikeNote = () => {
        if (cookieParser.getCookieByName('email')) {
            axios.put('/unlike/note/' + props.cardContent.id + '/' + props.email, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            }).then((res) => {
                //message.success('Cancel like successfully!')
                setHasLike(false)
                if (props.hasLike)
                    setLikeNum(props.cardContent.likeCount - 1)
                else
                    setLikeNum(props.cardContent.likeCount)
            }).catch(err => {
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
                    message.error('Server Error! Please refresh again! (Cancel like Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Cancel like Error)")
                }
            });
        }
        else {
            message.error("Please log in first!")
            props.setPageProps({ page: 'LoginPage' })
        }
    }

    const QnASider = (
        <>{props.mode === 'Post' &&
            <Sider onClick={props.onClick} className={"OutlineCard__Sider__Outer" + '__' + props.mode} width='35%' >


                <Row className={"OutlineCard__Sider__First__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={18}>
                        <div>
                            <Text cls='Small' fontSize="5" content={"Department"} />
                        </div>
                        {props.cardContent.department}
                    </Col>

                </Row>
                <Row className={"OutlineCard__Sider__Sec__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={20}>
                        <div>
                            <Text cls='Small' fontSize="5" content={"Subject"} />
                        </div>
                        {props.cardContent.subject}
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Third__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__CommentCount" + '__' + props.mode} span={20}>
                        <div>
                            <Text cls='Small' fontSize="5" content={"Comments"} />
                        </div>
                        {props.cardContent.comments.length}
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>

                {props.cardContent.answers.length !== 0 &&
                    <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                        <Col className={"OutlineCard__Sider__HasBestAns" + '__' + props.mode} span={20}>
                            <Text cls='Default' fontSize="16" content='Answered' color='green' />
                        </Col>
                    </Row>
                }
                {props.cardContent.answers.length === 0 &&
                    <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                        <Col className={"OutlineCard__Sider__Price" + '__' + props.mode} span={20}>
                            <Text cls='Default' fontSize="16" content={'Coin : ' + props.cardContent.bestPrice} color='red' />
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
                        <div>
                            <Text cls='Small' fontSize="5" content={"Department"} />
                        </div>
                        {props.cardContent.department}
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Sec__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={12}>
                        <div>
                            <Text cls='Small' fontSize="5" content={"Subject"} />
                        </div>
                        {props.cardContent.subject}
                    </Col>
                    <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={12}>
                        <div>
                            <Text cls='Small' fontSize="5" content={"Instructor"} />
                        </div>
                        {props.cardContent.professor}
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Third__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__CommentCount" + '__' + props.mode} span={20}>
                        <div>
                            <Text cls='Small' fontSize="5" content={"Comments"} />
                        </div>
                        {props.cardContent.comments.length}
                    </Col>
                </Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>
                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}></Row>

                <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__BestPrice" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'Best Reward : ' + props.cardContent.bestPrice} color="red" />
                    </Col>

                </Row>
                <Row className={"OutlineCard__Sider__Fifth__Row" + '__' + props.mode}>
                    <Col className={"OutlineCard__Sider__RefPrice" + '__' + props.mode} span={20}>
                        <Text cls='Default' fontSize="16" content={'Ref Reward : ' + props.cardContent.referencePrice} color="dark-green" />
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
                                <div>
                                    <Text cls='Small' fontSize="5" content={"Department"} />
                                </div>
                                {props.cardContent.department}
                            </Col>
                        </Row>
                        <Row className={"OutlineCard__Sider__Sec__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={20}>
                                <div>
                                    <Text cls='Small' fontSize="5" content={"Subject"} />
                                </div>
                                {props.cardContent.subject}
                            </Col>
                        </Row>
                        <Row className={"OutlineCard__Sider__Third__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={20}>
                                <div>
                                    <Text cls='Small' fontSize="5" content={"School"} />
                                </div>
                                {props.cardContent.school}
                            </Col>
                        </Row>
                        <Row className={"OutlineCard__Sider__Fourth__Row" + '__' + props.mode}>
                            <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={20}>
                                <div>
                                    <Text cls='Small' fontSize="5" content={"Instructor"} />
                                </div>
                                {props.cardContent.professor}
                            </Col>
                        </Row>
                    </Content>
                    <Footer className={"OutlineCard__Sider__Footer" + '__' + props.mode}>
                        <Row className={"OutlineCard__Sider__Footer__Fir" + '__' + props.mode}>
                            <Col span={6} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>
                                {props.hasJoin &&


                                    <Text cls='Default' fontSize="14" color='green' content={'Joined'} />
                                }
                                {!props.hasJoin &&
                                    <Text cls='Default' fontSize="14" color='red' content={'Not Joined'} />
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
        <>{((props.mode === 'Note' || props.mode === 'Tag') && responsive.showInformation) &&
            < Sider onClick={props.onClick} className={"OutlineCard__Sider__Outer" + '__' + props.mode} width={'35%'} >
                <Layout className={"OutlineCard__Sider__Inner__Layout" + '__' + props.mode}>

                    <Content className={"OutlineCard__Sider__Inner__Content" + '__' + props.mode}>
                        <MediaContextProvider className='OutlineCard__MediaContextProvider'>
                            <Media at="xl" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Department"} />
                                        </div>
                                        {props.cardContent.department}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Subject"} />
                                        </div>
                                        {props.cardContent.subject}
                                    </Col>

                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"School"} />
                                        </div>
                                        {props.cardContent.school}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Instructor"} />
                                        </div>
                                        {props.cardContent.professor}
                                    </Col>
                                </Row>

                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Downloadable"} />
                                        </div>
                                        {props.cardContent.downloadable ? 'Downloadable' : 'Undownloadable'}
                                    </Col>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__LikeCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="8" content={"Likes"} />
                                        </div>
                                        {likeNum}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__FavoriteCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Favorites"} />
                                        </div>
                                        {props.cardContent.favoriteCount}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__UnlockCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Quantity Sold"} />
                                        </div>
                                        {props.cardContent.unlockCount}
                                    </Col>

                                </Row>
                            </Media>
                            <Media at="lg" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Department"} />
                                        </div>
                                        {props.cardContent.department}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Subject"} />
                                        </div>
                                        {props.cardContent.subject}
                                    </Col>

                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"School"} />
                                        </div>
                                        {props.cardContent.school}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Instructor"} />
                                        </div>
                                        {props.cardContent.professor}
                                    </Col>
                                </Row>

                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Downloadable"} />
                                        </div>
                                        {props.cardContent.downloadable ? 'Downloadable' : 'Undownloadable'}
                                    </Col>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__LikeCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="8" content={"Likes"} />
                                        </div>
                                        {likeNum}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__FavoriteCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Favorites"} />
                                        </div>
                                        {props.cardContent.favoriteCount}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__UnlockCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Quantity Sold"} />
                                        </div>
                                        {props.cardContent.unlockCount}
                                    </Col>

                                </Row>
                            </Media>
                            <Media at="md" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Department"} />
                                        </div>
                                        {props.cardContent.department}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Subject"} />
                                        </div>
                                        {props.cardContent.subject}
                                    </Col>

                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"School"} />
                                        </div>
                                        {props.cardContent.school}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Instructor"} />
                                        </div>
                                        {props.cardContent.professor}
                                    </Col>
                                </Row>

                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={12}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Downloadable"} />
                                        </div>
                                        {props.cardContent.downloadable ? 'Downloadable' : 'Undownloadable'}
                                    </Col>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__LikeCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="8" content={"Likes"} />
                                        </div>
                                        {likeNum}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__FavoriteCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Favorites"} />
                                        </div>
                                        {props.cardContent.favoriteCount}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__UnlockCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Quantity Sold"} />
                                        </div>
                                        {props.cardContent.unlockCount}
                                    </Col>

                                </Row>
                            </Media>
                            <Media at="lm" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Department"} />
                                        </div>
                                        {props.cardContent.department}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Subject"} />
                                        </div>
                                        {props.cardContent.subject}
                                    </Col>

                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"School"} />
                                        </div>
                                        {props.cardContent.school}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Instructor"} />
                                        </div>
                                        {props.cardContent.professor}
                                    </Col>
                                </Row>

                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Downloadable"} />
                                        </div>
                                        {props.cardContent.downloadable ? 'Downloadable' : 'Undownloadable'}
                                    </Col>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__LikeCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="8" content={"Likes"} />
                                        </div>
                                        {likeNum}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__FavoriteCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Favorites"} />
                                        </div>
                                        {props.cardContent.favoriteCount}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__UnlockCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Quantity Sold"} />
                                        </div>
                                        {props.cardContent.unlockCount}
                                    </Col>

                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col span={24}>
                                        {props.hasBuy &&
                                            <Text cls='Default' fontSize="14" color='green' content={'Owned'} />
                                        }
                                        {!props.hasBuy &&
                                            <>
                                                <div style={{ displap: 'inline-block' }}>
                                                    <Text cls='Small' fontSize="5" content={"Price"} />
                                                    <span style={{ marginLeft: ".5em", color: "#AE0000" }}>{props.cardContent.price}</span>
                                                </div>

                                            </>
                                            // <Text cls='Default' fontSize="14" color='red' content={'未購買'} />
                                        }
                                    </Col>
                                </Row>
                            </Media>
                            <Media at="sm" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Department"} />
                                        </div>
                                        {props.cardContent.department}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Subject"} />
                                        </div>
                                        {props.cardContent.subject}
                                    </Col>

                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"School"} />
                                        </div>
                                        {props.cardContent.school}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Instructor"} />
                                        </div>
                                        {props.cardContent.professor}
                                    </Col>
                                </Row>

                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={24}>
                                        <div>
                                            <Text cls='Small' fontSize="5" content={"Downloadable"} />
                                        </div>
                                        {props.cardContent.downloadable ? 'Downloadable' : 'Undownloadable'}
                                    </Col>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                </Row>
                                <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                    <Col className={"OutlineCard__Sider__LikeCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="8" content={"Likes"} />
                                        </div>
                                        {likeNum}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__FavoriteCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Favorites"} />
                                        </div>
                                        {props.cardContent.favoriteCount}
                                    </Col>
                                    <Col className={"OutlineCard__Sider__UnlockCount" + '__' + props.mode}>
                                        <div style={{ marginRight: "1em" }}>
                                            <Text cls='Small' fontSize="5" content={"Quantity Sold"} />
                                        </div>
                                        {props.cardContent.unlockCount}
                                    </Col>

                                </Row>
                            </Media>
                        </MediaContextProvider>
                    </Content>
                    <Footer className={"OutlineCard__Sider__Footer" + '__' + props.mode}>
                        <MediaContextProvider className='OutlineCard__MediaContextProvider'>
                            <Media at="xl" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Footer__Fir" + '__' + props.mode}>
                                    <Col span={6} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>{props.hasBuy &&
                                        <Text cls='Default' fontSize="14" color='green' content={'Owned'} />
                                    }
                                        {!props.hasBuy &&
                                            <>
                                                <div>
                                                    <Text cls='Small' fontSize="5" content={"Price"} />
                                                    <span style={{ marginLeft: ".5em", color: "#AE0000" }}>{props.cardContent.price}</span>
                                                </div>

                                            </>
                                            // <Text cls='Default' fontSize="14" color='red' content={'未購買'} />
                                        }
                                    </Col>
                                    <Col span={14}>
                                    </Col>
                                    {!hasLike && <Col hasLike={hasLike} span={2} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>
                                        <LikeOutlined onClick={() => { likeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'}
                                        />


                                    </Col>}
                                    {hasLike && <Col hasLike={hasLike} span={2} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>


                                        <LikeTwoTone onClick={() => { unLikeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'}
                                            twoToneColor="#66e1c1" />

                                    </Col>}

                                </Row>
                            </Media>
                            <Media at="lg" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Footer__Fir" + '__' + props.mode}>
                                    <Col span={6} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>{props.hasBuy &&
                                        <Text cls='Default' fontSize="14" color='green' content={'Owned'} />
                                    }
                                        {!props.hasBuy &&
                                            <>
                                                <div>
                                                    <Text cls='Small' fontSize="5" content={"Price"} />
                                                    <span style={{ marginLeft: ".5em", color: "#AE0000" }}>{props.cardContent.price}</span>
                                                </div>

                                            </>
                                            // <Text cls='Default' fontSize="14" color='red' content={'未購買'} />
                                        }
                                    </Col>
                                    <Col span={12}>
                                    </Col>
                                    {!hasLike && <Col hasLike={hasLike} span={4} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>
                                        <LikeOutlined onClick={() => { likeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'} />


                                    </Col>}
                                    {hasLike && <Col hasLike={hasLike} span={4} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>


                                        <LikeTwoTone onClick={() => { unLikeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'}
                                            twoToneColor="#66e1c1" />

                                    </Col>}

                                </Row>
                            </Media>
                            <Media at="md" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Footer__Fir" + '__' + props.mode}>
                                    <Col span={6} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>{props.hasBuy &&
                                        <Text cls='Default' fontSize="14" color='green' content={'Owned'} />
                                    }
                                        {!props.hasBuy &&
                                            <>
                                                <div>
                                                    <Text cls='Small' fontSize="5" content={"Price"} />
                                                    <span style={{ marginLeft: ".5em", color: "#AE0000" }}>{props.cardContent.price}</span>
                                                </div>

                                            </>
                                            // <Text cls='Default' fontSize="14" color='red' content={'未購買'} />
                                        }
                                    </Col>
                                    <Col span={10}>
                                    </Col>
                                    {!hasLike && <Col hasLike={hasLike} span={6} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>
                                        <LikeOutlined onClick={() => { likeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'} />


                                    </Col>}
                                    {hasLike && <Col hasLike={hasLike} span={6} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>


                                        <LikeTwoTone onClick={() => { unLikeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'}
                                            twoToneColor="#66e1c1" />

                                    </Col>}

                                </Row>
                            </Media>
                            <Media at="lm" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Footer__Fir" + '__' + props.mode}>
                                    <Col span={16} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>
                                    </Col>


                                    {!hasLike && <Col hasLike={hasLike} span={8} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>
                                        <LikeOutlined onClick={() => { likeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'} />


                                    </Col>}
                                    {hasLike && <Col hasLike={hasLike} span={8} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>


                                        <LikeTwoTone onClick={() => { unLikeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'}
                                            twoToneColor="#66e1c1" />

                                    </Col>}

                                </Row>
                            </Media>
                            <Media at="sm" className='OutlineCard__Media'>
                                <Row className={"OutlineCard__Sider__Footer__Fir" + '__' + props.mode}>
                                    <Col span={24} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>{props.hasBuy &&
                                        <Text cls='Default' fontSize="14" color='green' content={'Owned'} />
                                    }
                                        {!props.hasBuy &&
                                            <>
                                                <div>
                                                    <Text cls='Small' fontSize="5" content={"Price"} />
                                                    <span style={{ marginLeft: ".5em", color: "#AE0000" }}>{props.cardContent.price}</span>
                                                </div>

                                            </>
                                            // <Text cls='Default' fontSize="14" color='red' content={'未購買'} />
                                        }
                                    </Col>
                                    <Col span={24}>
                                    </Col>
                                    {!hasLike && <Col hasLike={hasLike} span={24} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>
                                        <LikeOutlined onClick={() => { likeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'} />


                                    </Col>}
                                    {hasLike && <Col hasLike={hasLike} span={24} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>


                                        <LikeTwoTone onClick={() => { unLikeNote() }} style={{
                                            fontSize: '26px',
                                        }} size={'large'}
                                            twoToneColor="#66e1c1" />

                                    </Col>}

                                </Row>
                            </Media>
                        </MediaContextProvider>
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
    var avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
    var date = props.cardContent.date ? props.cardContent.date : '';
    if (props.mode === 'Post') {
        email = props.cardContent.authorUserObj.userObjEmail ? props.cardContent.authorUserObj.userObjEmail : '';
        author = props.cardContent.authorUserObj.userObjName ? props.cardContent.authorUserObj.userObjName : "";
        avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
    }
    if (props.mode == 'Note') {
        opSize = 48;
        authorFontSize = '20';
        dateFontSize = '16';
        date = props.cardContent.publishDate;
        if (props.cardContent.headerEmailUserObj) {
            //console.log('1')
            email = props.cardContent.headerEmailUserObj.userObjEmail;
            author = props.cardContent.headerEmailUserObj.userObjName;
            avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
        }
        else {
            email = props.cardContent.headerUserObj.userObjEmail;
            author = props.cardContent.headerUserObj.userObjName;
            avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
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
            case 'TagOutlinePage': setSider(NoteSider); break;
            case 'MemberPage': setSider(NoteSider); break;
        }
        //console.log(props.page);
    }, [hasLike, likeNum])
    return (

        <Layout className={"OutlineCard__Layout__Outer" + '__' + props.mode}>
            <Content className={"OutlineCard__Content__Outer" + '__' + props.mode} >
                <MediaContextProvider className='OutlineCard__MediaContextProvider'>
                    {props.mode === 'Post' &&
                        <Media at="xl" className='OutlineCard__Media'>
                            <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                                <Header className={"OutlineCard__Header" + '__' + props.mode} >
                                    <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                                        <Col onClick={props.onClick} className={"OutlineCard__Header__Right" + '__' + props.mode} span={props.mode == 'Note' ? 15 : 24}>
                                            <p style={{ fontSize: '26px', paddingLeft: '1.5em', textAlign: 'left', paddingTop: '.5em' }}>{props.cardContent.title}</p>
                                        </Col>
                                        <Col onClick={null} className={"OutlineCard__Header__Left" + '__' + props.mode} span={props.mode == 'Note' ? 9 : 24}>
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

                                        <Col span={0}></Col>
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
                                        {props.cardContent.description ? props.cardContent.description : props.cardContent.content}
                                    </Paragraph>
                                </Content>
                                {props.mode == 'Note' &&
                                    <Footer className="OutlineCard__Footer">
                                        <div className={"OutlineCard__Tags__outer"}>
                                            <Text cls='Small' fontSize="18" content={"Tags"} />
                                            <Paragraph
                                                className={"OutlineCard__Tags"}
                                                ellipsis={
                                                    ellipsis
                                                        ? {
                                                            rows: 2,
                                                            expandable: false,
                                                        }
                                                        : false
                                                }
                                            >
                                                {tags}
                                            </Paragraph>
                                        </div>
                                    </Footer>
                                }
                            </Layout>
                        </Media>
                    }
                    {props.mode === 'Note' &&
                        <Media at="xl" className='OutlineCard__Media'>
                            <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                                <Header className={"OutlineCard__Header" + '__' + props.mode} >
                                    <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                                        <Col onClick={null} className={"OutlineCard__Header__Left" + '__' + props.mode} span={props.mode == 'Note' ? 9 : 11}>
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
                                        <Col onClick={props.onClick} className={"OutlineCard__Header__Right" + '__' + props.mode} span={props.mode == 'Note' ? 15 : 12}>
                                            <p style={{ fontSize: '26px', textAlign: 'center', paddingTop: '.5em' }}>{props.cardContent.title}</p>
                                        </Col>
                                        <Col span={0}></Col>
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
                                        {props.cardContent.description ? props.cardContent.description : props.cardContent.content}
                                    </Paragraph>
                                </Content>
                                {props.mode === 'Note' &&
                                    <Footer className="OutlineCard__Footer">
                                        <div className={"OutlineCard__Tags__outer"}>
                                            <Text cls='Small' fontSize="18" content={"Tags"} />
                                            <Paragraph
                                                className={"OutlineCard__Tags"}
                                                ellipsis={
                                                    ellipsis
                                                        ? {
                                                            rows: 2,
                                                            expandable: false,
                                                        }
                                                        : false
                                                }
                                            >
                                                {tags}
                                            </Paragraph>
                                        </div>
                                    </Footer>
                                }
                            </Layout>
                        </Media>
                    }
                    {props.mode === 'Post' &&
                        <Media at="lg" className='OutlineCard__Media'>
                            <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                                <Header className={"OutlineCard__Header" + '__' + props.mode} >
                                    <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                                        <Col onClick={props.onClick} className={"OutlineCard__Header__Right" + '__' + props.mode} span={props.mode == 'Note' ? 15 : 24}>
                                            <p style={{ fontSize: '26px', paddingLeft: '1.5em', textAlign: 'left', paddingTop: '.5em' }}>{props.cardContent.title}</p>
                                        </Col>
                                        <Col onClick={null} className={"OutlineCard__Header__Left" + '__' + props.mode} span={props.mode == 'Note' ? 9 : 24}>
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

                                        <Col span={0}></Col>
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
                                        {props.cardContent.description ? props.cardContent.description : props.cardContent.content}
                                    </Paragraph>
                                </Content>
                                {props.mode == 'Note' &&
                                    <Footer className="OutlineCard__Footer">
                                        <div className={"OutlineCard__Tags__outer"}>
                                            <Text cls='Small' fontSize="18" content={"Tags"} />
                                            <Paragraph
                                                className={"OutlineCard__Tags"}
                                                ellipsis={
                                                    ellipsis
                                                        ? {
                                                            rows: 2,
                                                            expandable: false,
                                                        }
                                                        : false
                                                }
                                            >
                                                {tags}
                                            </Paragraph>
                                        </div>
                                    </Footer>
                                }
                            </Layout>
                        </Media>
                    }
                    {props.mode === 'Note' &&
                        <Media at="lg" className='OutlineCard__Media'>
                            <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                                <Header className={"OutlineCard__Header" + '__' + props.mode} >
                                    <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                                        <Col onClick={null} className={"OutlineCard__Header__Left" + '__' + props.mode} span={props.mode == 'Note' ? 9 : 14}>
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
                                        <Col onClick={props.onClick} className={"OutlineCard__Header__Right" + '__' + props.mode} span={props.mode == 'Note' ? 15 : 10}>
                                            <p style={{ fontSize: '26px', textAlign: 'center', paddingTop: '.5em' }}>{props.cardContent.title}</p>
                                        </Col>
                                        <Col span={0}></Col>
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
                                        {props.cardContent.description ? props.cardContent.description : props.cardContent.content}
                                    </Paragraph>
                                </Content>
                                {props.mode == 'Note' &&
                                    <Footer className="OutlineCard__Footer">
                                        <div className={"OutlineCard__Tags__outer"}>
                                            <Text cls='Small' fontSize="18" content={"Tags"} />
                                            <Paragraph
                                                className={"OutlineCard__Tags"}
                                                ellipsis={
                                                    ellipsis
                                                        ? {
                                                            rows: 2,
                                                            expandable: false,
                                                        }
                                                        : false
                                                }
                                            >
                                                {tags}
                                            </Paragraph>
                                        </div>
                                    </Footer>
                                }
                            </Layout>
                        </Media>
                    }
                    <Media at="md" className='OutlineCard__Media'>
                        <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                            <Header className={"OutlineCard__Header" + '__' + props.mode} >
                                <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                                    <Col onClick={null} className={"OutlineCard__Header__Left" + '__' + props.mode} span={props.mode == 'Note' ? 11 : 10}>
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
                                    <Col onClick={props.onClick} className={"OutlineCard__Header__Right" + '__' + props.mode} span={props.mode == 'Note' ? 13 : 14}>
                                        <p style={{ fontSize: '26px', textAlign: 'center', paddingTop: '.5em' }}>{props.cardContent.title}</p>
                                    </Col>
                                    <Col span={0}></Col>
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
                                    {props.cardContent.description ? props.cardContent.description : props.cardContent.content}
                                </Paragraph>
                            </Content>
                            {props.mode == 'Note' &&
                                <Footer className="OutlineCard__Footer">
                                    <div className={"OutlineCard__Tags__outer"}>
                                        <Text cls='Small' fontSize="18" content={"Tags"} />
                                        <Paragraph
                                            className={"OutlineCard__Tags"}
                                            ellipsis={
                                                ellipsis
                                                    ? {
                                                        rows: 2,
                                                        expandable: false,
                                                    }
                                                    : false
                                            }
                                        >
                                            {tags}
                                        </Paragraph>
                                    </div>
                                </Footer>
                            }
                        </Layout>
                    </Media>
                    <Media at="lm" className='OutlineCard__Media'>
                        <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                            <Header className={"OutlineCard__Header" + '__' + props.mode} >
                                <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                                    <Col onClick={props.onClick} className={"OutlineCard__Header__Right" + '__' + props.mode} span={props.mode == 'Note' ? 24 : 24}>
                                        <p style={{ fontSize: '26px', paddingLeft: '1em', textAlign: 'left', paddingTop: '.5em' }}>{props.cardContent.title}</p>
                                    </Col>
                                    <Col onClick={null} className={"OutlineCard__Header__Left" + '__' + props.mode} span={props.mode == 'Note' ? 17 : 24}>
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
                                </Row>
                            </Header>
                            <Content onClick={props.onClick} className={"OutlineCard__Content__Inner" + '__' + props.mode} >
                                <Paragraph
                                    className={"OutlineCard__Paragraph" + '__' + props.mode}
                                    ellipsis={
                                        ellipsis
                                            ? {
                                                rows: 4,
                                                expandable: false,
                                            }
                                            : false
                                    }
                                >
                                    {props.cardContent.description ? props.cardContent.description : props.cardContent.content}
                                </Paragraph>
                            </Content>
                            {props.mode == 'Note' &&
                                <Footer className="OutlineCard__Footer">
                                    <div >
                                        <Text cls='Small' fontSize="18" content={"Tags"} />
                                        <Paragraph
                                            className={"OutlineCard__Tags"}
                                            ellipsis={
                                                ellipsis
                                                    ? {
                                                        rows: 2,
                                                        expandable: false,
                                                    }
                                                    : false
                                            }
                                        >
                                            {tags}
                                        </Paragraph>
                                    </div>
                                    {/* <Row className={"OutlineCard__Footer__Fir" + '__' + props.mode}>
                                        <Col span={21}></Col>

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

                                    </Row> */}
                                </Footer>
                            }
                        </Layout>
                    </Media>
                    <Media at="sm" className='OutlineCard__Media'>
                        <Layout className={"OutlineCard__Layout__Inner" + '__' + props.mode}>
                            <Header className={"OutlineCard__Header" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                                <Row className={"OutlineCard__Header__Row" + '__' + props.mode}>
                                    <Col onClick={props.onClick} className={"OutlineCard__Header__Right" + '__' + props.mode} span={props.mode == 'Note' ? 24 : 24}>
                                        <p style={{ fontSize: '26px', textAlign: 'center', paddingTop: '.5em' }}>{props.cardContent.title}</p>
                                    </Col>
                                    <Col onClick={null} className={"OutlineCard__Header__Left" + '__' + props.mode} span={props.mode == 'Note' ? 18 : 24}>
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
                                    {props.mode === 'Note' &&
                                        <Col span={6} className={"OutlineCard__Sider__Footer__Buy" + '__' + props.mode}>{props.hasBuy &&
                                            <Text cls='Default' fontSize="14" color='green' content={'Owned'} />
                                        }
                                            {!props.hasBuy &&
                                                <>
                                                    <div>
                                                        <Text cls='Small' fontSize="5" content={"Price"} />
                                                        <span style={{ marginLeft: ".5em", color: "#AE0000" }}>{props.cardContent.price}</span>
                                                    </div>

                                                </>
                                                // <Text cls='Default' fontSize="14" color='red' content={'未購買'} />
                                            }
                                        </Col>

                                    }


                                </Row>
                            </Header>
                            <Content className={"OutlineCard__Content__Inner" + '__' + props.mode} onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                                <Paragraph
                                    className={"OutlineCard__Paragraph" + '__' + props.mode}
                                    ellipsis={
                                        ellipsis
                                            ? {
                                                rows: 3,
                                                expandable: false,
                                            }
                                            : false
                                    }
                                >
                                    {props.cardContent.description ? props.cardContent.description : props.cardContent.content}
                                </Paragraph>
                            </Content>
                            {props.mode == 'Note' &&
                                <Footer className="OutlineCard__Footer">
                                    <div onClick={() => onClickCard(props.cardContent.type, props.cardContent.id)}>
                                        <Text cls='Small' fontSize="18" content={"Tags"} />
                                        <Paragraph
                                            className={"OutlineCard__Tags"}
                                            ellipsis={
                                                ellipsis
                                                    ? {
                                                        rows: 2,
                                                        expandable: false,
                                                    }
                                                    : false
                                            }
                                        >
                                            {tags}
                                        </Paragraph>
                                    </div>

                                    <Row className={"OutlineCard__Footer__Fir" + '__' + props.mode}>
                                        <Col span={22} onClick={() => Modal.info({
                                            title: 'This is a notification message',
                                            content: (
                                                <div>
                                                    <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                                        <Col className={"OutlineCard__Sider__Department" + '__' + props.mode} span={24}>
                                                            <div>
                                                                <Text cls='Small' fontSize="5" content={"Department"} />
                                                            </div>
                                                            {props.cardContent.department}
                                                        </Col>
                                                        <Col className={"OutlineCard__Sider__Subject" + '__' + props.mode} span={24}>
                                                            <div>
                                                                <Text cls='Small' fontSize="5" content={"Subject"} />
                                                            </div>
                                                            {props.cardContent.subject}
                                                        </Col>

                                                    </Row>
                                                    <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                                        <Col className={"OutlineCard__Sider__School" + '__' + props.mode} span={24}>
                                                            <div>
                                                                <Text cls='Small' fontSize="5" content={"School"} />
                                                            </div>
                                                            {props.cardContent.school}
                                                        </Col>
                                                        <Col className={"OutlineCard__Sider__Professor" + '__' + props.mode} span={24}>
                                                            <div>
                                                                <Text cls='Small' fontSize="5" content={"Instructor"} />
                                                            </div>
                                                            {props.cardContent.professor}
                                                        </Col>
                                                    </Row>

                                                    <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                                        <Col className={"OutlineCard__Sider__Downloadable" + '__' + props.mode} span={24}>
                                                            <div>
                                                                <Text cls='Small' fontSize="5" content={"Downloadable"} />
                                                            </div>
                                                            {props.cardContent.downloadable ? 'Downloadable' : 'Undownloadable'}
                                                        </Col>
                                                    </Row>
                                                    <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                                    </Row>
                                                    <Row className={"OutlineCard__Sider__Row" + '__' + props.mode}>
                                                        <Col className={"OutlineCard__Sider__LikeCount" + '__' + props.mode}>
                                                            <div style={{ marginRight: "1em" }}>
                                                                <Text cls='Small' fontSize="8" content={"Likes"} />
                                                            </div>
                                                            {likeNum}
                                                        </Col>
                                                        <Col className={"OutlineCard__Sider__FavoriteCount" + '__' + props.mode}>
                                                            <div style={{ marginRight: "1em" }}>
                                                                <Text cls='Small' fontSize="5" content={"Favorites"} />
                                                            </div>
                                                            {props.cardContent.favoriteCount}
                                                        </Col>
                                                        <Col className={"OutlineCard__Sider__UnlockCount" + '__' + props.mode}>
                                                            <div style={{ marginRight: "1em" }}>
                                                                <Text cls='Small' fontSize="5" content={"Quantity Sold"} />
                                                            </div>
                                                            {props.cardContent.unlockCount}
                                                        </Col>

                                                    </Row>
                                                </div>
                                            ),

                                            onOk() { },
                                        })}>
                                            <Text cls='Default' fontSize="26" content={"See more"} color={"purple"} />
                                        </Col>

                                        {!hasLike && <Col hasLike={hasLike} span={2} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>
                                            <LikeOutlined onClick={() => { likeNote() }} style={{
                                                fontSize: '26px',
                                            }} size={'large'} />


                                        </Col>}
                                        {hasLike && <Col hasLike={hasLike} span={2} className={"OutlineCard__Sider__Footer__Icon" + '__' + props.mode}>


                                            <LikeTwoTone onClick={() => { unLikeNote() }} style={{
                                                fontSize: '26px',
                                            }} size={'large'}
                                                twoToneColor="#66e1c1" />

                                        </Col>}

                                    </Row>
                                </Footer>
                            }
                        </Layout>
                    </Media>
                </MediaContextProvider>
            </Content>
            {sider}
        </Layout >


    );
}
export default OutlineCard;