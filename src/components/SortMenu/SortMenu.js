import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dropdown, Space, Menu, message, } from "antd";
import { CalendarOutlined, DollarCircleOutlined, CommentOutlined, DownOutlined, LikeOutlined, UnlockOutlined, StarOutlined } from "@ant-design/icons";
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
    const SortByBestPrice = () => {
        message.info('依照賞金排序');
        props.changeSortMode('bestPrice');
    };
    const SortByPrice = () => {
        message.info('依照價格排序');
        props.changeSortMode('price');
    };
    const SortByAns = () => {
        message.info('依照留言數排序');
        props.changeSortMode('commentCount');
    };
    const SortByDate = () => {
        message.info('依照日期排序');
        props.changeSortMode('date');
    };
    const  SortByLikeCount = () => {
        message.info('依照喜歡數排序');
        props.changeSortMode('likeCount');
    };
    const SortByUnlockCountCount = () => {
        message.info('依照購買數排序');
        props.changeSortMode('unlockCount');
    };
    const  SortByFavoriteCount = () => {
        message.info('依照收藏數排序');
        props.changeSortMode('favoriteCount');
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
                    label: (<a onClick=
                        {() => {
                            SortByBestPrice();
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
                    >留言數</a>),
                    key: "3",
                    icon: <CommentOutlined />
                },
            ]
        } />
    );
    const NoteOutlineMenu = (
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
                    label: (<a onClick=
                        {() => {
                            SortByPrice();
                        }}
                    >價格</a>),
                    key: "2",
                    icon: <DollarCircleOutlined />
                },
                {
                    label:(<a onClick=
                        {() => {
                            SortByLikeCount();
                        }}
                    >喜歡數</a>),
                    key: "3",
                    icon: <LikeOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByUnlockCountCount();
                        }}
                    >購買數</a>),
                    key: "4",
                    icon: <UnlockOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByFavoriteCount();
                        }}
                    >收藏數</a>),
                    key: "4",
                    icon: <StarOutlined />
                },


            ]
        } />
    );
    const RewardOutlineMenu = (
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
                    label: (<a onClick=
                        {() => {
                            SortByBestPrice();
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
                    >留言數</a>),
                    key: "3",
                    icon: <CommentOutlined />
                },
            ]
        } />
    );
    const CollabOutlineMenu = (
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
                    label: (<a onClick=
                        {() => {
                            SortByBestPrice();
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
                    >留言數</a>),
                    key: "3",
                    icon: <CommentOutlined />
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
            case 'CollabOutlinePage': setMenu(CollabOutlineMenu); break;
        }
    }, [props])
    return (
        <>
            <Dropdown
                className="SortMenu__Drop"
                overlay={menu}
                trigger='click'
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