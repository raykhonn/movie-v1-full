// import React from 'react';
// import { Button, Form, Input, message } from 'antd';
// import { Api, Types } from 'modules/auth';
// import { AxiosError } from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const Register: React.FC = () => {
//   const navigate = useNavigate();

//   const onFinish = async (values: Types.IForm.Register) => {
//     try {
//       const { data } = await Api.Register(values);
//       message.success(`Successfully registered. Hi ${data.data.firstName}`);
//       navigate('/auth/login');
//     } catch (err) {
//       if (err instanceof AxiosError) {
//         message.error(err.response?.data?.message);
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto flex flex-col items-center pt-10">
//       <h1>Register Form</h1>
//       <Form autoComplete="off" onFinish={onFinish} className="flex w-[500px] flex-col gap-2">
//         <Form.Item
//           rules={[
//             {
//               required: true,
//               message: 'Enter your full name',
//               min: 3,
//               whitespace: true
//             }
//           ]}
//           hasFeedback
//           name="fullName"
//         >
//           <Input size="large" placeholder="Full name" />
//         </Form.Item>
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
//               message: 'Enter your password',
//               min: 8,
//               whitespace: true
//             }
//           ]}
//           hasFeedback
//           name="password"
//         >
//           <Input.Password size="large" placeholder="Password" />
//         </Form.Item>
//         <Form.Item>
//           <Button block size="large" type="primary" htmlType="submit" className="uppercase">
//             Register
//           </Button>
//         </Form.Item>
//         <Link to="/auth/login" className="w-max self-end">
//           Go to Login
//         </Link>
//       </Form>
//     </div>
//   );
// };

// export default Register;

import { Button, Form, Input, message } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { Api, Types } from 'modules/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values: Types.IForm.Register) => {
    try {
      const loginRes = await Api.Register(values);
      navigate('/auth/login');

      message.success(`Successfully registered in. Hi ${loginRes.data.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center pt-20">
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
          <Input id="name" placeholder=" Name" size="large" />
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
              min: 6
            }
          ]}
          hasFeedback
          name="password"
        >
          <Input.Password id="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item>
          <Button className="uppercase" block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Link className="w-max self-end" to="/auth/login ">
          go to login
        </Link>
      </Form>
    </div>
  );
};
export default Register;
