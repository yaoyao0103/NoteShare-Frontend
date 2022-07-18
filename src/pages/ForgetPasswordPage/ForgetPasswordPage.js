import React, { useState, useEffect } from 'react';

import { Layout, Form, Input, message } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import axios from "axios";
import './ForgetPasswordPage.css'
const { Sider, Content } = Layout;

function ForgetPasswordPage(props) {
    const [Page, setPage] = useState('ForgetPasswordPage');
    const [render, setRender] = useState(false);
    const [email, setEmail] = useState('');
    const [resendFail, setResendFail] = useState(false);
    const [error, setError] = useState('');
    //const {email} = props;
    //console.log(email);
    useEffect(() => {
        setPage('ForgetPasswordPage');
    }, [Page]);
    useEffect(() => {
        setRender(true);
    });
    useEffect(() => {
        if(render)
        props.setLoading(false);


    }, [props]);
    useEffect(() => {
        props.setLoading(false)
    }, [render]);
    const onFinish = (values) => {
        //console.log('Received values of form: ', values);

        resend();
        
    };


    const resend = () => {
        axios.get("http://localhost:8080/user/" + email).then(res => {
            console.log(res.data.res);
            axios.post("http://localhost:8080/verification/resendCode/" + email).then(res => {
                console.log(res.data.msg);
            }).catch((error) => {
                console.log(error.response.status)
                // if(error.response.status === 403){
                //   setRedirectActivate(true);
                // }
                setResendFail(true);
            })
            if (res.data.res.activate) {
                message.success("Your new password has send to your email!");
                setInterval(function () {
                    props.setPageProps({
                        page: 'LoginPage',

                    })
                }, 2000)
                
            }
            else {
                message.warn('You should verify your account first!');
                setInterval(function () {
                    props.setPageProps({ page: 'VerificationPage', email: email });
                }, 2000)
                
            }

           
        }).catch((error) => {
            message.error("Server Error! Please try again later. (Get User Information Error)")
            console.log(error.response.status)
            setError(error.response.status);
            // if(error.response.status === 403){
            //   setRedirectActivate(true);
            // }
            setResendFail(true);
        })



    }

    useEffect(() => {
        if (resendFail) {

            message.error(error.msg);
        }
    }, [resendFail]);

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 48,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 24,
                offset: 0,
            },
        },
    };
    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
            }}
            spin
        />
    );
    return (
        <div className='ForgetPasswordPage'>
            {render &&
                <Layout className='ForgetPasswordPage__Outer'>
                    <Sider className='ForgetPasswordPage__Sider' width={"60%"}>
                        <img src="https://static.vecteezy.com/system/resources/previews/003/410/006/original/continuous-one-line-drawing-of-hand-writing-with-a-pen-on-paper-vector.jpg" alt="一張圖片" />
                    </Sider>
                    <Content className='ForgetPasswordPage__Content'>
                        <div className='ForgetPasswordPage__Content__Text'>
                            <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                            <Text color='purple' cls='Large' content='Share' fontSize='22' />
                        </div>
                        <div className='ForgetPasswordPage__Content__Text ForgetPasswordPage__Content__Text__Bottom'>
                            <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                        </div>
                        <div className="ForgetPasswordPage__Form">
                            <Form
                                {...formItemLayout}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{

                                }}
                                scrollToFirstError
                            >
                                <div className='ForgetPasswordPage__Content__Form__Text'>
                                    <Text color='black' cls='Small' content='Email' fontSize='13' />
                                </div>
                                <Form.Item
                                    name="email"
                                    className='Verification__Form__Item'

                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input onChange={(e) => { setEmail(e.target.value) }} />

                                </Form.Item>

                                <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                    <a className="ForgetPasswordPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                    <div className="ForgetPasswordPage__Button">
                                        <Button color={"green"}><Text color='white' cls='Large' content={"Send verify code"} fontSize='15' display="inline-block" /></Button>
                                    </div>

                                </Form.Item>
                            </Form>

                        </div>
                    </Content>
                </Layout>
            }
        </div>


    );


}

export default ForgetPasswordPage;