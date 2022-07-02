import React, { useState, useEffect } from "react";
import { Tooltip, List, Comment, Mentions, Avatar, message } from "antd";
import Text from "../Text/Text";
import Button from "../Button/Button";
import './CommentArea.css'
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import moment from 'moment';
import axios from '../axios/axios'
import Cookie from '../../components/Cookies/Cookies';
import { Base64 } from 'js-base64';

const { Option } = Mentions;

function CommentArea(props) {
    const [comments, setComments] = useState([]);
    const [names, setNames] = useState({});
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

    useEffect(()=>{
        refresh()  
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
            console.log(res.data.res)
            const tempComment = res.data.res.comments
            setComments(tempComment);
            let nameArray = new Object();
            let likeCount = new Object();
            let likeColor = new Object();
            tempComment.map( item => {
                if(item.best){
                    setBestAns([item])
                }
                nameArray[item.id] = item.author
                likeCount[item.id] = item.likeCount;
                if(item.liker.includes(tempEmail)){
                    likeColor[item.id] = true;
                }
                else{
                    likeColor[item.id] = false;
                }
            });
            setNames(nameArray);
            setLikeCount(likeCount);
            setLikeColor(likeColor);
            setTag({
                '@': [...new Set(Object.values(nameArray))],
                '#': ['1.0', '2.0', '3.0'],
                });
        })
        .catch(err => {
            console.log(err)
        })
    }


    const like = (commentId) => {
        message.info(`Like ${commentId}`);
        axios.put(`http://localhost:8080/favorite/${props.type}/${props.id}/${commentId}/${email}`)
        .then(res => {
            console.log(res.data.res)
            message.success("Submit!")
            refresh()
        })
        .catch(err => {
            console.log(err)
        }) 

    };

    const unlike = (commentId) => {
        message.info(`UnLike ${commentId}`);
        axios.put(`http://localhost:8080/unFavorite/${props.type}/${props.id}/${commentId}/${email}`)
        .then(res => {
            console.log(res.data.res)
            message.success("Submit!")
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
            author: "yao",
            email: email,
            content: comment,
        }
        const type = props.page == 'NoteDetailPage'? 'note':'post'
        axios.post(`http://localhost:8080/comment/${props.id}`, tempComment)
        .then(res => {
            console.log(res.data.res)
            message.success("Submit!")
            refresh()
        })
        .catch(err => {
            console.log(err)
        }) 
    }
    
    const onReply = (commentId) => {
        message.info("reply to: "+ commentId);
        setComment(comment + '@' + names[commentId] + ' ');
    }

    
    const setTheBest = (commentIds) => {
        message.info(`Set ${commentIds} as the best answer`);
        axios.put(`http://localhost:8080/post/qa/best/${props.id}/${commentIds}`)
        .then(res => {
            console.log(res.data.res)
            message.success("Set!")
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
                renderItem={(item, index) =>       
                (
                <li key={index}>
                    <Comment
                    actions={[
                        <Tooltip key={`comment-best-like-on-${index}`} title="Like">
                            <span onClick={() => {like(item.id)}} >
                            {React.createElement(likeColor[item.id]? LikeFilled : LikeOutlined)}
                            <span className="comment-action">{likeCount[item.id]}</span>
                            </span>
                        </Tooltip>,
                        <span key={`comment-best-reply-to-${index}`}  onClick={() => {onReply(item.id)}}>Reply to</span>,
                    ]}
                    author={item.author}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random"></Avatar>}
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
                    <Comment
                    actions={[
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
                        <> {(props.page == "QnADetailPage" && bestAns.length ==0) && 
                            <span key={`comment-basic-choose-the-best`} onClick={() => {setTheBest(item.id)}}>Set as the best Answer</span>
                        }</>
                    ]}
                    author={item.author}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random"></Avatar>}
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

            <div className='commentArea__Input'>
                <Mentions
                    rows={6}
                    placeholder="input @ to mention people, # to mention tag"
                    prefix={['@', '#']}
                    onSearch={onSearch}
                    onChange={onChange}
                    value={comment}
                    >
                    {(tag[prefix] || []).map((value) => (
                        <Option key={value} value={value}>
                        {value}
                        </Option>
                    ))}
                </Mentions>
                
            </div>
            <div className='commentArea__Button' onClick={onSubmit} >
                <Button color={"purple"} ><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
            </div>
        </div>
    );
}

export default CommentArea;