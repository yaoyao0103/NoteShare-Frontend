import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Pagination, Empty, Spin } from "antd";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import SortMeun from "../SortMenu/SortMenu";
import Text from "../Text/Text";
import OutlineCard from "../OutlineCard/OutlineCard";
import FolderOutlineCard from "../FolderOutlineCard/FolderOutlineCard";
import './PageOutlineContentTemplate.css'
import { LoadingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Cookie from "../Cookies/Cookies";
import { Base64 } from "js-base64";
import axios from "../axios/axios";
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
const { Header, Content, Footer } = Layout;
const cookieParser = new Cookie(document.cookie)
function PageOutlineContentTemplate(props) {
    const [pageN, setPageN] = useState(1);
    const [searchResult, setSearchResult] = useState([]);

    const [pageTotal, setPageTotal] = useState();
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        console.log(props.Post[0].items)
        setSearchResult(oldArray => [oldArray.length = 0, props.Post]);
        var tempcardLists = [];
        const temp = cookieParser.getCookieByName('email')
        if (temp) {
            //console.log(temp)
            var tempEmail = Base64.decode(temp);
        }

        if (!(props.Post[0].totalPages === 0) && props.mode !== 'Folder') {
            //console.log('1111');

            for (let i = 0; i <= props.Post[0].items.length - 1; i++) {
                let hasBuy = false;
                let hasJoin = false;
                let hasLike = false;
                console.log(props.Post[0].items[i])
                if (props.mode === 'Note') {
                    for (let j = 0; j < props.Post[0].items[i].buyer.length; j++) {
                        if (tempEmail === props.Post[0].items[i].buyer[j]) {
                            hasBuy = true;
                            //console.log(props.Post[0].items[i].buyer[j])
                        }

                    }
                    for (let j = 0; j < props.Post[0].items[i].liker.length; j++) {
                        if (tempEmail === props.Post[0].items[i].liker[j]) {
                            hasLike = true;
                            //console.log(props.Post[0].items[i].buyer[j])
                        }

                    }
                }
                if (props.page === 'CollabRecommendPage' || props.page === 'CollabOutlinePage') {
                    for (let j = 0; j < props.Post[0].items[i].email.length; j++) {
                        if (tempEmail === props.Post[0].items[i].email[j]) {
                            hasJoin = true;
                            //console.log(props.Post[0].items[i].email[j])
                        }

                    }
                }
                tempcardLists.push(<OutlineCard setLoggedIn={props.setLoggedIn} setPageProps={props.setPageProps} key={i} email={tempEmail} hasLike={hasLike} hasJoin={hasJoin} hasBuy={hasBuy} page={props.page} mode={props.mode} cardContent={props.Post[0].items[i]} />);
            };

            setCardList(tempcardLists);
        }
        else if (!(props.Post[0].totalPages === 0) && props.mode === 'Folder') {
            console.log(props.Post[0].items[0]);
            // tempcardLists.push(<FolderOutlineCard page={props.page} mode={props.mode} cardContent={props.Post[0].items[0]} author={props.Post[0].items[0].creatorName} />);
            for (let i = 0; i <= props.Post[0].items.length - 1; i++) {
                console.log('1111')
                tempcardLists.push(<FolderOutlineCard page={props.page} mode={props.mode} cardContent={props.Post[0].items[i]} setPageProps={props.setPageProps} setLoggedIn={props.setLoggedIn} />);
            };

            setCardList(tempcardLists);
        }
        else {

            tempcardLists.push(<Empty style={{ width: "100%", marginTop: '2em' }} />);
            setCardList(tempcardLists);
        }
        setPageTotal(props.Post[0].totalPages * 10);
    }, [props.Post]);
    // useEffect(() => {
    //     console.log(cardList);
    // }, [cardList])
    const onChange = (pagenumber) => {
        console.log(pagenumber);
        //setPageN(pagenumber);
        props.changePageNumber(pagenumber);


    }

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 30,
            }}
            spin
        />
    );
    var isFolder = false;
    if (props.mode === 'Folder' || props.isTag)
        isFolder = true;
    return (
        <>
            {(cardList.length > 0) &&
                <MediaContextProvider >
                    <Media at="xl" className='outlineContentTemplate__Media'>
                        <div className="outlineContentTemplate">
                            <Layout className="outlineContentTemplate__Layout__Outer">
                                <div className="outlineContentTemplate__Header">
                                    <Row className="outlineContentTemplate__Header__Row">

                                        <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch isSwitch={props.isFollowingSwitch} ChangeSwitch={props.changeFollowingSwitch} />}</Col>
                                        {/* <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch isSwitch={props.isNoteSwitch} ChangeSwitch={props.changeNoteSwitch} SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col> */}
                                        <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}></Col>
                                        <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 6}>
                                            {!isFolder && !props.isMember &&
                                                <div className="outlineContentTemplate__Dropdown">
                                                    <SortMeun
                                                        changeSortMode={props.changeSortMode}
                                                        page={props.page}
                                                    />
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </div>
                                <Content className="outlineContentTemplate__Content">
                                    {cardList}
                                </Content>
                                <Footer className="outlineContentTemplate__Footer">
                                    <Pagination defaultCurrent={1} current={props.pageNumber} total={pageTotal} onChange={onChange} />
                                </Footer>
                            </Layout>

                        </div>
                    </Media>
                    <Media at="lg" className='outlineContentTemplate__Media'>
                        <div className="outlineContentTemplate">
                            <Layout className="outlineContentTemplate__Layout__Outer">
                                <div className="outlineContentTemplate__Header">
                                    <Row className="outlineContentTemplate__Header__Row">

                                        <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch isSwitch={props.isFollowingSwitch} ChangeSwitch={props.changeFollowingSwitch} />}</Col>
                                        {/* <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch isSwitch={props.isNoteSwitch} ChangeSwitch={props.changeNoteSwitch} SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col> */}
                                        <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}></Col>
                                        <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 6}>
                                            {!isFolder && !props.isMember &&
                                                <div className="outlineContentTemplate__Dropdown">
                                                    <SortMeun
                                                        changeSortMode={props.changeSortMode}
                                                        page={props.page}
                                                    />
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </div>
                                <Content className="outlineContentTemplate__Content">
                                    {cardList}
                                </Content>
                                <Footer className="outlineContentTemplate__Footer">
                                    <Pagination defaultCurrent={1} current={props.pageNumber} total={pageTotal} onChange={onChange} />
                                </Footer>
                            </Layout>

                        </div>
                    </Media>
                    <Media at="md" className='outlineContentTemplate__Media'>
                        <div className="outlineContentTemplate">
                            <Layout className="outlineContentTemplate__Layout__Outer">
                                <div className="outlineContentTemplate__Header">
                                    <Row className="outlineContentTemplate__Header__Row">

                                        <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch isSwitch={props.isFollowingSwitch} ChangeSwitch={props.changeFollowingSwitch} />}</Col>
                                        {/* <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch isSwitch={props.isNoteSwitch} ChangeSwitch={props.changeNoteSwitch} SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col> */}
                                        <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}></Col>
                                        <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 6}>
                                            {!isFolder && !props.isMember &&
                                                <div className="outlineContentTemplate__Dropdown">
                                                    <SortMeun
                                                        changeSortMode={props.changeSortMode}
                                                        page={props.page}
                                                    />
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </div>
                                <Content className="outlineContentTemplate__Content">
                                    {cardList}
                                </Content>
                                <Footer className="outlineContentTemplate__Footer">
                                    <Pagination defaultCurrent={1} current={props.pageNumber} total={pageTotal} onChange={onChange} />
                                </Footer>
                            </Layout>

                        </div>
                    </Media>
                    <Media at="lm" className='outlineContentTemplate__Media'>
                        <div className="outlineContentTemplate">
                            <Layout className="outlineContentTemplate__Layout__Outer">
                                <div className="outlineContentTemplate__Header">
                                    <Row className="outlineContentTemplate__Header__Row">

                                        <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch isSwitch={props.isFollowingSwitch} ChangeSwitch={props.changeFollowingSwitch} />}</Col>
                                        {/* <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch isSwitch={props.isNoteSwitch} ChangeSwitch={props.changeNoteSwitch} SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col> */}
                                        <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}></Col>
                                        <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 6}>
                                            {!isFolder && !props.isMember &&
                                                <div className="outlineContentTemplate__Dropdown">
                                                    <SortMeun
                                                        changeSortMode={props.changeSortMode}
                                                        page={props.page}
                                                    />
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </div>
                                <Content className="outlineContentTemplate__Content">
                                    {cardList}
                                </Content>
                                <Footer className="outlineContentTemplate__Footer">
                                    <Pagination defaultCurrent={1} current={props.pageNumber} total={pageTotal} onChange={onChange} />
                                </Footer>
                            </Layout>

                        </div>
                    </Media>
                    <Media at="sm" className='outlineContentTemplate__Media'>
                        <div className="outlineContentTemplate">
                            <Layout className="outlineContentTemplate__Layout__Outer">
                                <div className="outlineContentTemplate__Header">
                                    <Row className="outlineContentTemplate__Header__Row">

                                        <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch isSwitch={props.isFollowingSwitch} ChangeSwitch={props.changeFollowingSwitch} />}</Col>
                                        {/* <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch isSwitch={props.isNoteSwitch} ChangeSwitch={props.changeNoteSwitch} SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col> */}
                                        <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}></Col>
                                        <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 6}>
                                            {!isFolder && !props.isMember &&
                                                <div className="outlineContentTemplate__Dropdown">
                                                    <SortMeun
                                                        changeSortMode={props.changeSortMode}
                                                        page={props.page}
                                                    />
                                                </div>
                                            }
                                        </Col>
                                    </Row>
                                </div>
                                <Content className="outlineContentTemplate__Content">
                                    {cardList}
                                </Content>
                                <Footer className="outlineContentTemplate__Footer">
                                    <Pagination defaultCurrent={1} current={props.pageNumber} total={pageTotal} onChange={onChange} />
                                </Footer>
                            </Layout>

                        </div>
                    </Media>
                </MediaContextProvider>
            }
        </>

    );

}
export default PageOutlineContentTemplate;