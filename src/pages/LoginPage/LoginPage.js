import React, { useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
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

function LoginPage(props) {
    const [Page, setPage] = useState('LoginPage');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [render, setRender] = useState(false);
    const [hasRemember, setHasRemember] = useState('');
    const [form] = Form.useForm();
    const [remember,setRemember]=useState(false);
    const [error,setError]= useState('');
    //const form =createRef();
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

            startEmail= Base64.decode(rEmail);

            startPassword =Base64.decode(rPassword);

            form.setFieldsValue({
                email: startEmail,
                password:startPassword
              });
            setEmail(startEmail);
            setPassword(startPassword);
        }

        setRender(true);
    },[]);
    const onFinish = (values) => {
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
            console.log(document.cookie);
            if(res.data.activate){
                props.setLoggedIn(true)
                props.setPageProps({page:'PersonalPage'})
            }
            else{
                props.setPageProps({page:'VerificationPage',email:email})
            }

        }).catch((error) => {
            console.log(error.response.status)

            message.info(error.msg);
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
            <Layout className='loginPage__Outer'>
                    <Sider className='loginPage__Sider' width={"60%"}>
                        <img src="https://static.vecteezy.com/system/resources/previews/004/482/308/non_2x/single-one-line-drawing-students-woman-and-man-reading-learning-and-sitting-on-big-books-study-in-library-literature-fans-or-lovers-modern-continuous-line-draw-design-graphic-illustration-vector.jpg" alt="一張圖片" />
                    </Sider>
                    <Content className='loginPage__Content'>
                        <div className='loginPage__Content__Text'>
                            <Text color='black' cls='Large' content='Welcome to Note' fontSize='22'/>
                            <Text color='purple' cls='Large' content='Share' fontSize='22'/>
                        </div>
                        <div className='loginPage__Content__Text loginPage__Content__Text__Bottom'>
                            <Text color='black' cls='Default' content='Write your own note!' fontSize='10'/>
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
                                    <Text color='black' cls='Small' content='Email' fontSize='13'/>
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
                                    <Text color='black' cls='Small' content='Password' fontSize='13'/>
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
                                    <a href="javascript: return false;"onClick={()=>(props.setPageProps({page:'SignUpPage'}))}>register now!</a>
                                    <a className="loginPage__Content__Form__Forgot" href="">
                                        Forgot password?
                                    </a>
                                    
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
            </Layout>
            }
        </div>

    );


}

export default LoginPage;

//https://img.freepik.com/free-vector/hand-holding-book-line-drawing-continuous-one-line-illustration_469760-420.jpg