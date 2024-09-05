import { Col, Form, Button, Input, Row, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import '../resources/authentication.css';
import { useEffect } from 'react';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // api url
    const apiUrl = import.meta.env.VITE_API_URL;

    const onFinish = (values) => {
        dispatch({ type: "showLoading" });
        axios.post(`${apiUrl}/users/register`, values)
            .then((res) => {
                dispatch({ type: "hideLoading" });
                message.success("Registration Successfull, Please Wait For Verification");
            })
            .catch(() => {
                dispatch({ type: "hideLoading" });
                message.error("Something Went Wrong");
            });

    };

    // if logged in he doesnot go to the register page
    useEffect(() => {
        if (localStorage.getItem('pos-user'))
            navigate("/home");
    }, []);


    return (
        <div className='authentication'>
            <Row>
                <Col lg={8} xs={22}>
                    <Form layout="vertical" onFinish={onFinish}>
                        <h2>Register</h2>
                        <Form.Item name="name" label="Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="userId" label="User ID">
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input type='password' />
                        </Form.Item>

                        <div className="auth-btn">
                            <Link to='/login'>Already Registed ? Click Here To Login</Link>
                            <Button htmlType="submit" type="primary">
                                Register
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Register;
