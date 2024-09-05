import { Col, Form, Button, Input, Row, message } from 'antd';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../resources/authentication.css';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // api url
    const apiUrl = import.meta.env.VITE_API_URL;     

    const onFinish = (values) => {
        dispatch({ type: 'showLoading' });
        axios.post(`${apiUrl}/users/login`, values).then((res) => {
            dispatch({ type: 'hideLoading' });
            message.success('Login successfull');
            localStorage.setItem("pos-user", JSON.stringify(res.data));
            navigate("/home");
        }).catch(() => {
            dispatch({ type: 'hideLoading' });
            message.error('Something went wrong');
        });
    };

    useEffect(() => {
        if (localStorage.getItem('pos-user'))
            navigate("/home");
    }, []);

    return (
        <div className='authentication'>
            <Row>
                <Col lg={8} xs={22}>
                    <Form layout="vertical" onFinish={onFinish}>
                        <h2>Login</h2>
                        <Form.Item name="userId" label="User ID">
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
                            <Input type='password' />
                        </Form.Item>

                        <div className="auth-btn">
                            <Link to='/register'>Click Here To Register</Link>
                            <Button htmlType="submit" type="primary">
                                Login
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
