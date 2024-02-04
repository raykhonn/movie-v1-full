import { Button, Form, Input, message } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { Api, Types } from 'modules/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className=" container mx-auto flex flex-col items-center pt-24">
      <Form autoComplete="off" onFinish={handleSubmit} className="flex w-[500px] flex-col gap-2">
        <Typography className="text-center text-3xl text-blue-700">Register Form</Typography>
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
          <Input id="name" placeholder="Full name" size="large" />
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
          <Button block type="primary" size="large" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
