import React, { useState, useEffect } from "react";
import { Tooltip, List, Comment, Mentions, Avatar, message, notification, Row, Col, Menu, Dropdown, Input, Popconfirm } from "antd";
import Text from "../Text/Text";
import Button from "../Button/Button";
import './CommentArea.css'
import { LikeOutlined, LikeFilled, EditOutlined, DeleteOutlined, MoreOutlined, CloseOutlined } from "@ant-design/icons";
import moment from 'moment';
import axios from '../axios/axios'
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';
import OptionMenu from "../OptionMenu/OptionMenu";
import { set } from "react-hook-form";
import ContentEditor from "../../pages/NoteDetailPage/ContentEditor/ContentEditor";

const { Option } = Mentions;
const cookieParser = new Cookie(document.cookie)
function CommentArea(props) {
    const [comments, setComments] = useState([]);
    const [authors, setAuthors] = useState({});
    const [tag, setTag] = useState({
        '@': [],
        '#': ['1.0', '2.0', '3.0'],
        '$': [],
    });
    const [comment, setComment] = useState('');
    const [likeCount, setLikeCount] = useState({});
    const [likeColor, setLikeColor] = useState({});
    const [prefix, setPrefix] = useState('@');
    const [bestAns, setBestAns] = useState([]);
    const [email, setEmail] = useState('00857028@email.ntou.edu.tw')
    const [isArchive, setIsArchive] = useState(false)
    const [commentEditFloor, setCommentEditFloor] = useState(-1)
    const [editingComment, setEditingComment] = useState('')

    const openNotification = () => {
        setIsArchive(true)
        notification.open({
            message: 'The post has been archived by author!',
            description:
                'After being archived, you cannot leave any comment or click the like button',
            placement: 'bottomLeft'
        });
    };

    useEffect(() => {
        console.log("Comment: ", props)
        refresh()
        if (props.isArchive && !isArchive) openNotification()
    }, [props])

    const onSearch = (_, newPrefix) => {
        setPrefix(newPrefix);
    };

    const refresh = () => {

        const temp = cookieParser.getCookieByName('email')
        if (temp) {
            var tempEmail = Base64.decode(temp);
        }
        setEmail(tempEmail)
        console.log(tempEmail)
        const type = props.page == 'NoteDetailPage' ? 'note' : 'post'
        axios.get(`/${type}/${props.id}`)
            .then(res => {
                const tempComment = res.data.res.commentsUserObj
                for (let i = 0; i < tempComment.length; i++) {
                    if (tempComment[i].content) {
                        tempComment[i].contentEdit = tempComment[i].content
                        tempComment[i].content = transContent(tempComment[i].content)

                    }

                }
                setComments(tempComment);
                let authorArray = new Object();
                let likeCount = new Object();
                let likeColor = new Object();
                tempComment.map(item => {
                    if (item.date) {
                        if (item.best) {
                            setBestAns([item])
                            props.setIsAnswered(true)
                        }
                        authorArray[item.id] = item.userObj.userObjName ? item.userObj.userObjName : null
                        likeCount[item.id] = item.likeCount ? item.likeCount : 0;
                        let flag = false;
                        if (item.likerUserObj) {
                            for (let i = 0; i < item.likerUserObj.length; i++) {
                                if (item.likerUserObj[i].userObjEmail == tempEmail) {
                                    flag = true;
                                    break;
                                }
                            }
                            if (flag) {
                                likeColor[item.id] = true;
                            }
                        }
                    }
                });
                setAuthors(authorArray);
                setLikeCount(likeCount);
                setLikeColor(likeColor);
               
                if (tempEmail) {
                    axios.get("/note/all/" + tempEmail, {
                        headers: {
                            'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                        }
                    }).then(res => {
                        console.log(res.data.res)
                        const temp = res.data.res
                        let noteArray = new Object();
                        temp.map((item, index) => {
                            noteArray[index] = item.title + '(noteId :' + item.id + ')'
                        });
                        setTag({
                            '@': [...new Set(Object.values(authorArray))],
                            '#': [...new Set(Object.values(noteArray))]
                        });
                    }).catch((error) => {
                        //setGetFolderFail(true);
                        console.log(error)
                        if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                            if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                                document.cookie = 'error=Jwt'
                                message.destroy()
                                message.warning('The connection timed out, please login again !')
                                document.cookie = 'email=;'
                                props.setLoggedIn(false)
                                props.setPageProps({ page: 'LoginPage' })
                            }
                            else
                                document.cookie = 'error=true'
                            message.error('Server Error! Please refresh again! (Get All Notes Error)')
                        }
                        else {
                            message.error("Server Error! Please try again later. (Get All Notes Error)")
                        }
                    });
                }
                else {
                    setTag({
                        '@': [...new Set(Object.values(authorArray))],
                        '#': [],

                    });
                }

            })
            .catch(err => {
                console.log(err)
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
                    message.error('Server Error! Please refresh again! (Refresh Error)')
                }
                else {
                    message.error("Server Error! Please try again later.(Refresh Error)")
                }

            })
    }


    const like = (commentId) => {
        if (cookieParser.getCookieByName("email")) {
            axios.put(`/favorite/${props.type}/${props.id}/${commentId}/${email}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    console.log(res.data.res)
                    //message.success("You liked the comment!")
                    refresh()
                })
                .catch(err => {
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
                        message.error('Server Error! Please refresh again! (Like Comment Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Like Comment Error)")
                    }

                })
        }
        else {
            message.error("Please log in first!")
            props.setPageProps({ page: 'LoginPage' })
        }


    };

    const unlike = (commentId) => {
        if (cookieParser.getCookieByName("email")) {
            axios.put(`/unFavorite/${props.type}/${props.id}/${commentId}/${email}`, {}, {
                headers: {
                    'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                }
            })
                .then(res => {
                    console.log(res.data.res)
                    //message.success("You withdraw a like the comment!")
                    refresh()
                })
                .catch(err => {
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
                        message.error('Server Error! Please refresh again! (Unlike Comment Error)')
                    }
                    else {
                        message.error("Server Error! Please try again later. (Unlike Comment Error)")
                    }

                })

        }
        else {
            message.error("Please log in first!")
            props.setPageProps({ page: 'LoginPage' })
        }

    };

    const onChange = (str) => {
        setComment(str);
    }
    const onSubmit = (ev) => {
        if (cookieParser.getCookieByName("email")) {
            let cookieParser = new Cookie(document.cookie);
            let name = cookieParser.getCookieByName('name');
            let avatar = "https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x";
            ev.preventDefault();
            const tempComment = {
                email: email,
                content: comment,
            }
            const type = props.page == 'NoteDetailPage' ? 'note' : 'post'
            if (comment.length > 0) {
                axios.post(`/comment/${props.id}`, tempComment, {
                    headers: {
                        'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
                    }
                })
                    .then(res => {
                        console.log("Comment Response: ", res.data.res)
                        setComment('');
                        message.success("You submitted a comment!")
                        refresh()

                    })
                    .catch(err => {
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
                            message.error('Server Error! Please refresh again! (Submit Comment Error)')
                        }
                        else {
                            message.error("Server Error! Please try again later. (Submit Comment Error)")
                        }
                    })
            }
            else {
                message.error('Please enter your comment!')
            }

        }
        else {
            message.error("Please log in first!")
            props.setPageProps({ page: 'LoginPage' })
        }


    }

    const onReply = (commentId) => {
        if (cookieParser.getCookieByName("email")) {
            setComment(comment + '@' + authors[commentId] + ' ');
        }
        else {
            message.error("Please log in first!")
            props.setPageProps({ page: 'LoginPage' })
        }
    }


    const setTheBest = (commentIds) => {
        //message.info(`Set ${commentIds} as the best answer`);
        axios.put(`/post/qa/best/${props.id}/${commentIds}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log("Set best response:", res.data.res)
                message.success("You set an answer as best !")
                refresh()
            })
            .catch(err => {

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
                    message.error('Server Error! Please refresh again! (Select Best Answer Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Select Best Answer Error)")
                }
            })
    }

    const commentEdit = (floor) => {
        setCommentEditFloor(-1)
        const data = {
            email: email,
            content: editingComment,
            picURL: []
        }
        axios.put(`/comment/${props.id}/${floor}`, data, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You updated a comment!")
                refresh()
                setEditingComment('')
            })
            .catch(err => {
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
                    message.error('Server Error! Please refresh again! (Update Comment Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Update Comment Error)")
                }
            })
    }

    const commentDelete = (floor) => {
        axios.delete(`/comment/${props.id}/${floor}`, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                console.log("Set best response:", res.data.res)
                //message.success("You deleted an comment!")
                refresh()
            })
            .catch(err => {
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
                    message.error('Server Error! Please refresh again! (Delete Comment Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Delete Comment Error)")
                }
            })
    }

    const transContent = (content) => {
        var arr = []
        arr = content.toString().split(/#(.+)\)/gm);
        console.log(arr)
        var temp = arr
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].match(/\(noteId :(.+)/gm)) {
                let url = arr[i].split(/\(noteId :(.+)/gm)
                temp[i] = React.createElement('a', { href: '/SharePage/note/'+url[1] }, '#'+url[0]);
                console.log(temp)
            }
        }
        console.log(temp)
        var doc = React.createElement('p', {}, temp)
        console.log(doc)
        return doc
    }

    return (
        <div className="commentArea">
            {props.page == 'QnADetailPage' &&
                <List
                    className="comment-list"
                    header={<Text color='black' cls='Small' content={`Best Answer`} fontSize='20' display="inline-block" />}
                    itemLayout="horizontal"
                    dataSource={bestAns}
                    renderItem={(item, index) => item.author &&
                        (
                            <li key={index}>
                                <Comment
                                    actions={props.isArchive ?
                                        [
                                            <Tooltip key={`comment-best-like-on-${index}`} title="Like">
                                                <span onClick={() => { like(item.id) }} >
                                                    {React.createElement(likeColor[item.id] ? LikeFilled : LikeOutlined)}
                                                    <span className="comment-action">{likeCount[item.id]}</span>
                                                </span>
                                            </Tooltip>
                                        ]
                                        :
                                        [
                                            <Tooltip key={`comment-best-like-on-${index}`} title="Like">
                                                <span onClick={() => { like(item.id) }} >
                                                    {React.createElement(likeColor[item.id] ? LikeFilled : LikeOutlined)}
                                                    <span className="comment-action">{likeCount[item.id]}</span>
                                                </span>
                                            </Tooltip>,
                                            <span key={`comment-best-reply-to-${index}`} onClick={() => { onReply(item.id) }}>Reply to</span>,
                                        ]
                                    }
                                    author={item.userObj?.userObjName}
                                    avatar={<Avatar src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"}></Avatar>}
                                    content={item.content}
                                    datetime={(
                                        <Tooltip title={moment(item.date).format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{moment(item.date).fromNow()}</span>
                                        </Tooltip>
                                    )}
                                />
                            </li>
                        )}
                />
            }
            <List
                className="comment-list"
                header={<Text color='black' cls='Small' content={`${comments.length} replies`} fontSize='20' display="inline-block" />}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item, index) =>
                (
                    <li key={index}>
                        <Row>
                            <Col span={21}>
                                <Comment
                                    actions={
                                        props.isArchive || !item.date ?
                                            [
                                                <span style={{ cursor: "default" }}>
                                                    {React.createElement(likeColor[item.id] ? LikeFilled : LikeOutlined)}
                                                    <span className="comment-action">{likeCount[item.id]}</span>
                                                </span>

                                            ]
                                            :
                                            [
                                                <Tooltip key={`comment-basic-like-on-${index}`} title={likeColor[item.id] ? "Unlike" : "Like"}>
                                                    <span
                                                        onClick={() => {
                                                            if (likeColor[item.id])
                                                                unlike(item.id);
                                                            else {
                                                                like(item.id);
                                                            }
                                                        }}
                                                    >
                                                        {React.createElement(likeColor[item.id] ? LikeFilled : LikeOutlined)}
                                                        <span className="comment-action">{likeCount[item.id]}</span>
                                                    </span>
                                                </Tooltip>,
                                                <span key={`comment-basic-reply-to-${index}`} onClick={() => { onReply(item.id) }}>Reply to</span>,
                                                <> {(props.page == "QnADetailPage" && bestAns.length == 0 && props.isAuthor && (props.authorEmail != item.userObj.userObjEmail)) &&
                                                    <span key={`comment-basic-choose-the-best`} onClick={() => { setTheBest(item.id) }}>Set as the best Answer</span>
                                                }</>,
                                            ]
                                    }
                                    author={item.userObj?.userObjName}
                                    avatar={<Avatar src={"https://gravatar.com/avatar/7fdc37318319569a920fd7d087c14d1f?s=400&d=robohash&r=x"}></Avatar>}
                                    content={commentEditFloor == item.floor ?
                                        <Input
                                            className="editing_Comment"
                                            value={editingComment}
                                            placeholder="Say something..."
                                            onChange={(e) => { setEditingComment(e.target.value) }}
                                            onPressEnter={() => commentEdit(item.floor)}
                                            addonAfter={<CloseOutlined onClick={() => setCommentEditFloor(-1)} />}
                                            bordered={false}
                                        />
                                        : item.content
                                    }
                                    datetime={item.date ? (
                                        <Tooltip title={moment(item.date).format('YYYY-MM-DD HH:mm:ss')}>
                                            <span>{moment(item.date).fromNow()}</span>
                                        </Tooltip>
                                    )
                                        :
                                        <Tooltip title={"Deleted Comment"}>
                                            <span>Deleted Comment</span>
                                        </Tooltip>
                                    }
                                />
                            </Col>
                            <Col className="comment_MoreOption" span={3}>
                                {(item.userObj?.userObjEmail == email && !props.isArchive && cookieParser.getCookieByName('email')) &&
                                    <Dropdown
                                        overlay={<Menu
                                            items={[
                                                {
                                                    key: '1',
                                                    label: (
                                                        <a onClick={() => {
                                                            setEditingComment(item.contentEdit)
                                                            setCommentEditFloor(item.floor)
                                                        }}
                                                            style={{ textDecoration: "none" }}>Edit</a>
                                                    ),
                                                    icon: <EditOutlined />
                                                },
                                                {
                                                    key: '2',
                                                    label: (
                                                        <Popconfirm
                                                            title="Are you sure to delete the comment?"
                                                            okText="Yes"
                                                            cancelText="No"
                                                            onConfirm={() => {
                                                                commentDelete(item.floor);
                                                            }}
                                                        >
                                                            <a style={{ textDecoration: "none", color: "red" }}>Delete</a>
                                                        </Popconfirm>

                                                    ),
                                                    icon: <DeleteOutlined style={{ color: "red" }} />
                                                }
                                            ]}
                                        />} placement="bottomLeft" arrow>
                                        <MoreOutlined />
                                    </Dropdown>
                                }
                            </Col>
                        </Row>
                    </li>
                )}
            />

            <div className='commentArea__Input'>
                <Mentions
                    rows={6}
                    placeholder="input @ to mention people, # to mention note"
                    prefix={['@', '#']}
                    onSearch={onSearch}
                    onChange={onChange}
                    value={comment}
                    disabled={props.isArchive}
                >
                    {(tag[prefix] || []).map((value) => (
                        <Option key={value} value={value}>
                            {value}
                        </Option>
                    ))}
                </Mentions>

            </div>
            {!props.isArchive ?
                <div className='commentArea__Button' onClick={onSubmit} >
                    <Button color={"purple"} ><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
                </div>
                :
                <div className='commentArea__Button'></div>
            }
        </div>
    );
}

export default CommentArea;