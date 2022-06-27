import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Form, Input, Spin,message } from "antd";
import { LoadingOutlined} from '@ant-design/icons';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import axios from "axios";
import './SignUpPage.css'
import Logo from '../../components/Navbar/Logo/Logo';


function SignUpPage() {
    const [Page, setPage] = useState('SignUpPage');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [render, setRender] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const [error,setError]= useState('');
    useEffect(() => {
        setPage('SignUpPage');
    }, [Page]);
    var startEmail = '';
    var startPassword = '';
    useEffect(() => {


        setRender(true);
    });
    const onFinish = (values) => {
        //console.log('Received values of form: ', values);

        SignUp();
    };

    const SignUp = () => {
        axios.post("http://localhost:8080/verification/signup", {
            email: email,
            password: password,
            name: name,
            headshotPhoto:'https://joeschmoe.io/api/v1/james'
        }).then(res => {
            console.log(res.data.msg);
            setOpenSuccess(true);
        }).catch((error) => {
            //console.log(error.response.data)
            setError(error.response.data)
            // if(error.response.status === 403){
            //   setRedirectActivate(true);
            // }
            setOpenFail(true);
        })
        setLoading(true);

    };
    useEffect(() => {
        if (openSuccess)
            window.location.href = "/VerificationPage/" + email;
    }, [openSuccess]);
    useEffect(() => {
        if (openFail) {
            setLoading(false);
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
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
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
        <div className='SignUpPage'>

            <Navbar currPage={Page} changePage={(page) => { setPage(page) }} />
            {render &&
                <div className='SignUp__Outer'>
                    <Spin className='SignUp__Spin'indicator={antIcon}  spinning={loading}>
                    <div className='SignUp__Logo'><Logo /></div>
                   
                        <Form
                            className="SignUp-form"
                            {...formItemLayout}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{

                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="email"
                                className='SignUp__Form__Item'
                                label="E-mail"
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

                            <Form.Item
                                className='SignUp__Form__Item'
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Item>

                            <Form.Item
                                className='SignUp__Form__Item'
                                name="confirm"
                                label="Confirm Password"
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
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                className='SignUp__Form__Item'
                                name="Name"
                                label="Name"
                                tooltip="What do you want others to call you?"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input onChange={(e) => { setName(e.target.value) }} />
                            </Form.Item>




                            <Form.Item {...tailFormItemLayout} className='SignUp__Form__Item'>
                                <a className="SignUp__Login__Button" href="/LoginPage">Login now!</a>
                                <div className="SignUp__Button">
                                    <Button color={"green"}><Text color='white' cls='Large' content={" Register"} fontSize='15' display="inline-block" /></Button>
                                </div>

                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            }
        </div>

    );


}

export default SignUpPage;