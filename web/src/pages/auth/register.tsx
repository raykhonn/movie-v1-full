import { Button, Form, Input, message } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { Api, Types } from 'modules/auth';
import React from 'react';
import {useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: Types.IForm.Register) => {
    try {
      const loginRes = await Api.Register(values);
      navigate('/auth/login');

      message.success(`Successfully registered in. Hi ${loginRes.data.name} 🎉`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-2 ">
      <Form autoComplete="off" onFinish={handleSubmit} className="flex w-[800px] flex-col gap-2">
        <Typography className="text-center text-3xl">Register Form</Typography>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Enter your name',
              min: 3,
              whitespace: true,
              type: 'string'
            }
          ]}
          hasFeedback
          name="name"
        >
          <Input id="name" placeholder="Your name" size="large" />
        </Form.Item>
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
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
       </Form>
    </div>
  );
};
export default Register;
