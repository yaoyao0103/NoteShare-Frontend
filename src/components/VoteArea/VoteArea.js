import React, {useEffect, useState} from 'react'
import { Layout, Progress, message } from 'antd';
import "./VoteArea.css"
import { CloseOutlined } from "@ant-design/icons";
import Text from '../Text/Text';
import Button from '../Button/Button';
import axios from '../axios/axios';
import Cookie from '../Cookies/Cookies';
const { Header, Content, Sider, Footer } = Layout;
const cookieParser=new Cookie(document.cookie)
const VoteArea = (props) => {

    const [agreeCount, setAgreeCount] = useState(0);
    const [disagreeCount, setDisagreeCount] = useState(0);
    const [voted, setVoted] = useState(false);
    useEffect(()=>{
        // Todo: agree count
        setAgreeCount(props.vote.agree? props.vote.agree.length:0);
        setDisagreeCount(props.vote.disagree? props.vote.disagree.length:0);
        setVoted(props.vote.agree? (props.vote.agree.includes(props.email)? true:props.vote.disagree? props.vote.disagree.includes(props.email)? true:false:false): false)
    },[props]);
    const agree = () => {
        // Todo: check agree list
        axios.put(`http://localhost:8080/post/vote/${props.postId}/${props.vote.id}/${props.email}`, {option: 'agree'},{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        })
            .then ( res => {
                message.success("You agreed to kick the author!");
                setAgreeCount(agreeCount +1);
                setVoted(true)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Agree Kicking Author Error)")
                console.log(err)
            })
        
    }
    const disagree = () => {
        // Todo: check agree list
        axios.put(`http://localhost:8080/post/vote/${props.postId}/${props.vote.id}/${props.email}`, {option: 'agree'},{
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
              }
        })
            .then ( res => {
                message.success("You disagreed to kick the author!");
                setDisagreeCount(disagreeCount +1);
                setVoted(true)
            })
            .catch(err =>{
                message.error("Server Error! Please try again later. (Disagree Kicking Author Error)")
                console.log(err)
            })
    }
    return (
        <>
            <Text color='black' cls='Small' content={"Agree"} fontSize='15' />
            <Progress percent={(agreeCount*100/props.total)} status="active" strokeColor="#2894FF"/>
            <Text color='black' cls='Small' content={"Disagree"} fontSize='15'/>
            <Progress percent={(disagreeCount*100/props.total)} status="active" strokeColor="#FF5151" />
            {!voted?
            <>
                <div className='voteArea__Button voteArea__Button__agree' onClick={agree}>
                    <Button color={"blue"}><Text color='white' cls='Large' content={"Agree"} fontSize='15' display="inline-block" /></Button>
                </div>
                <div className='voteArea__Button voteArea__Button__disagree' onClick={disagree}>
                    <Button color={"red"}><Text color='white' cls='Large' content={"Disagree"} fontSize='15' display="inline-block" /></Button>
                </div>
            </>
            :
            <>
                <div className='voteArea__Button voteArea__Button__agree'>
                    <Button color={"blue--disable"}><Text color='white' cls='Large' content={"Agree"} fontSize='15' display="inline-block" /></Button>
                </div>
                <div className='voteArea__Button voteArea__Button__disagree'>
                    <Button color={"red--disable"}><Text color='white' cls='Large' content={"Disagree"} fontSize='15' display="inline-block" /></Button>
                </div>
            </>
            }
        </>
    )
}

export default VoteArea;