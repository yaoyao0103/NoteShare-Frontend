import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Layout, Checkbox, Form, Input,message } from "antd";
import { Base64 } from 'js-base64';
import Button from '../../components/Button/Button';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Text from '../../components/Text/Text';
import axios from "axios";
import Cookie from '../../components/Cookies/Cookies';
import './LoginPage.css'
import Logo from '../../components/Navbar/Logo/Logo';

const { Header, Sider, Content, Footer } = Layout;

function LoginPage() {
    const [Page, setPage] = useState('LoginPage');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [render, setRender] = useState(false);
    const [hasRemember, setHasRemember] = useState('');
    const [remember,setRemember]=useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const [error,setError]= useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log(email);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log(password);
    }

    useEffect(() => {
        setPage('LoginPage');
    }, [Page]);
    var startEmail='';
    var startPassword='';
    useEffect(() => {
        let cookieParser = new Cookie(document.cookie);
        let rEmail=cookieParser.getCookieByName('email');
        let rPassword=cookieParser.getCookieByName('password');
        if(rEmail&&rPassword){
            setHasRemember('A');
            //console.log(email);
            startEmail= Base64.decode(rEmail);
            //console.log('e:'+Base64.decode(rEmail))
            startPassword =Base64.decode(rPassword);
            //console.log('p:'+Base64.decode(rPassword))
        }
       
        setRender(true);
    });
    const onFinish = (values) => {
        //console.log('Received values of form: ', values);

        login();
    };
    const rememberChange = (checked) => {
        if(checked)
        setRemember(true);
        else
        setRemember(false);
        //console.log(remember);

    };
    const login = () => {
        if (remember) {
            
            var str = Base64.encode(email);
            document.cookie = "email=" + str;
            var str = Base64.encode(password);
            document.cookie = "password=" + str;
            console.log('1111111')
        }
        axios.post("http://localhost:8080/verification/login", {
            email: email,
            password: password
        }).then(res => {
            document.cookie = "token=" + res.data.token;
           
            console.log(document.cookie)
            setOpenSuccess(true);
        }).catch((error) => {
            console.log(error.response.status)
            // if(error.response.status === 403){
            //   setRedirectActivate(true);
            // }
            setOpenFail(true);
        })
        
    };
    useEffect(() => {
        if (openSuccess)
            window.location.href = "/NoteOutlinePage" ;
    }, [openSuccess]);
    useEffect(() => {
        if (openFail) {
            
            message.info(error.msg);
        }
    }, [openFail]);
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
        <div className='LoginPage'>
            
            <Navbar currPage={Page} changePage={(page) => { setPage(page) }} />
            {render&&
            <div className='Login__Outer'>
                <div className='Login__Logo'><Logo /></div>
                
                <Form
                    name="normal_login"
                    className="login-form"
                    size='large'
                    initialValues={{
                        email:email,
                        password:password,
                        remember: true,
                    }}
                    {...formItemLayout}
                    onFinish={onFinish}
                >
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
                        <Input defaultValue={startEmail}prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    </Form.Item>
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
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            defaultValue={startPassword}
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

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item className='Login__Form__Item'>
                        <a href="/SignUpPage">register now!</a>
                        <div className="Login__Button">
                            <Button color={"green"}><Text color='white' cls='Large' content={"LogIn"} fontSize='15' display="inline-block" /></Button>
                        </div>
                    </Form.Item>
                </Form>

            </div>
            }
        </div>

    );


}

export default LoginPage;