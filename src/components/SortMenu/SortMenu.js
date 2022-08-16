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
        message.info('Sorted by Price');
        props.changeSortMode('bestPrice');
    };
    const SortByPrice = () => {
        message.info('Sorted by Price');
        props.changeSortMode('price');
    };
    const SortByAns = () => {
        message.info('Sorted by Comments');
        props.changeSortMode('commentCount');
    };
    const SortByDate = () => {
        message.info('Sorted by Date');
        props.changeSortMode('date');
    };
    const  SortByLikeCount = () => {
        message.info('Sorted by Likes');
        props.changeSortMode('likeCount');
    };
    const SortByUnlockCountCount = () => {
        message.info('Sorted by Quantity Sold');
        props.changeSortMode('unlockCount');
    };
    const  SortByFavoriteCount = () => {
        message.info('Sorted by Favorites');
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
                    >Date</a>),
                    key: "1",
                    icon: <CalendarOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByBestPrice();
                        }}
                    >Price</a>),
                    key: "2",
                    icon: <DollarCircleOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByAns();
                        }}
                    >Comments</a>),
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
                    >Date</a>),
                    key: "1",
                    icon: <CalendarOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByPrice();
                        }}
                    >Price</a>),
                    key: "2",
                    icon: <DollarCircleOutlined />
                },
                {
                    label:(<a onClick=
                        {() => {
                            SortByLikeCount();
                        }}
                    >Likes</a>),
                    key: "3",
                    icon: <LikeOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByUnlockCountCount();
                        }}
                    >Quantity Sold</a>),
                    key: "4",
                    icon: <UnlockOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByFavoriteCount();
                        }}
                    >Favorites</a>),
                    key: "5",
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
                    >Date</a>),
                    key: "1",
                    icon: <CalendarOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByBestPrice();
                        }}
                    >Price</a>),
                    key: "2",
                    icon: <DollarCircleOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByAns();
                        }}
                    >Comments</a>),
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
                    >Date</a>),
                    key: "1",
                    icon: <CalendarOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByBestPrice();
                        }}
                    >Price</a>),
                    key: "2",
                    icon: <DollarCircleOutlined />
                },
                {
                    label: (<a onClick=
                        {() => {
                            SortByAns();
                        }}
                    >Comments</a>),
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
            case 'MemberPage': setMenu(NoteOutlineMenu); break;
            case 'QnAOutlinePage': setMenu(QnAOutlineMenu); break;
            case 'QnARecommendPage': setMenu(QnAOutlineMenu); break;
            case 'RewardOutlinePage': setMenu(RewardOutlineMenu); break;
            case 'RewardRecommendPage': setMenu(RewardOutlineMenu); break;
            case 'CollabOutlinePage': setMenu(CollabOutlineMenu); break;
            case 'CollabRecommendPage': setMenu(CollabOutlineMenu); break;
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