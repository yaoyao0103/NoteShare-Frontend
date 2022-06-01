import React, { useState, useEffect } from "react";
import { List, Comment, Mentions, Avatar } from "antd";
import Text from "../Text/Text";
import Button from "../Button/Button";
import './SiderComment.css'
const { Option } = Mentions;

function SiderComment(props) {
    const [comments, setComments] = useState([]);
    const [names, setNames] = useState({
        '@': [],
        '#': ['1.0', '2.0', '3.0'],
    });

    useEffect(()=>{
        setComments(props.comments);
        const nameSet = new Set([]);
        props.comments.map( item => {
        nameSet.add(item.author);
        });
        setNames({
        '@': [...nameSet],
        '#': ['1.0', '2.0', '3.0'],
        });
    },[props])
        const [prefix, setPrefix] = useState('@');

        const onSearch = (_, newPrefix) => {
            setPrefix(newPrefix);
        };

    return (
        <div id='Comment' className="Comment">
            <List
                className="comment-list"
                header={`${comments.length} replies`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item, i) =>       
                (
                <li key={i}>
                    <Comment
                    actions={null}
                    author={item.author}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random"></Avatar>}
                    content={item.content}
                    datetime={item.date}
                    />
                </li>
            )}
            />

            <div className='Comment__Input'>
                <Mentions
                    style={{
                        width: '100%',
                        height: '200px',
                    }}
                    placeholder="input @ to mention people, # to mention tag"
                    prefix={['@', '#']}
                    onSearch={onSearch}
                    >
                    {(names[prefix] || []).map((value) => (
                        <Option key={value} value={value}>
                        {value}
                        </Option>
                    ))}
                </Mentions>
            </div>
            <div className='Comment__Button' >
                <Button color={"green"}><Text color='white' cls='Large' content={"Submit"} fontSize='17' display="inline-block" /></Button>
            </div>
        </div>
    );
}

export default SiderComment;