import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Pagination, Empty, Spin } from "antd";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import SortMeun from "../SortMenu/SortMenu";
import OutlineCard from "../OutlineCard/OutlineCard";
import FolderOutlineCard from "../FolderOutlineCard/FolderOutlineCard";
import './PageOutlineContentTemplate.css'
import { LoadingOutlined } from '@ant-design/icons';
import axios from "axios";
const { Header, Content, Footer } = Layout;

function PageOutlineContentTemplate(props) {
    const [pageN, setPageN] = useState(1);
    const [searchResult, setSearchResult] = useState([]);

    const [pageTotal, setPageTotal] = useState();
    const [cardList, setCardList] = useState([]);
    useEffect(() => {
        setSearchResult(oldArray => [oldArray.length = 0, props.Post]);
        //console.log(props.Post);
        //console.log(searchResult);
    }, [props.Post]);
    useEffect(() => {
        console.log(props.Post[0].items)
        var tempcardLists = [];

        if (!(props.Post[0].totalPages === 0) && props.mode !== 'Folder') {
            console.log('1111');
            for (let i = 0; i <= props.Post[0].items.length - 1; i++) {
                tempcardLists.push(<OutlineCard onClick={() => onClickCard(props.Post[0].items[i].type, props.Post[0].items[i].id)} setPageProps={props.setPageProps} page={props.page} mode={props.mode} cardContent={props.Post[0].items[i]} />);
            };

            setCardList(tempcardLists);
        }
        else if (!(props.Post[0].totalPages === 0) && props.mode === 'Folder') {
            console.log('1111');
            // tempcardLists.push(<FolderOutlineCard page={props.page} mode={props.mode} cardContent={props.Post[0].items[0]} author={props.Post[0].items[0].creatorName} />);
            for (let i = 0; i <= props.Post[0].items.length - 1; i++) {
                tempcardLists.push(<FolderOutlineCard page={props.page} mode={props.mode} cardContent={props.Post[0].items[i]} setPageProps={props.setPageProps} />);
            };

            setCardList(tempcardLists);
        }
        else {

            tempcardLists.push(<Empty />);
            setCardList(tempcardLists);
        }
        setPageTotal(props.Post[0].totalPages * 10);
    }, [props.Post]);
    useEffect(() => {
        console.log(cardList);
    }, [cardList])
    const onChange = (pagenumber) => {
        console.log(pagenumber);
        setPageN(pagenumber);
        props.changePageNumber(pagenumber);


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
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 30,
            }}
            spin
        />
    );
    var isFolder = false;
    if (props.mode === 'Folder')
        isFolder = true;
    return (
        <>
            {cardList.length > 0 &&
                <div className="outlineContentTemplate">
                    <Layout className="outlineContentTemplate__Layout__Outer">
                        <Header className="outlineContentTemplate__Header">
                            <Row className="outlineContentTemplate__Header__Row">
                                <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch isSwitch={props.isFollowingSwitch} ChangeSwitch={props.changeFollowingSwitch} />}</Col>
                                <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch isSwitch={props.isNoteSwitch} ChangeSwitch={props.changeNoteSwitch} SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col>
                                <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 6}>
                                    {!isFolder &&
                                        <div className="outlineContentTemplate__Dropdown">
                                            <SortMeun
                                                changeSortMode={props.changeSortMode}
                                                page={props.page}
                                            />
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </Header>
                        <Content className="outlineContentTemplate__Content">
                            {cardList}
                        </Content>
                        <Footer className="outlineContentTemplate__Footer">
                            <Pagination defaultCurrent={1} current={props.pageNumber} total={pageTotal} onChange={onChange} />
                        </Footer>
                    </Layout>

                </div>

            }
        </>

    );

}
export default PageOutlineContentTemplate;