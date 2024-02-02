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
    <div className=" container mx-auto flex h-full flex-col items-center  gap-2">
      <Form autoComplete="off" onFinish={handleSubmit} className="flex w-[800px] flex-col gap-2">
        <Typography className="text-center text-3xl">Login Form</Typography>
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
          <Input id="email" type="email" placeholder="email" size="large" />
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
          <Input.Password id="password" placeholder="password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" size="large">
            Login
          </Button>
        </Form.Item>
        <NavLink to="/auth/register">Register</NavLink>
      </Form>
    </div>
  );
};

export default Login;
