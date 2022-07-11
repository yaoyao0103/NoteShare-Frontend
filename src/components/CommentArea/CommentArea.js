import React, { useState, useEffect } from "react";
import { Tooltip, List, Comment, Mentions, Avatar, message, notification, Row, Col, Menu, Dropdown, Input  } from "antd";
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

const { Option } = Mentions;

function CommentArea(props) {
    const [comments, setComments] = useState([]);
    const [authors, setAuthors] = useState({});
    const [tag, setTag] = useState({
        '@': [],
        '#': ['1.0', '2.0', '3.0'],
    });
    const [comment, setComment] = useState('');
    const [likeCount, setLikeCount] = useState({});
    const [likeColor, setLikeColor] = useState({});
    const [prefix, setPrefix] = useState('@');
    const [bestAns, setBestAns]= useState([]);
    const [email, setEmail] = useState('00857028@email.ntou.edu.tw')
    const [isArchive, setIsArchive] = useState(false)
    const [commentEditFloor, setCommentEditFloor] = useState(-1)
    const [editingComment, setEditingComment] = useState('')
    
    const openNotification = () => {
        setIsArchive(true)
        notification.open({
            message: 'The post had been archived by author!',
            description:
                'After being archived, you cannot leave any comment or click the like button',
            placement: 'bottomLeft'
        });
      };

    useEffect(()=>{
        console.log("Comment: ", props)
        refresh()  
        if(props.isArchive && !isArchive) openNotification()
    },[props])

    const onSearch = (_, newPrefix) => {
        setPrefix(newPrefix);
    };

    const refresh = () => {
        const cookieParser = new Cookie(document.cookie)
        const temp = cookieParser.getCookieByName('email')
        const tempEmail = Base64.decode(temp);
        setEmail(tempEmail)
        const type = props.page == 'NoteDetailPage'? 'note':'post'
        axios.get(`http://localhost:8080/${type}/${props.id}`)
        .then(res => {
            //console.log(res.data.res)
            const tempComment = res.data.res.commentsUserObj
            setComments(tempComment);
            let authorArray = new Object();
            let likeCount = new Object();
            let likeColor = new Object();
            tempComment.map( item => {
                if(item.date){
                    if(item.best){
                        setBestAns([item])
                    }
                    authorArray[item.id] = item.userObj.userObjName? item.userObj.userObjName:null
                    likeCount[item.id] = item.likeCount? item.likeCount:0 ;
                    let flag = false;
                    if(item.likerUserObj){
                        for(let i = 0; i < item.likerUserObj.length; i++){
                            if(item.likerUserObj[i].userObjEmail == tempEmail){
                                flag = true;
                                break;
                            }
                        }
                        if(flag){
                            likeColor[item.id] = true;
                        }
                    }
                }
            });
            setAuthors(authorArray);
            setLikeCount(likeCount);
            setLikeColor(likeColor);
            setTag({
                '@': [...new Set(Object.values(authorArray))],
                '#': ['1.0', '2.0', '3.0'],
                });
        })
        .catch(err => {
            console.log(err)
        })
    }


    const like = (commentId) => {
        axios.put(`http://localhost:8080/favorite/${props.type}/${props.id}/${commentId}/${email}`)
        .then(res => {
            console.log(res.data.res)
            message.success("Like!")
            refresh()
        })
        .catch(err => {
            console.log(err)
        }) 

    };

    const unlike = (commentId) => {
        axios.put(`http://localhost:8080/unFavorite/${props.type}/${props.id}/${commentId}/${email}`)
        .then(res => {
            console.log(res.data.res)
            message.success("UnLike!")
            refresh()
        })
        .catch(err => {
            console.log(err)
        })  

    };

    const onChange = (str) => {
        setComment(str);
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        const tempComment = {
            email: email,
            content: comment,
        }
        const type = props.page == 'NoteDetailPage'? 'note':'post'
        axios.post(`http://localhost:8080/comment/${props.id}`, tempComment)
        .then(res => {
            console.log("Comment Response: ",res.data.res)
            message.success("Submit!")
            refresh()
        })
        .catch(err => {
            console.log(err)
        }) 
    }
    
    const onReply = (commentId) => {
        message.info("reply to: "+ commentId);
        setComment(comment + '@' + authors[commentId] + ' ');
    }

    
    const setTheBest = (commentIds) => {
        //message.info(`Set ${commentIds} as the best answer`);
        axios.put(`http://localhost:8080/post/qa/best/${props.id}/${commentIds}`)
        .then(res => {
            console.log("Set best response:", res.data.res)
            message.success("Set!")
            refresh()
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    const commentEdit = (floor) => {
        setCommentEditFloor(-1)
        const data = {
            email: email,
            content: editingComment,
            picURL: []
        }
        axios.put(`http://localhost:8080/comment/${props.id}/${floor}`, data)
        .then(res => {
            message.success("Update!")
            refresh()
            setEditingComment('')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const commentDelete = (floor) => {
        
        axios.delete(`http://localhost:8080/comment/${props.id}/${floor}`)
        .then(res => {
            console.log("Set best response:", res.data.res)
            message.success("Delete!")
            refresh()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="commentArea">
            {props.page=='QnADetailPage'&&
            <List
                className="comment-list"
                header={<Text color='black' cls='Small' content={`Best Answer`} fontSize='20' display="inline-block" />}
                itemLayout="horizontal"
                dataSource={bestAns}
                renderItem={(item, index) => item.author &&    
                (
                <li key={index}>
                    <Comment
                    actions={props.isArchive?
                        [
                            <Tooltip key={`comment-best-like-on-${index}`} title="Like">
                                <span onClick={() => {like(item.id)}} >
                                {React.createElement(likeColor[item.id]? LikeFilled : LikeOutlined)}
                                <span className="comment-action">{likeCount[item.id]}</span>
                                </span>
                            </Tooltip>
                        ]
                        :
                        [
                        <Tooltip key={`comment-best-like-on-${index}`} title="Like">
                            <span onClick={() => {like(item.id)}} >
                            {React.createElement(likeColor[item.id]? LikeFilled : LikeOutlined)}
                            <span className="comment-action">{likeCount[item.id]}</span>
                            </span>
                        </Tooltip>,
                        <span key={`comment-best-reply-to-${index}`}  onClick={() => {onReply(item.id)}}>Reply to</span>,
                        ]
                    }
                    author={item.userObj?.userObjName}
                    avatar={<Avatar src={item.userObj?.userObjAvatar}></Avatar>}
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
                                    props.isArchive || !item.date?
                                    [
                                        <span  style={{cursor:"default"}}>
                                        {React.createElement(likeColor[item.id]? LikeFilled : LikeOutlined)}
                                        <span className="comment-action">{likeCount[item.id]}</span>
                                        </span>

                                    ]
                                    :
                                    [
                                    <Tooltip key={`comment-basic-like-on-${index}`} title={likeColor[item.id]?"Unlike":"Like"}>
                                        <span 
                                        onClick={()=>{
                                            if(likeColor[item.id])
                                                unlike(item.id);
                                            else{
                                                like(item.id);
                                            }
                                        }} 
                                        >
                                        {React.createElement(likeColor[item.id]? LikeFilled : LikeOutlined)}
                                        <span className="comment-action">{likeCount[item.id]}</span>
                                        </span>
                                    </Tooltip>,
                                    <span key={`comment-basic-reply-to-${index}`}  onClick={() => {onReply(item.id)}}>Reply to</span>,
                                    <> {(props.page == "QnADetailPage" && bestAns.length ==0 && props.isAuthor && (props.authorEmail!=item.userObj.userObjEmail)) && 
                                        <span key={`comment-basic-choose-the-best`} onClick={() => {setTheBest(item.id)}}>Set as the best Answer</span>
                                    }</>,
                                ]
                            }
                            author={item.userObj?.userObjName}
                            avatar={<Avatar src={item.userObj?.userObjAvatar}></Avatar>}
                            content={commentEditFloor==item.floor? 
                                <Input 
                                    className="editing_Comment"
                                    value={editingComment} 
                                    onChange={(e)=> { setEditingComment(e.target.value)}} 
                                    onPressEnter={() => commentEdit(item.floor)}
                                    addonAfter={<CloseOutlined onClick={()=>setCommentEditFloor(-1)}/>}
                                    bordered={false}
                                />
                                :item.content
                            }
                            datetime={item.date?(
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
                            {(item.userObj?.userObjEmail == email) &&
                            <Dropdown 
                            overlay={<Menu
                                items={[
                                    {
                                        key: '1',
                                        label: (
                                            <a onClick={() => {
                                                setEditingComment(item.content)
                                                setCommentEditFloor(item.floor)
                                            }} 
                                            style={{textDecoration:"none"}}>Edit</a>
                                        ),
                                        icon: <EditOutlined />
                                    },
                                    {
                                        key: '2',
                                        label: (
                                            <a onClick={() => {commentDelete(item.floor)}} style={{textDecoration:"none", color:"red"}}>Delete</a>
                                        ),
                                        icon: <DeleteOutlined style={{color:"red"}}/>
                                    }
                                ]}
                                />} placement="bottomLeft" arrow>
                                <MoreOutlined/>
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
                    placeholder="input @ to mention people, # to mention tag"
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
            {!props.isArchive?
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