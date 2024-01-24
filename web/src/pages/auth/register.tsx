import { Button, Input, message } from 'antd';
import Typography from 'antd/es/typography/Typography';
import { Api } from 'modules/auth';
import React, { Component } from 'react';

export default class Register extends Component {
  handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const name = document.querySelector<HTMLInputElement>('#name')?.value!;
    const email = document.querySelector<HTMLInputElement>('#email')?.value!;
    const password = document.querySelector<HTMLInputElement>('#password')?.value!;

    try {
      await Api.Register({ name, email, password });
      message.success('Successfully registered 😃');
    } catch (err) {}
  };

  render() {
    return (
      <div className="container mx-auto flex flex-col items-center  pt-28">
        <form onSubmit={this.handleSubmit} className="flex w-[600px] flex-col gap-2">
          <Typography className="text-center text-3xl">Registration Form</Typography>
          <Input id="name" placeholder="Enter your full name.." size="large" />
          <Input id="email" type="email" placeholder="Enter your email.." size="large" />
          <Input.Password id="password" placeholder="Enter your password.." size="large" />
          <Button type="primary" htmlType="submit" size="large">
            Register
          </Button>
        </form>
      </div>
    );
  }
}
