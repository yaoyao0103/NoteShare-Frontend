import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { Form, Input, message, Row, Col,Tooltip,Spin } from "antd";
import { ReloadOutlined ,LoadingOutlined} from '@ant-design/icons';
import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import axios from "axios";
import './VerificationPage.css'
import Logo from '../../components/Navbar/Logo/Logo';


function VerificationPage() {
    const [Page, setPage] = useState('VerificationPage');
    const [render, setRender] = useState(false);
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);
    const [resendFail, setResendFail] = useState(false);
    const [error, setError] = useState('');
    let { email } = useParams();
    //console.log(email);
    let newEmail = email.replace('@', '%40');
    useEffect(() => {
        setPage('VerificationPage');
    }, [Page]);
    useEffect(() => {
        setRender(true);
    });
    const onFinish = (values) => {
        //console.log('Received values of form: ', values);

        Verification();
    };

    const Verification = () => {
        axios.put("http://localhost:8080/verification/verify/" + newEmail + "/" + code).then(res => {
            console.log(res.data.msg);
            setOpenSuccess(true);
        }).catch((error) => {
            console.log(error.response.status)
            // if(error.response.status === 403){
            //   setRedirectActivate(true);
            // }
            setOpenFail(true);
        })

    };
    const resend=()=>{
        axios.post("http://localhost:8080/verification/resendCode/" + newEmail).then(res => {
            console.log(res.data.msg);
            setResendSuccess(true);
        }).catch((error) => {
            console.log(error.response.status)
            // if(error.response.status === 403){
            //   setRedirectActivate(true);
            // }
            setResendFail(true);
        })
        setLoading(true);

    }
    useEffect(() => {
        if (resendSuccess){
            setLoading(false);
            message.info('Verify code has resend!');
        }
       
    }, [resendSuccess]);
    useEffect(() => {
        if (resendFail) {
            setLoading(false);
            message.info(error.msg);
        }
    }, [resendFail]);
    useEffect(() => {
        if (openSuccess)
            window.location.href = "/LoginPage/";
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
        <div className='VerificationPage'>
            <Navbar currPage={Page} changePage={(page) => { setPage(page) }} />
            {render &&
                <div className='Verification__Outer'>
                     <Spin className='SignUp__Spin' indicator={antIcon}  spinning={loading}>
                    <div className='Verification__Logo'><Logo /></div>
                   
                    <Form
                        className="Verification-form"
                        {...formItemLayout}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            email: email
                        }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            className='Verification__Form__Item'
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
                            <Input defaultValue={email} disabled />

                        </Form.Item>
                        <Form.Item
                            className='Verification__Form__Item'
                            name="Code"
                            label="Code"
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
                                    <Input onChange={(e) => { setCode(e.target.value) }} />
                                </Col>
                                <Col className='Verification__Resend__Button'span={3}>
                                <Tooltip arrowPointAtCenter={true} placement="top" title={"Resend verify code"} color={'#FFF'}>
                                <ReloadOutlined onClick={()=>{resend()}}/>
                                </Tooltip>
                                </Col>
                            </Row>

                        </Form.Item>
                        <Form.Item {...tailFormItemLayout} className='Verification__Form__Item'>
                            <a className="Verification__Login__Button" href="/LoginPage">Login now!</a>

                            <div className="Verification__Button">
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

export default VerificationPage;