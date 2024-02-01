// import React, { FC, useContext } from 'react';
// import { Button, Form, Input, message } from 'antd';
// import { Api, Types } from 'modules/auth';
// import { session } from 'services';
// import { Link } from 'react-router-dom';
// import { MainContext } from 'main';

// const Login: FC = () => {
//   const { login } = useContext(MainContext);

//   const onFinish = async (values: Types.IForm.Login) => {
//     try {
//       const { data: loginResponse } = await Api.Login(values);
//       const token = loginResponse.data;

//       session.add(token);

//       const { data: meResponse } = await Api.Me({ token });
//       const user = meResponse.data;

//       login(user);

//       message.success(`👋🏻 Welcome ${user.firstName}!`);
//     } catch (error) {
//       console.error('Login failed:', error);

//       message.error('Login failed. Please check your credentials and try again.');
//     }
//   };

//   return (
//     <div className="container mx-auto flex flex-col items-center pt-10">
//       <h1>Login Form</h1>
//       <Form autoComplete="off" onFinish={onFinish} className="flex w-[500px] flex-col gap-2">
//         <Form.Item
//           rules={[
//             {
//               required: true,
//               message: 'Enter your email address',
//               whitespace: true
//             }
//           ]}
//           hasFeedback
//           name="email"
//         >
//           <Input size="large" placeholder="Email" />
//         </Form.Item>
//         <Form.Item
//           rules={[
//             {
//               required: true,
//               message: 'Enter password',
//               whitespace: true
//             },
//             {
//               min: 8,
//               message: 'Please enter your password'
//             }
//           ]}
//           hasFeedback
//           name="password"
//         >
//           <Input.Password size="large" placeholder="Password" />
//         </Form.Item>
//         <Form.Item>
//           <Button block size="large" type="primary" htmlType="submit" className="uppercase">
//             Login
//           </Button>
//         </Form.Item>
//         <Link to="/auth/register" className="w-max self-end">
//           Go to Register
//         </Link>
//       </Form>
//     </div>
//   );
// };

// export default Login;

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

      message.success(`👋🏻 Welcome ${user.name}!`);
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
