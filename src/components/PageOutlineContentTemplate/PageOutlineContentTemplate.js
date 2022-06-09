import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Pagination } from "antd";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import SortMeun from "../SortMenu/SortMenu";
import OutlineCard from "../OutlineCard/OutlineCard";
import './PageOutlineContentTemplate.css'
const { Header, Content, Sider, Footer } = Layout;

function PageOutlineContentTemplate(props) {
    const [pageN,setPageN]=useState();
    const cardLists = [];
    const searchResult = props.Post;
    //console.log(searchResult);
    for (let i = 0; i <= searchResult.length - 1; i++) {
        //記得在JSX中使用JS變數要用花括號包著
        cardLists.push(<OutlineCard page={props.page} mode='Post' cardContent={searchResult[i]} />)
    };
    // useEffect(() => {
    //     cardLists=[];
    //     for (let i = 0; i <= searchResult.length - 1; i++) {
    //         //記得在JSX中使用JS變數要用花括號包著
    //         cardLists.push(<OutlineCard page={props.page} mode='Post' cardContent={searchResult[i]} />)
    //     };
    // },pageN);
    const onChange =(pagenumber)=>{
        //console.log(pagenumber);
        props.changePageNumber(pagenumber);
        setPageN(pagenumber);
    }
    return (
        <div className="outlineContentTemplate">
            <Layout className="outlineContentTemplate__Layout__Outer">
                <Header className="outlineContentTemplate__Header">
                    <Row className="outlineContentTemplate__Header__Row">
                        <Col className="outlineContentTemplate__Header__RecommendSwitch" span={props.hasSwitch ? 6 : 9}> {props.hasSwitch && <ToggleSwitch />}</Col>
                        <Col className="outlineContentTemplate__Header__FolderSwitch" span={props.hasSwitch ? 6 : 9}>{props.hasSwitch && <ToggleSwitch SwitchLeft='Note' SwitchRight="Folder" checkedColor="#8015e8" />}</Col>
                        <Col className="outlineContentTemplate__Header__Dropdown" span={props.hasSwitch ? 12 : 6}>
                            <div className="outlineContentTemplate__Dropdown">
                                <SortMeun
                                    page={props.page}
                                />
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content className="outlineContentTemplate__Content">
                    {cardLists}
                </Content>
                <Footer className="outlineContentTemplate__Footer">
                    <Pagination defaultCurrent={1} total={20} onChange={onChange} />
                </Footer>
            </Layout>

        </div>



    );

}
export default PageOutlineContentTemplate;