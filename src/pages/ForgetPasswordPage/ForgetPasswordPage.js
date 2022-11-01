import React, { useState, useEffect } from 'react';

import { Layout, Form, Input, message } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import axios from '../../components/axios/axios';
import './ForgetPasswordPage.css'
import Cookie from '../../components/Cookies/Cookies';
import { createMedia } from "@artsy/fresnel"
const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        sm: 0,
        lm: 391,
        md: 768,
        lg: 1024,
        xl: 1192,
    },
})
const { Sider, Content } = Layout;
const cookieParser = new Cookie(document.cookie)
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
        if (render)
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
        axios.get("/user/" + email).then(res => {
            let activate = res.data.res.activate
            console.log(res.data.res);
            props.setLoading(true)
            axios.post("verification/randomPassword/"+email).then(res => {
                console.log(res.data.msg);
                if (activate) {
                    message.success("Your new password has send to your email!");
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({
                        page: 'LoginPage',
                    })
                }
                else {
                    message.warn('Please verify your account first!');
                    props.setPageProps({ page: 'VerificationPage', email: email });
    
    
                }
                props.setLoading(false)
            }).catch((error) => {
                console.log(error)
                props.setLoading(false)
                // if(error.response.status === 403){
                //   setRedirectActivate(true);
                // }
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
                    message.error('Server Error! Please refresh again! (Resend New Password Error)')
                }
                else {
                    message.error('Server Error! Please try again later. (Resend New Password Error)')
                }
                setResendFail(true);
            })
           


        }).catch((error) => {
            console.log('132')
            setError(error.response.status);
            // if(error.response.status === 403){
            //   setRedirectActivate(true);
            // }
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
                message.error('Server Error! Please refresh again! (Get User Information Error)')
            }
            else {
                message.error("Server Error! Please try again later. (Get User Information Error)")
            }
            setResendFail(true);
        })



    }


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
                <MediaContextProvider>
                    <Media at="xl" className='ForgetPasswordPage__Media'>
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
                                            <Input placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />

                                        </Form.Item>

                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="ForgetPasswordPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="ForgetPasswordPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Send new password"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>

                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="lg" className='loginPage__Media'>
                        <Layout className='ForgetPasswordPage__Outer'>
                            <Sider className='ForgetPasswordPage__Sider' width={"50%"}>
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
                                            <Input placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />

                                        </Form.Item>

                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="ForgetPasswordPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="ForgetPasswordPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Send new password"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>

                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="md" className='loginPage__Media'>
                        <Layout className='ForgetPasswordPage__Outer'>
                            <Sider className='ForgetPasswordPage__Sider__md' width={"40%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/003/410/006/original/continuous-one-line-drawing-of-hand-writing-with-a-pen-on-paper-vector.jpg" alt="一張圖片" />
                            </Sider>
                            <Content className='ForgetPasswordPage__Content__md'>
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
                                            <Input placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />

                                        </Form.Item>

                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="ForgetPasswordPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="ForgetPasswordPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Send new password"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>

                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="lm" className='loginPage__Media'>
                        <Layout className='ForgetPasswordPage__Outer'>

                            <Content className='ForgetPasswordPage__Content__sm'>
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
                                            <Input placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />

                                        </Form.Item>

                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="ForgetPasswordPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="ForgetPasswordPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Send new password"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>

                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="sm" className='loginPage__Media'>
                        <Layout className='ForgetPasswordPage__Outer'>
                            <Content className='ForgetPasswordPage__Content__sm'>
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
                                            <Input placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />

                                        </Form.Item>

                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="ForgetPasswordPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="ForgetPasswordPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Send new password"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>

                                </div>
                            </Content>
                        </Layout>
                    </Media>

                </MediaContextProvider>
            }
        </div>


    );


}

export default ForgetPasswordPage;