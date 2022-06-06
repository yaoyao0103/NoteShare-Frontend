import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dropdown, Space, Menu, message, } from "antd";
import { CalendarOutlined, DollarCircleOutlined, CheckOutlined, DownOutlined } from "@ant-design/icons";
import "./SortMenu.css";
import { NavDropdown } from "react-bootstrap";

const SortMeun = (props) => {
    const [visible, setVisible] = useState(false);
    const [menu, setMenu] = useState(
        <Menu />
    );
    const onClose = () => {
        setVisible(false);
    };
    const SortByPrice=()=>{
        message.info('依照賞金排序')
    };
    const SortByAns=()=>{
        message.info('依照有無解答排序')
    };
    const SortByDate=()=>{
        message.info('依照日期排序')
    };

    const QnAOutlineMenu = (
        <Menu items={
            [
                {
                    label: (<a onClick=
                        {() => {
                           SortByDate();
                        }}
                    >日期</a>),
                    key: "1",
                    icon: <CalendarOutlined />
                },
                {
                    label:(<a onClick=
                        {() => {
                            SortByPrice();
                        }}
                    >賞金</a>),
                    key: "2",
                    icon: <DollarCircleOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByAns();
                        }}
                    >已解答</a>),
                    key: "3",
                    icon: <CheckOutlined />
                },
            ]
        } />
    );
    const NoteOutlineMenu = (
        <Menu items={
            [
                {
                    label: "日期",
                    key: "1",
                    icon: <CalendarOutlined />
                },
                {
                    label: "賞金",
                    key: "2",
                    icon: <DollarCircleOutlined />
                },
                {
                    label: "已解答",
                    key: "3",
                    icon: <CheckOutlined />
                },
            ]
        } />
    );
    const RewardOutlineMenu = (
        <Menu items={
            [
                {
                    label: "日期",
                    key: "1",
                    icon: <CalendarOutlined />
                },
                {
                    label: "賞金",
                    key: "2",
                    icon: <DollarCircleOutlined />
                },
                {
                    label: "已解答",
                    key: "3",
                    icon: <CheckOutlined />
                },
            ]
        } />
    );
    useEffect(() => {
        // set menu
        // eslint-disable-next-line default-case
        switch (props.page) {
            case 'NoteOutlinePage': setMenu(NoteOutlineMenu); break;
            case 'QnAOutlinePage': setMenu(QnAOutlineMenu); break;
            case 'RewardOutlinePage': setMenu(RewardOutlineMenu); break;
            // case 'ColabOutlineVersion': setMenu(VersionDetailMenu); break;
        }
    }, [props])
    return (
        <>
            <Dropdown
                className="SortMenu__Drop"
                overlay={menu}
            >
                <Space className="SortMenu__Space">
                    Sort
                    <DownOutlined />
                </Space>
            </Dropdown>
        </>
    );
}
export default SortMeun;