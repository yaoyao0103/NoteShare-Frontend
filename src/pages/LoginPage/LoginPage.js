import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Layout, Checkbox, Form, Input, message } from "antd";
import { Base64 } from 'js-base64';
import Button from '../../components/Button/Button';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Text from '../../components/Text/Text';
import axios from '../../components/axios/axios';
import Cookie from '../../components/Cookies/Cookies';
import './LoginPage.css'
import Logo from '../../components/Navbar/Logo/Logo';
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
function LoginPage(props) {
    const [Page, setPage] = useState('LoginPage');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [render, setRender] = useState(false);
    const [hasRemember, setHasRemember] = useState('');
    const [form] = Form.useForm();
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    //const form =createRef();
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        //console.log(email);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        //console.log(password);
    }

    useEffect(() => {
        setPage('LoginPage');
    }, [Page]);
    var startEmail = '';
    var startPassword = '';
    useEffect(() => {
        let rEmail = cookieParser.getCookieByName('rEmail');
        let rPassword = cookieParser.getCookieByName('rPassword');
        if (rEmail && rPassword) {
            setHasRemember('A');

            startEmail = Base64.decode(rEmail);
            //console.log(startEmail);
            startPassword = Base64.decode(rPassword);
            //console.log(startPassword);
            form.setFieldsValue({
                email: startEmail,
                password: startPassword

            });
            setEmail(startEmail);
            setPassword(startPassword);
        }

        setRender(true);
    }, []);
    useEffect(() => {
        if (render)
            props.setLoading(false);


    }, [props]);
    useEffect(() => {

        props.setLoading(false);


    }, [render]);
    const onFinish = (values) => {
        login();
    };
    const rememberChange = (checked) => {
        if (checked)
            setHasRemember('A');
        else
            setHasRemember('');
        //console.log(remember);

    };
    const login = () => {
        var str = Base64.encode(email);
        document.cookie = "email=" + str + ';path=/sharePage/note';
        document.cookie = "email=" + str + ';path=/sharePage/post';
        document.cookie = "email=" + str + ';path=/';
        if (hasRemember === 'A') {
            str = Base64.encode(email);
            document.cookie = "rEmail=" + str + ';path=/';
            document.cookie = "rEmail=" + str + ';path=/sharePage/note';
            document.cookie = "rEmail=" + str + ';path=/sharePage/post';
            str = Base64.encode(password);
            document.cookie = "rPassword=" + str + ';path=/';
            document.cookie = "rPassword=" + str + ';path=/sharePage/note';
            document.cookie = "rPassword=" + str + ';path=/sharePage/post';
            //console.log('1111111')
        }
        axios.post("/verification/login", {
            email: email,
            password: password
        }).then(res => {
            document.cookie = "token=" + res.data.token + ';path=/sharePage/note';
            document.cookie = "token=" + res.data.token + ';path=/sharePage/post';
            document.cookie = "token=" + res.data.token + ';path=/';
            //console.log(document.cookie);
            if (res.data.activate) {
                props.setLoggedIn(true)
                props.setPageProps({ page: 'MemberPage', pageNumber: 1, sortMode: 'likeCount' })
            }
            else {
                message.warn("You have not activate your account!")
                axios.post("/verification/resendCode/" + email).then(res => {
                    //console.log(res.data.msg);
                }).catch((error) => {
                    console.log(error.response.status);
                    if (error.response.status === 500 || error.response.status === 404 || error.response.status === 403) {
                        if (error.response.data.message.slice(0, 13) === 'Malformed JWT') {
                            document.cookie = 'error=Jwt;path=/sharePage/note'
                            document.cookie = 'error=Jwt;path=/sharePage/post'
                            document.cookie = 'error=Jwt;path=/'
                            message.destroy()
                            message.warning('The connection timed out, please login again !')
                            document.cookie = 'email=;'
                            props.setLoggedIn(false)
                            props.setPageProps({ page: 'LoginPage' })
                        }
                        else {
                            document.cookie = 'error=true;path=/sharePage/note'
                            document.cookie = 'error=true;path=/sharePage/post'
                            document.cookie = 'error=true;path=/'
                        }
                        message.error('Server Error! Please refresh again! (Resend Verify Code Error)')
                    }
                    else {
                        message.error('Server Error! Please try again laetr. (Resend Verify Code Error)')
                    }
                })

                props.setPageProps({ page: 'VerificationPage', email: email });
            }

        }).catch((error) => {
            console.log(error.response.status)
            if (error.response.status === 403) {
                message.error("Please enter correct email or password!")
            }
            else if (error.response.status === 404) {
                message.error("Please sign up first!")
            }
            else {
                message.error("Server Error! Please try again later. (Login Error)")
            }
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
    return (
        <div className='loginPage'>

            {render &&
                <MediaContextProvider>
                    <Media at="xl" className='loginPage__Media'>

                        <Layout className='loginPage__Outer'>
                            <Sider className='loginPage__Sider' width={"60%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/004/482/308/non_2x/single-one-line-drawing-students-woman-and-man-reading-learning-and-sitting-on-big-books-study-in-library-literature-fans-or-lovers-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                            </Sider>
                            <Content className='loginPage__Content'>
                                <div className='loginPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='loginPage__Content__Text loginPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="loginPage__Form">
                                    <Form
                                        name="normal_login"
                                        size='large'

                                        form={form}
                                        {...formItemLayout}
                                        onFinish={onFinish}
                                    >
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Email!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                placeholder="Email"
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                        </Form.Item>
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Password' fontSize='13' />
                                        </div>

                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Password!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => { setPassword(e.target.value); }}
                                            />
                                        </Form.Item>
                                        <Form.Item className='Login__Form__Item'>

                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox.Group defaultValue={hasRemember}>
                                                    <Checkbox value="A" onChange={(e) => { rememberChange(e.target.checked) }}>Remember me</Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>


                                            <div className="loginPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"LogIn"} fontSize='15' display="inline-block" /></Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item className='loginPage__Form__Item'>
                                            <a href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'SignUpPage' }))}>Register now!</a>
                                            <a className="loginPage__Content__Form__Forgot" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'ForgetPasswordPage' }))}>
                                                Forgot password?
                                            </a>

                                        </Form.Item>
                                    </Form>
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="lg" className='loginPage__Media'>

                        <Layout className='loginPage__Outer'>
                            <Sider className='loginPage__Sider' width={"60%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/004/482/308/non_2x/single-one-line-drawing-students-woman-and-man-reading-learning-and-sitting-on-big-books-study-in-library-literature-fans-or-lovers-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                            </Sider>
                            <Content className='loginPage__Content'>
                                <div className='loginPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='loginPage__Content__Text loginPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="loginPage__Form">
                                    <Form
                                        name="normal_login"
                                        size='large'

                                        form={form}
                                        {...formItemLayout}
                                        onFinish={onFinish}
                                    >
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Email!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                placeholder="Email"
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                        </Form.Item>
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Password' fontSize='13' />
                                        </div>

                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Password!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => { setPassword(e.target.value); }}
                                            />
                                        </Form.Item>
                                        <Form.Item className='Login__Form__Item'>

                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox.Group defaultValue={hasRemember}>
                                                    <Checkbox value="A" onChange={(e) => { rememberChange(e.target.checked) }}>Remember me</Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>


                                            <div className="loginPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"LogIn"} fontSize='15' display="inline-block" /></Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item className='loginPage__Form__Item'>
                                            <a href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'SignUpPage' }))}>Register now!</a>
                                            <a className="loginPage__Content__Form__Forgot" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'ForgetPasswordPage' }))}>
                                                Forgot password?
                                            </a>

                                        </Form.Item>
                                    </Form>
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="md" className='loginPage__Media'>

                        <Layout className='loginPage__Outer'>
                            <Sider className='loginPage__Sider__md' width={"50%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/004/482/308/non_2x/single-one-line-drawing-students-woman-and-man-reading-learning-and-sitting-on-big-books-study-in-library-literature-fans-or-lovers-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                            </Sider>
                            <Content className='loginPage__Content__md'>
                                <div className='loginPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='loginPage__Content__Text loginPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="loginPage__Form">
                                    <Form
                                        name="normal_login"
                                        size='large'

                                        form={form}
                                        {...formItemLayout}
                                        onFinish={onFinish}
                                    >
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Email!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                placeholder="Email"
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                        </Form.Item>
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Password' fontSize='13' />
                                        </div>

                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Password!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => { setPassword(e.target.value); }}
                                            />
                                        </Form.Item>
                                        <Form.Item className='Login__Form__Item'>

                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox.Group defaultValue={hasRemember}>
                                                    <Checkbox value="A" onChange={(e) => { rememberChange(e.target.checked) }}>Remember me</Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>


                                            <div className="loginPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"LogIn"} fontSize='15' display="inline-block" /></Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item className='loginPage__Form__Item'>
                                            <a href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'SignUpPage' }))}>Register now!</a>

                                        </Form.Item>
                                        <Form.Item className='loginPage__Form__Item'>
                                            <a className="loginPage__Content__Form__Forgot__sm" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'ForgetPasswordPage' }))}>
                                                Forgot password?
                                            </a>

                                        </Form.Item>
                                    </Form>
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="lm" className='loginPage__Media'>

                        <Layout className='loginPage__Outer'>
                            {/* <Sider className='loginPage__Sider' width={"60%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/004/482/308/non_2x/single-one-line-drawing-students-woman-and-man-reading-learning-and-sitting-on-big-books-study-in-library-literature-fans-or-lovers-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                            </Sider> */}
                            <Content className='loginPage__Content__sm'>
                                <div className='loginPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='loginPage__Content__Text loginPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="loginPage__Form">
                                    <Form
                                        name="normal_login"
                                        size='large'

                                        form={form}
                                        {...formItemLayout}
                                        onFinish={onFinish}
                                    >
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Email!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                placeholder="Email"
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                        </Form.Item>
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Password' fontSize='13' />
                                        </div>

                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Password!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => { setPassword(e.target.value); }}
                                            />
                                        </Form.Item>
                                        <Form.Item className='Login__Form__Item'>

                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox.Group defaultValue={hasRemember}>
                                                    <Checkbox value="A" onChange={(e) => { rememberChange(e.target.checked) }}>Remember me</Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>


                                            <div className="loginPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"LogIn"} fontSize='15' display="inline-block" /></Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item className='loginPage__Form__Item'>
                                            <a href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'SignUpPage' }))}>Register now!</a>


                                        </Form.Item>
                                        <Form.Item className='loginPage__Form__Item'>

                                            <a className="loginPage__Content__Form__Forgot__sm" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'ForgetPasswordPage' }))}>
                                                Forgot password?
                                            </a>

                                        </Form.Item>
                                    </Form>
                                </div>
                            </Content>
                        </Layout>
                    </Media>
                    <Media at="sm" className='loginPage__Media'>

                        <Layout className='loginPage__Outer'>
                            {/* <Sider className='loginPage__Sider' width={"60%"}>
                                <img src="https://static.vecteezy.com/system/resources/previews/004/482/308/non_2x/single-one-line-drawing-students-woman-and-man-reading-learning-and-sitting-on-big-books-study-in-library-literature-fans-or-lovers-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                            </Sider> */}
                            <Content className='loginPage__Content__sm'>
                                <div className='loginPage__Content__Text'>
                                    <Text color='black' cls='Large' content='Welcome to Note' fontSize='22' />
                                    <Text color='purple' cls='Large' content='Share' fontSize='22' />
                                </div>
                                <div className='loginPage__Content__Text loginPage__Content__Text__Bottom'>
                                    <Text color='black' cls='Default' content='Write your own note!' fontSize='10' />
                                </div>
                                <div className="loginPage__Form">
                                    <Form
                                        name="normal_login"
                                        size='large'

                                        form={form}
                                        {...formItemLayout}
                                        onFinish={onFinish}
                                    >
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Email' fontSize='13' />
                                        </div>
                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="email"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Email!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                placeholder="Email"
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                        </Form.Item>
                                        <div className='loginPage__Content__Form__Text'>
                                            <Text color='black' cls='Small' content='Password' fontSize='13' />
                                        </div>

                                        <Form.Item
                                            className='Login__Form__Item'
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter your Password!',
                                                },
                                            ]}
                                        >
                                            <Input

                                                type="password"
                                                placeholder="Password"
                                                onChange={(e) => { setPassword(e.target.value); }}
                                            />
                                        </Form.Item>
                                        <Form.Item className='Login__Form__Item'>

                                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                                <Checkbox.Group defaultValue={hasRemember}>
                                                    <Checkbox value="A" onChange={(e) => { rememberChange(e.target.checked) }}>Remember me</Checkbox>
                                                </Checkbox.Group>
                                            </Form.Item>


                                            <div className="loginPage__Button">
                                                <Button color={"green"}><Text color='white' cls='Large' content={"LogIn"} fontSize='15' display="inline-block" /></Button>
                                            </div>
                                        </Form.Item>
                                        <Form.Item className='loginPage__Form__Item'>
                                            <a href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'SignUpPage' }))}>Register now!</a>


                                        </Form.Item>
                                        <Form.Item className='loginPage__Form__Item'>

                                            <a className="loginPage__Content__Form__Forgot__sm" href="javascript: return false;" onClick={() => (props.setPageProps({ page: 'ForgetPasswordPage' }))}>
                                                Forgot password?
                                            </a>

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

export default LoginPage;

//https://img.freepik.com/free-vector/hand-holding-book-line-drawing-continuous-one-line-illustration_469760-420.jpg