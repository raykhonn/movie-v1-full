import { Button, Form, Input, message, Typography } from 'antd';
import { Api, Mappers, Types } from 'modules/auth';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
      message.error(`login failed`);

      console.log(err);
    }
  };

  return (
    <div className=" container mx-auto flex flex-col items-center pt-24">
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
              min: 4
            }
          ]}
          hasFeedback
          name="password"
        >
          <Input.Password id="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" size="large">
            Login
          </Button>
        </Form.Item>
        <NavLink to="/auth/register">go to register</NavLink>
      </Form>
    </div>
  );
};

export default Login;
