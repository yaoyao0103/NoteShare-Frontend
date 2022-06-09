import React, {useEffect, useState} from 'react'
import { Layout, Progress, message } from 'antd';
import "./VoteArea.css"
import { CloseOutlined } from "@ant-design/icons";
import Text from '../Text/Text';
import Button from '../Button/Button';
const { Header, Content, Sider, Footer } = Layout;

const VoteArea = (props) => {

    const [agreeCount, setAgreeCount] = useState(0);
    const [disagreeCount, setDisagreeCount] = useState(0);
    useEffect(()=>{
        // Todo: agree count
        setAgreeCount(props.agree);
        setDisagreeCount(props.disagree);
    },[]);
    const agree = () => {
        // Todo: check agree list
        message.info("Agree!");
        setAgreeCount(props.agree +1);
    }
    const disagree = () => {
        // Todo: check agree list
        message.info("Disagree!")
        setDisagreeCount(props.disagree + 1);
    }
    return (
        <>
            <Content className='voteArea__Content'>
                <Text color='black' cls='Small' content={"Agree"} fontSize='15' />
                <Progress percent={(agreeCount*100/props.total)} status="active" strokeColor="#2894FF"/>
                <Text color='black' cls='Small' content={"Disagree"} fontSize='15'/>
                <Progress percent={(disagreeCount*100/props.total)} status="active" strokeColor="#FF5151" />
            </Content>
            <Sider className='voteArea__Sider' width={"30%"}>
                <div className='voteArea__Button voteArea__Button__agree' onClick={agree}>
                    <Button color={"blue"}><Text color='white' cls='Large' content={"Agree"} fontSize='15' display="inline-block" /></Button>
                </div>
                <div className='voteArea__Button voteArea__Button__disagree' onClick={disagree}>
                    <Button color={"red"}><Text color='white' cls='Large' content={"Disagree"} fontSize='15' display="inline-block" /></Button>
                </div>
            </Sider>    
        </>
    )
}

export default VoteArea;