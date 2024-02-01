import { Button, Form, Input, message, Typography } from 'antd';
import { Api, Mappers, Types } from 'modules/auth';
import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: Types.IForm.Login) => {
    try {
      const loginRes = await Api.Login(values);
      const token = loginRes.data.data;

      const meRes = await Api.Me({ token });
      const user = Mappers.User(meRes.data);
      navigate('/movies');

      message.success(`Successfully Logged in. Hi ${user.name} 🎉`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center pt-20">
      <Form autoComplete="off" onFinish={handleSubmit} className="flex w-[500px] flex-col gap-2">
        <Typography className="text-center text-3xl text-blue-700">Login Form</Typography>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Enter your email',
              whitespace: true,
              type: 'email'
            }
          ]}
          hasFeedback
          name="email"
        >
          <Input id="email" type="email" placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Enter your password',
              whitespace: true,
              min: 6
            }
          ]}
          hasFeedback
          name="password"
        >
          <Input.Password id="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button className="uppercase" block type="primary" htmlType="submit" size="large">
            Login
          </Button>
        </Form.Item>
        <Link className="w-max self-end" to="/auth/register">
          go to register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
