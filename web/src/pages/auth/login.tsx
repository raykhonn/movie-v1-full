import { Button, Input, InputRef, message, Typography } from 'antd';
import { Api, Mappers } from 'modules/auth';
import React, { Component } from 'react';

export default class Login extends Component {
  emailRef = React.createRef<InputRef>();
  passwordRef = React.createRef<InputRef>();

  handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const email = this.emailRef.current?.input?.value!;
    const password = this.passwordRef.current?.input?.value!;

    try {
      const loginRes = await Api.Login({ email, password });
      const token = loginRes.data.data;

      localStorage.setItem('token', token);

      const meRes = await Api.Me({ token });
      const user = Mappers.User(meRes.data);

      message.success(`Successfully Logged in. Hi ${user.name} 🎉`);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="container mx-auto flex flex-col items-center  pt-28">
        <form onSubmit={this.handleSubmit} className="flex w-[600px] flex-col gap-2">
          <Typography className="text-center text-3xl">Login Form</Typography>
          <Input autoFocus ref={this.emailRef} type="email" placeholder="Enter your email.." size="large" />
          <Input.Password ref={this.passwordRef} placeholder="Enter your password.." size="large" />
          <Button type="primary" htmlType="submit" size="large">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
