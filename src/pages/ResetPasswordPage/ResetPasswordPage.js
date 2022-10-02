import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Layout, Form, Input, message, Row, Col, Tooltip, Spin } from "antd";
import { ReloadOutlined, LoadingOutlined } from '@ant-design/icons';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import axios from '../../components/axios/axios';
import './ResetPasswordPage.css'
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
function ResetPasswordPage(props) {
    const [Page, setPage] = useState('ResetPasswordPage');
    const [render, setRender] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    const [error, setError] = useState('');
    const { email } = props;
    //console.log(email);
    let newEmail = props.email.replace('@', '%40');
    useEffect(() => {
        setPage('ResetPasswordPage');
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

        ResetPassword();
    };

    const ResetPassword = () => {
        props.setLoading(true);
        axios.post("/verification/resetPassword", { password: oldPassword, newPassword: newPassword, email: props.email, }, {
            headers: {
                'Authorization': 'Bearer ' + cookieParser.getCookieByName("token"),
            }
        }).then(res => {
            console.log(res);
            message.success("Your password has reset! Please log in again!");
            document.cookie = 'email=;';
            props.setLoggedIn(false);
            props.setPageProps({
                page: 'LoginPage',

            })
            props.setLoading(false);
        }).catch((error) => {
            setOpenFail(true);
            console.log("err",error.response);
            if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                if(error.response.data.msg === 'Wrong password.'){
                    message.warning("Your have to enter the correct password!")
                }
                else if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                    document.cookie = 'error=Jwt'
                    message.destroy()
                    message.warning('The connection timed out, please login again !')
                    document.cookie = 'email=;'
                    props.setLoggedIn(false)
                    props.setPageProps({ page: 'LoginPage' })
                }
                else{
                    message.error('Server Error! Please refresh again! (Reset Password Error)')
                    document.cookie = 'error=true'
                }
            }
            else {
                message.error("Server Error! Please try again later. (Reset Password Error)")
            }
            props.setLoading(false);
        })

    };





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
        <div className='signUpPage'>
            {render &&
                <div className='signUpPage__Outer'>
                    <MediaContextProvider>
                        <Media at="xl" className='resetPasswordPage__Media'>
                            <Spin className='signUpPage__Spin' indicator={antIcon} spinning={loading}>
                                <Layout className='signUpPagee__Outer'>
                                    <Sider className='signUpPage__Sider' width={"60%"}>
                                        <img src="https://static.vecteezy.com/system/resources/previews/004/482/351/original/single-one-line-drawing-couple-with-laptop-sitting-at-the-park-together-freelance-distance-learning-online-courses-studying-concept-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                                    </Sider>
                                    <Content className='signUpPage__Content'>
                                        <div className='signUpPage__Content__Text'>
                                            <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                            <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                        </div>
                                        <div className='signUpPage__Content__Text signUpPage__Content__Text__Bottom'>
                                            <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                        </div>
                                        <div className="signUpPage__Form">
                                            <Form
                                                {...formItemLayout}
                                                name="register"
                                                onFinish={onFinish}
                                                initialValues={{
                                                    email: props.email
                                                }}
                                                scrollToFirstError
                                            >
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Email' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    name="email"
                                                    className='signUpPage__Form__Item'
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
                                                    <Input disabled />
                                                </Form.Item>
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Old Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="old password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setOldPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='New Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="new password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('old password') !== value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('Please enter a different password from the old password!'));
                                                            },
                                                        }),
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setNewPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Confirm Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="confirm"
                                                    //label="Confirm Password"
                                                    dependencies={['new password']}
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('new password') === value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password placeholder="Confirm Password" />
                                                </Form.Item>




                                                <Form.Item {...tailFormItemLayout} className='signUpPage__Form__Item'>
                                                    <div className="signUpPage__Button">
                                                        <Button color={"green"}><Text color='white' cls='Large' content={"Reset"} fontSize='15' display="inline-block" /></Button>
                                                    </div>

                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </Content>
                                </Layout>
                            </Spin>
                        </Media>
                        <Media at="lg" className='resetPasswordPage__Media'>
                            <Spin className='signUpPage__Spin' indicator={antIcon} spinning={loading}>
                                <Layout className='signUpPagee__Outer'>
                                    <Sider className='signUpPage__Sider' width={"60%"}>
                                        <img src="https://static.vecteezy.com/system/resources/previews/004/482/351/original/single-one-line-drawing-couple-with-laptop-sitting-at-the-park-together-freelance-distance-learning-online-courses-studying-concept-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                                    </Sider>
                                    <Content className='signUpPage__Content'>
                                        <div className='signUpPage__Content__Text'>
                                            <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                            <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                        </div>
                                        <div className='signUpPage__Content__Text signUpPage__Content__Text__Bottom'>
                                            <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                        </div>
                                        <div className="signUpPage__Form">
                                            <Form
                                                {...formItemLayout}
                                                name="register"
                                                onFinish={onFinish}
                                                initialValues={{
                                                    email: props.email
                                                }}
                                                scrollToFirstError
                                            >
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Email' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    name="email"
                                                    className='signUpPage__Form__Item'
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
                                                    <Input disabled />
                                                </Form.Item>
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Old Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="old password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setOldPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='New Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="new password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('old password') !== value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('Please enter a different password from the old password!'));
                                                            },
                                                        }),
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setNewPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Confirm Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="confirm"
                                                    //label="Confirm Password"
                                                    dependencies={['new password']}
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('new password') === value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password placeholder="Confirm Password" />
                                                </Form.Item>




                                                <Form.Item {...tailFormItemLayout} className='signUpPage__Form__Item'>
                                                    <div className="signUpPage__Button">
                                                        <Button color={"green"}><Text color='white' cls='Large' content={"Reset"} fontSize='15' display="inline-block" /></Button>
                                                    </div>

                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </Content>
                                </Layout>
                            </Spin>
                        </Media>
                        <Media at="md" className='resetPasswordPage__Media'>
                            <Spin className='signUpPage__Spin' indicator={antIcon} spinning={loading}>
                                <Layout className='signUpPagee__Outer'>
                                    <Sider className='signUpPage__Sider__md' width={"40%"}>
                                        <img src="https://static.vecteezy.com/system/resources/previews/004/482/351/original/single-one-line-drawing-couple-with-laptop-sitting-at-the-park-together-freelance-distance-learning-online-courses-studying-concept-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                                    </Sider>
                                    <Content className='signUpPage__Content__md'>
                                        <div className='signUpPage__Content__Text'>
                                            <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                            <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                        </div>
                                        <div className='signUpPage__Content__Text signUpPage__Content__Text__Bottom'>
                                            <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                        </div>
                                        <div className="signUpPage__Form">
                                            <Form
                                                {...formItemLayout}
                                                name="register"
                                                onFinish={onFinish}
                                                initialValues={{
                                                    email: props.email
                                                }}
                                                scrollToFirstError
                                            >
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Email' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    name="email"
                                                    className='signUpPage__Form__Item'
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
                                                    <Input disabled />
                                                </Form.Item>
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Old Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="old password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setOldPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='New Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="new password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('old password') !== value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('Please enter a different password from the old password!'));
                                                            },
                                                        }),
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setNewPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Confirm Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="confirm"
                                                    //label="Confirm Password"
                                                    dependencies={['new password']}
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('new password') === value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password placeholder="Confirm Password" />
                                                </Form.Item>




                                                <Form.Item {...tailFormItemLayout} className='signUpPage__Form__Item'>
                                                    <div className="signUpPage__Button">
                                                        <Button color={"green"}><Text color='white' cls='Large' content={"Reset"} fontSize='15' display="inline-block" /></Button>
                                                    </div>

                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </Content>
                                </Layout>
                            </Spin>
                        </Media>
                        <Media at="lm" className='resetPasswordPage__Media'>
                            <Spin className='signUpPage__Spin' indicator={antIcon} spinning={loading}>
                                <Layout className='signUpPagee__Outer'>
                                    
                                    <Content className='signUpPage__Content__sm'>
                                        <div className='signUpPage__Content__Text'>
                                            <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                            <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                        </div>
                                        <div className='signUpPage__Content__Text signUpPage__Content__Text__Bottom'>
                                            <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                        </div>
                                        <div className="signUpPage__Form">
                                            <Form
                                                {...formItemLayout}
                                                name="register"
                                                onFinish={onFinish}
                                                initialValues={{
                                                    email: props.email
                                                }}
                                                scrollToFirstError
                                            >
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Email' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    name="email"
                                                    className='signUpPage__Form__Item'
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
                                                    <Input disabled />
                                                </Form.Item>
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Old Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="old password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setOldPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='New Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="new password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('old password') !== value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('Please enter a different password from the old password!'));
                                                            },
                                                        }),
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setNewPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Confirm Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="confirm"
                                                    //label="Confirm Password"
                                                    dependencies={['new password']}
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('new password') === value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password placeholder="Confirm Password" />
                                                </Form.Item>




                                                <Form.Item {...tailFormItemLayout} className='signUpPage__Form__Item'>
                                                    <div className="signUpPage__Button">
                                                        <Button color={"green"}><Text color='white' cls='Large' content={"Reset"} fontSize='15' display="inline-block" /></Button>
                                                    </div>

                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </Content>
                                </Layout>
                            </Spin>
                        </Media>
                        <Media at="sm" className='resetPasswordPage__Media'>
                            <Spin className='signUpPage__Spin' indicator={antIcon} spinning={loading}>
                                <Layout className='signUpPagee__Outer'>
                                   
                                    <Content className='signUpPage__Content__sm'>
                                        <div className='signUpPage__Content__Text'>
                                            <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                            <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                        </div>
                                        <div className='signUpPage__Content__Text signUpPage__Content__Text__Bottom'>
                                            <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                        </div>
                                        <div className="signUpPage__Form">
                                            <Form
                                                {...formItemLayout}
                                                name="register"
                                                onFinish={onFinish}
                                                initialValues={{
                                                    email: props.email
                                                }}
                                                scrollToFirstError
                                            >
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Email' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    name="email"
                                                    className='signUpPage__Form__Item'
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
                                                    <Input disabled />
                                                </Form.Item>
                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Old Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="old password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setOldPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='New Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="new password"
                                                    //label="Password"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('old password') !== value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('Please enter a different password from the old password!'));
                                                            },
                                                        }),
                                                    ]}
                                                    hasFeedback
                                                >
                                                    <Input.Password placeholder="Password" onChange={(e) => { setNewPassword(e.target.value) }} />
                                                </Form.Item>

                                                <div className='signUpPage__Content__Form__Text'>
                                                    <Text color='black' cls='Small' content='Confirm Password' fontSize='13' />
                                                </div>
                                                <Form.Item
                                                    className='signUpPage__Form__Item'
                                                    name="confirm"
                                                    //label="Confirm Password"
                                                    dependencies={['new password']}
                                                    hasFeedback
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please confirm your password!',
                                                        },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('new password') === value) {
                                                                    return Promise.resolve();
                                                                }

                                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password placeholder="Confirm Password" />
                                                </Form.Item>




                                                <Form.Item {...tailFormItemLayout} className='signUpPage__Form__Item'>
                                                    <div className="signUpPage__Button">
                                                        <Button color={"green"}><Text color='white' cls='Large' content={"Reset"} fontSize='15' display="inline-block" /></Button>
                                                    </div>

                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </Content>
                                </Layout>
                            </Spin>
                        </Media>
                    </MediaContextProvider>
                </div>
            }
        </div>

    );


}

export default ResetPasswordPage;