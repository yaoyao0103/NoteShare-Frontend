import React, { useEffect, useState } from 'react'
import { Layout, Progress, message } from 'antd';
import "./VoteArea.css"
import { CloseOutlined } from "@ant-design/icons";
import Text from '../Text/Text';
import Button from '../Button/Button';
import axios from '../axios/axios';
import Cookie from '../Cookies/Cookies';
const { Header, Content, Sider, Footer } = Layout;
const cookieParser = new Cookie(document.cookie)
const VoteArea = (props) => {

    const [agreeCount, setAgreeCount] = useState(0);
    const [disagreeCount, setDisagreeCount] = useState(0);
    const [voted, setVoted] = useState(null);
    useEffect(() => {
        // Todo: agree count
        console.log("props.vote", props.vote)
        setAgreeCount(props.vote.agree ? props.vote.agree.length : 0);
        setDisagreeCount(props.vote.disagree ? props.vote.disagree.length : 0);
        setVoted(props.vote.agree ? (props.vote.agree.includes(props.email) ? "Agree" : props.vote.disagree ? (props.vote.disagree.includes(props.email) ? "Disagree" : null) : null) : null)
    }, [props]);
    const agree = () => {
        // Todo: check agree list
        axios.put(`/post/vote/${props.postId}/${props.vote.id}/${props.email}`, { option: 'agree' }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You agreed to kick the author!");
                if (!voted) {
                    setAgreeCount(agreeCount + 1);
                }
                else {
                    setDisagreeCount(disagreeCount - 1);
                    setAgreeCount(agreeCount + 1);
                }
                setVoted("Agree")
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
                    message.error('Server Error! Please refresh again! (Agree Kicking Author Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Agree Kicking Author Error)")
                }
            })

    }
    const disagree = () => {
        // Todo: check agree list
        axios.put(`/post/vote/${props.postId}/${props.vote.id}/${props.email}`, { option: 'disagree' }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        })
            .then(res => {
                message.success("You disagreed to kick the author!");
                if (!voted) {
                    setDisagreeCount(disagreeCount + 1);
                }
                else {
                    setAgreeCount(agreeCount - 1);
                    setDisagreeCount(disagreeCount + 1);
                }
                setVoted("Disagree")
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
                    message.error('Server Error! Please refresh again! (Disagree Kicking Author Error)')
                }
                else {
                    message.error("Server Error! Please try again later. (Disagree Kicking Author Error)")
                }
            })
    }
    return (
        <>
            <Text color='black' cls='Small' content={"Agree"} fontSize='15' />
            <Progress percent={(agreeCount * 100 / props.total)} status="active" strokeColor="#2894FF" />
            <Text color='black' cls='Small' content={"Disagree"} fontSize='15' />
            <Progress percent={(disagreeCount * 100 / props.total)} status="active" strokeColor="#FF5151" />
            <>
                {voted != "Agree" ?
                    <div className='voteArea__Button voteArea__Button__agree' onClick={agree}>
                        <Button color={"blue"}><Text color='white' cls='Large' content={"Agree"} fontSize='15' display="inline-block" /></Button>
                    </div>
                    :
                    <div className='voteArea__Button voteArea__Button__agree'>
                        <Button color={"blue--disable"}><Text color='white' cls='Large' content={"Agree"} fontSize='15' display="inline-block" /></Button>
                    </div>
                }
                {voted != "Disagree" ?
                    <div className='voteArea__Button voteArea__Button__disagree' onClick={disagree}>
                        <Button color={"red"}><Text color='white' cls='Large' content={"Disagree"} fontSize='15' display="inline-block" /></Button>
                    </div>
                    :
                    <div className='voteArea__Button voteArea__Button__disagree'>
                        <Button color={"red--disable"}><Text color='white' cls='Large' content={"Disagree"} fontSize='15' display="inline-block" /></Button>
                    </div>
                }

            </>
        </>
    )
}

export default VoteArea;