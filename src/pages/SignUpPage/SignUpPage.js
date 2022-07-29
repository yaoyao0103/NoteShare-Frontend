import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Layout, Form, Input, Spin, message } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import axios from "axios";
import './SignUpPage.css'
import Logo from '../../components/Navbar/Logo/Logo';
import Cookie from '../../components/Cookies/Cookies';
const cookieParser =new Cookie(document.cookie)
const { Header, Sider, Content, Footer } = Layout;


function SignUpPage(props) {
    const [Page, setPage] = useState('SignUpPage');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    useEffect(() => {
        setPage('SignUpPage');
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
    const onFinish = () => {
        //console.log('Received values of form: ', values);
        setLoading(true);
        SignUp();
    };

    const SignUp = () => {
        axios.post("http://localhost:8080/verification/signup", {
            email: email,
            password: password,
            name: name,
            headshotPhoto: 'https://joeschmoe.io/api/v1/james'
        }).then(res => {
            console.log(res.data.msg);
            setOpenSuccess(true);
            setLoading(false);
        }).catch((error) => {
            console.log(error.response.status)
            if(error.response.status === 406){
                message.error("This name has been registered!")
            }
            else  if(error.response.status === 409){
                message.error("This email has been registered!")
            }
            else{
                message.error("Server Error! Please try again later. (Sign up Error)")
            }
            setLoading(false);
        })
        

    };
    useEffect(() => {
        if (openSuccess) {
            axios.post("http://localhost:8080/verification/resendCode/" + email).then(res => {
                console.log(res.data.msg);
            }).catch((error) => {
                console.log(error.response.status);
                if (error.response.status === 500 || error.response.status === 404){
                    document.cookie = 'error=true'
                }
                else if (error.response.status === 403){
                    document.cookie = 'error=Jwt'                       
                }
            })

            message.success("Success!")
            props.setPageProps({
                page: 'VerificationPage',
                email: email
            })
        }
    }, [openSuccess]);

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
                                            <Input placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                                        </Form.Item>


                                        <div className='signUpPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Password' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='signUpPage__Form__Item'
                                            name="password"
                                            //label="Password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',
                                                },
                                            ]}
                                            hasFeedback
                                        >
                                            <Input.Password placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                                        </Form.Item>

                                        <div className='signUpPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Confirm Password' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='signUpPage__Form__Item'
                                            name="confirm"
                                            //label="Confirm Password"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }

                                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password placeholder="Confirm Password" />
                                        </Form.Item>

                                        <div className='signUpPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Name' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='signUpPage__Form__Item'
                                            name="Name"
                                            //label="Name"
                                            tooltip="What do you want others to call you?"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your Name!',
                                                    whitespace: true,
                                                }
                                            ]}
                                        >
                                            <Input showCount maxLength={10} placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
                                        </Form.Item>




                                        <Form.Item {...tailFormItemLayout} className='signUpPage__Form__Item'>
                                            <a className="signUpPage__Login__Button" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'LoginPage' }))}>Login now!</a>
                                            <div className="signUpPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={" Register"} fontSize='15' display="inline-block" /></Button>
                                            </div>

                                        </Form.Item>
                                    </Form>
                                </div>
                            </Content>
                        </Layout>
                    </Spin>
                </div>
            }
        </div>

    );


}

export default SignUpPage;