import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Pagination } from "antd";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import SortMeun from "../SortMenu/SortMenu";
import OutlineCard from "../OutlineCard/OutlineCard";
import './PageOutlineContentTemplate.css'
import axios from "axios";
const { Header, Content, Footer } = Layout;

function PageOutlineContentTemplate(props) {
    const [pageN, setPageN] = useState();
    const [searchResult, setSearchResult] = useState([]);

    const [pageTotal, setPageTotal] = useState();
    const [cardList, setCardList] = useState([]);
    useEffect(() => {
        setSearchResult(oldArray => [oldArray.length = 0, props.Post]);
        //console.log(props.Post);
        //console.log(searchResult);
    }, [props.Post]);
    useEffect(() => {
        var tempcardLists = [];
        for (let i = 0; i <= props.Post[0].items.length - 1; i++) {
            tempcardLists.push(<OutlineCard page={props.page} mode={props.mode} cardContent={props.Post[0].items[i]} author={props.Post[0].items[i].authorName} />);
        };

        setCardList(tempcardLists);
        setPageTotal(props.Post[0].totalPages * 10);
    }, [props.Post]);
    useEffect(() => {
        console.log(cardList);
    }, [cardList])
    const onChange = (pagenumber) => {
        //console.log(pagenumber);
        props.changePageNumber(pagenumber);
        setPageN(pagenumber);
    }
    return (
        <>
            {cardList.length > 0 &&
                <div className="outlineContentTemplate">
                    <Layout className="outlineContentTemplate__Layout__Outer">
                        <Header className="outlineContentTemplate__Header">
                            <Row className="outlineContentTemplate__Header__Row">
                                <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch />}</Col>
                                <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col>
                                <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 6}>
                                    <div className="outlineContentTemplate__Dropdown">
                                        <SortMeun
                                            changeSortMode={props.changeSortMode}
                                            page={props.page}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Header>
                        <Content className="outlineContentTemplate__Content">
                            {cardList}
                        </Content>
                        <Footer className="outlineContentTemplate__Footer">
                            <Pagination defaultCurrent={1} total={pageTotal} onChange={onChange} />
                        </Footer>
                    </Layout>

                </div>

            }
        </>

    );

}
export default PageOutlineContentTemplate;