import React, { useState, useEffect } from "react";
import { Tooltip, List, Comment, Mentions, Avatar, message } from "antd";
import Text from "../Text/Text";
import Button from "../Button/Button";
import './CommentArea.css'
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import moment from 'moment';

const { Option } = Mentions;

function CommentArea(props) {
    const [comments, setComments] = useState([]);
    const [names, setNames] = useState({});
    const [tag, setTag] = useState({
        '@': [],
        '#': ['1.0', '2.0', '3.0'],
    });
    const [comment, setComment] = useState('');
    const [like, setLike] = useState([]);
    const [likeColor, setLikeColor] = useState([]);
    const [prefix, setPrefix] = useState('@');

    useEffect(()=>{
        setComments(props.comments);
        let nameArray = new Array();
        props.comments.map( item => {
            nameArray = [...nameArray, item.author];
            setLike(like => [...like, item.likeCount]);
            setLikeColor(likeColor => [...likeColor, false]);
        });
        setNames(nameArray);
        setTag({
        '@': [...new Set([...nameArray])],
        '#': ['1.0', '2.0', '3.0'],
        });
        console.log(tag);
        
    },[props])
    

    const onSearch = (_, newPrefix) => {
        setPrefix(newPrefix);
    };


    const updateLike = (index) => {

        /* Todo: connect the api
        // check if it had been liked
        if(!props.comments[index].liker.includes('myEmail')){
            // update likeColor locally
            let tempColor = [...likeColor]
            tempColor[index] = true;
            setLikeColor(tempColor);

            // update like and like count in db
            axios.put(`API_URL`)
            .then(res => {
                let tempLike = [...like]
                tempLike[index] += 1;
                setLike(tempLike);
            })
            .error(err => {
                message.info("Error")
            })
            
        }
        */
        let tempColor = [...likeColor]
        tempColor[index] = true;
        setLikeColor(tempColor);
        let tempLike = [...like]
        tempLike[index] += 1;
        setLike(tempLike);
        message.info('Increase like at : ' + like[index]);

    };

    const onChange = (str) => {
        setComment(str);
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        message.info(comment);
        /* Todo 
        axios.put(`API_URL`)
        .then(res => {
            let temp = [..comments];
            temp.push(res);
            setComments(temp);
        })
        */
    }
    
    const onReply = (index) => {
        message.info("reply to: "+ index);
        setComment(comment + '@' + names[index] + ' ');
    }

    
    const setTheBest = (index) => {
        message.info(`Set ${names[index]} as the best answer`);
        /* Todo: set the best
        set the best answer and archive
        axios.put(`API_URL`)
            .then(res => {
        });
        */
    }

        
    

    return (
        <div className="commentArea">
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
                        <Tooltip key={`comment-basic-like-on-${index}`} title="Like">
                            <span onClick={() => {updateLike(index)}} >
                            {React.createElement(likeColor[index]? LikeFilled : LikeOutlined)}
                            <span className="comment-action">{like[index]}</span>
                            </span>
                        </Tooltip>,
                        <span key={`comment-basic-reply-to-${index}`}  onClick={() => {onReply(index)}}>Reply to</span>,
                        <> {props.page == "QnADetailPage" && 
                            <span key={`comment-basic-choose-the-best`} onClick={() => {setTheBest(index)}}>Set as the best Answer</span>
                        }</>
                    ]}
                    author={item.author}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random"></Avatar>}
                    content={item.content}
                    datetime={(
                        <Tooltip title={moment(item.date).subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(item.date).subtract(2, 'days').fromNow()}</span>
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
                <Button color={"green"} ><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
            </div>
        </div>
    );
}

export default CommentArea;