import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Layout, Form, Input, message, Row, Col, Tooltip, Spin } from "antd";
import { ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import axios from '../../components/axios/axios';
import './VerificationPage.css'
import Logo from '../../components/Navbar/Logo/Logo';
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
const { Header, Sider, Content, Footer } = Layout;
const cookieParser = new Cookie(document.cookie)
function VerificationPage(props) {
    const [Page, setPage] = useState('VerificationPage');
    const [render, setRender] = useState(false);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [resendFail, setResendFail] = useState(false);
    const [error, setError] = useState('');
    const { email } = props;
    //console.log(email);
    let newEmail = props.email.replace('@', '%40');
    useEffect(() => {
        setRender(true);
    });
    useEffect(() => {
        console.log('4444')
        if (render)
            props.setLoading(false);


    }, [props]);
    useEffect(() => {
        props.setLoading(false)
    }, [render]);
    const onFinish = (values) => {
        //console.log('Received values of form: ', values);

        Verification();
    };

    const Verification = () => {
        axios.put("/verification/verify/" + newEmail + "/" + code).then(res => {
            console.log(res.data.msg);
            message.success("Success!")
            props.setPageProps({
                page: 'LoginPage'
            })
        }).catch((error) => {
            //console.log(error.response.status)
            // if(error.response.status === 403){
            //   setRedirectActivate(true);
            // }
            console.log("err", error.response)
            if(error.response.status === 418){
                message.error('Wrong Verification Code!')
            }
            else if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
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
                message.error('Server Error! Please refresh again! (Verify Error')
            }
            else {
                message.error('Server Error! Please try again later. (Verify Error)')
            }
            setOpenFail(true);
        })

    };
    const resend = () => {
        axios.post("/verification/resendCode/" + newEmail).then(res => {
            console.log(res.data.msg);
            setLoading(false);
            message.success('Verify code has resend!');
        }).catch((error) => {
            //console.log(error.response.status)
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
                message.error('Server Error! Please refresh again! (Resend Verify Code Error)')
            }
            else {
                message.error('Server Error! Please try again later. (Resend Verify Code Error)')
            }
            setLoading(false);
        })
        setLoading(true);

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
        <div className='verificationPage'>
            {render &&
                <MediaContextProvider>
                    <Media at="xl" className='VerificationPage__Media'>
                        <Layout className='verificationPage__Outer'>
                            <Sider className='verificationPage__Sider' width={"60%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/003/410/006/original/continuous-one-line-drawing-of-hand-writing-with-a-pen-on-paper-vector.jpg" alt="一張圖片" />
                            </Sider>
                            <Content className='verificationPage__Content'>
                                <div className='verificationPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='verificationPage__Content__Text verificationPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="verificationPage__Form">
                                    <Form
                                        {...formItemLayout}
                                        name="register"
                                        onFinish={() => { onFinish() }}
                                        initialValues={{
                                            email: email
                                        }}
                                        scrollToFirstError
                                    >
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            name="email"
                                            className='Verification__Form__Item'
                                            //label="E-mail"
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
                                            <Input placeholder='Email' defaultValue={email} disabled />

                                        </Form.Item>
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Code' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Verification__Form__Item'
                                            name="Code"
                                            //label="Code"
                                            tooltip="Input your verify code!"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your verify code!',
                                                    whitespace: true,
                                                },
                                            ]}
                                            wrapperCol={tailFormItemLayout}
                                        >
                                            <Row gutter={0}>
                                                <Col span={20}>
                                                    <Input placeholder='Code' onChange={(e) => { setCode(e.target.value) }} />
                                                </Col>
                                                <Col className='Verification__Resend__Button' span={3}>
                                                    <Tooltip arrowPointAtCenter={true} placement="top" title={"Resend verify code"} color={'#000'}>
                                                        <div className='verificationPage__Resend__Button'><ReloadOutlined onClick={() => { resend() }} /></div>
                                                    </Tooltip>
                                                </Col>
                                            </Row>

                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="verificationPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="verificationPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Verify"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>
                                    {/* </Spin> */}
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="lg" className='VerificationPage__Media'>
                        <Layout className='verificationPage__Outer'>
                            <Sider className='verificationPage__Sider' width={"60%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/003/410/006/original/continuous-one-line-drawing-of-hand-writing-with-a-pen-on-paper-vector.jpg" alt="一張圖片" />
                            </Sider>
                            <Content className='verificationPage__Content'>
                                <div className='verificationPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='verificationPage__Content__Text verificationPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="verificationPage__Form">
                                    <Form
                                        {...formItemLayout}
                                        name="register"
                                        onFinish={() => { onFinish() }}
                                        initialValues={{
                                            email: email
                                        }}
                                        scrollToFirstError
                                    >
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            name="email"
                                            className='Verification__Form__Item'
                                            //label="E-mail"
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
                                            <Input placeholder='Email' defaultValue={email} disabled />

                                        </Form.Item>
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Code' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Verification__Form__Item'
                                            name="Code"
                                            //label="Code"
                                            tooltip="Input your verify code!"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your verify code!',
                                                    whitespace: true,
                                                },
                                            ]}
                                            wrapperCol={tailFormItemLayout}
                                        >
                                            <Row gutter={0}>
                                                <Col span={20}>
                                                    <Input placeholder='Code' onChange={(e) => { setCode(e.target.value) }} />
                                                </Col>
                                                <Col className='Verification__Resend__Button' span={3}>
                                                    <Tooltip arrowPointAtCenter={true} placement="top" title={"Resend verify code"} color={'#000'}>
                                                        <div className='verificationPage__Resend__Button'><ReloadOutlined onClick={() => { resend() }} /></div>
                                                    </Tooltip>
                                                </Col>
                                            </Row>

                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="verificationPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="verificationPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Verify"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>
                                    {/* </Spin> */}
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="md" className='VerificationPage__Media'>
                        <Layout className='verificationPage__Outer'>
                            <Sider className='verificationPage__Sider__md' width={"40%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/003/410/006/original/continuous-one-line-drawing-of-hand-writing-with-a-pen-on-paper-vector.jpg" alt="一張圖片" />
                            </Sider>
                            <Content className='verificationPage__Content__md'>
                                <div className='verificationPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='verificationPage__Content__Text verificationPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="verificationPage__Form">
                                    <Form
                                        {...formItemLayout}
                                        name="register"
                                        onFinish={() => { onFinish() }}
                                        initialValues={{
                                            email: email
                                        }}
                                        scrollToFirstError
                                    >
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            name="email"
                                            className='Verification__Form__Item'
                                            //label="E-mail"
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
                                            <Input placeholder='Email' defaultValue={email} disabled />

                                        </Form.Item>
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Code' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Verification__Form__Item'
                                            name="Code"
                                            //label="Code"
                                            tooltip="Input your verify code!"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your verify code!',
                                                    whitespace: true,
                                                },
                                            ]}
                                            wrapperCol={tailFormItemLayout}
                                        >
                                            <Row gutter={0}>
                                                <Col span={20}>
                                                    <Input placeholder='Code' onChange={(e) => { setCode(e.target.value) }} />
                                                </Col>
                                                <Col className='Verification__Resend__Button' span={3}>
                                                    <Tooltip arrowPointAtCenter={true} placement="top" title={"Resend verify code"} color={'#000'}>
                                                        <div className='verificationPage__Resend__Button'><ReloadOutlined onClick={() => { resend() }} /></div>
                                                    </Tooltip>
                                                </Col>
                                            </Row>

                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="verificationPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="verificationPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Verify"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>
                                    {/* </Spin> */}
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="lm" className='VerificationPage__Media'>
                        <Layout className='verificationPage__Outer'>
                            <Content className='verificationPage__Content__sm'>
                                <div className='verificationPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='verificationPage__Content__Text verificationPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="verificationPage__Form">
                                    <Form
                                        {...formItemLayout}
                                        name="register"
                                        onFinish={() => { onFinish() }}
                                        initialValues={{
                                            email: email
                                        }}
                                        scrollToFirstError
                                    >
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            name="email"
                                            className='Verification__Form__Item'
                                            //label="E-mail"
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
                                            <Input placeholder='Email' defaultValue={email} disabled />

                                        </Form.Item>
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Code' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Verification__Form__Item'
                                            name="Code"
                                            //label="Code"
                                            tooltip="Input your verify code!"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your verify code!',
                                                    whitespace: true,
                                                },
                                            ]}
                                            wrapperCol={tailFormItemLayout}
                                        >
                                            <Row gutter={0}>
                                                <Col span={20}>
                                                    <Input placeholder='Code' onChange={(e) => { setCode(e.target.value) }} />
                                                </Col>
                                                <Col className='Verification__Resend__Button' span={3}>
                                                    <Tooltip arrowPointAtCenter={true} placement="top" title={"Resend verify code"} color={'#000'}>
                                                        <div className='verificationPage__Resend__Button'><ReloadOutlined onClick={() => { resend() }} /></div>
                                                    </Tooltip>
                                                </Col>
                                            </Row>

                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="verificationPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="verificationPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Verify"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>
                                    {/* </Spin> */}
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="sm" className='verificationPage__Media'>
                        <Layout className='verificationPage__Outer'>
                            <Content className='verificationPage__Content__sm'>
                                <div className='verificationPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='verificationPage__Content__Text verificationPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="verificationPage__Form">
                                    <Form
                                        {...formItemLayout}
                                        name="register"
                                        onFinish={() => { onFinish() }}
                                        initialValues={{
                                            email: email
                                        }}
                                        scrollToFirstError
                                    >
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            name="email"
                                            className='Verification__Form__Item'
                                            //label="E-mail"
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
                                            <Input placeholder='Email' defaultValue={email} disabled />

                                        </Form.Item>
                                        <div className='verificationPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Code' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Verification__Form__Item'
                                            name="Code"
                                            //label="Code"
                                            tooltip="Input your verify code!"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your verify code!',
                                                    whitespace: true,
                                                },
                                            ]}
                                            wrapperCol={tailFormItemLayout}
                                        >
                                            <Row gutter={0}>
                                                <Col span={20}>
                                                    <Input placeholder='Code' onChange={(e) => { setCode(e.target.value) }} />
                                                </Col>
                                                <Col className='Verification__Resend__Button' span={3}>
                                                    <Tooltip arrowPointAtCenter={true} placement="top" title={"Resend verify code"} color={'#000'}>
                                                        <div className='verificationPage__Resend__Button'><ReloadOutlined onClick={() => { resend() }} /></div>
                                                    </Tooltip>
                                                </Col>
                                            </Row>

                                        </Form.Item>
                                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                                            <a className="verificationPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>

                                            <div className="verificationPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"Verify"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>
                                    {/* </Spin> */}
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                </MediaContextProvider>
            }
        </div>


    );


}

export default VerificationPage;