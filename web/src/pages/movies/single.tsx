import React, { Component } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Button, Form, Input, message, Select, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { Api, Mappers } from 'modules/movies';
import { IForm } from 'modules/movies/types';

interface SingleState {
  options: DefaultOptionType[];
  values: IForm.Movie.Add;
  movieId: string;
}

interface SingleProps {
  navigate: NavigateFunction;
}

export default class Single extends Component<SingleProps, SingleState> {
  constructor(props: SingleProps) {
    super(props);
    const movieId = window.location.pathname.split('/movies/')[1];

    this.state = { options: [], values: {} as any, movieId };
  }

  handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const { values, movieId } = this.state;

    const token = localStorage.getItem('token') || '';

    const isUpdate = movieId !== 'new';

    try {
      if (isUpdate) await Api.Movie.Update({ ...values, movieId, token });
      else await Api.Movie.Add({ ...values, token });

      message.success(`Movie ${isUpdate ? 'update' : 'added'} successfully 🎉`);
      this.props.navigate('/movies');
    } catch (err) {
      if (err instanceof AxiosError) {
        message.error(err.response?.data);
      }
    }
  };

  handleChange = <TKey extends keyof IForm.Movie.Add>(key: TKey, value: IForm.Movie.Add[TKey]) => {
    this.setState(({ values }) => ({ values: { ...values, [key]: value } }));
  };

  async componentDidMount() {
    try {
      const { data } = await Api.Genre.List();
      const genres = (data || []).map(Mappers.Genre);
      const options: DefaultOptionType[] = genres.map((item: { name: any; id: any }) => ({
        label: item.name,
        value: item.id
      }));

      const { movieId } = this.state;

      if (movieId !== 'new') {
        console.log(movieId);

        const movieResponse = await Api.Movie.Single({ movieId });
        const movie = Mappers.Movie(movieResponse.data);
        this.setState({
          options,
          values: {
            genreId: movie.genre.id,
            title: movie.title,
            stock: movie.stock,
            rate: movie.rate
          }
        });
      } else this.setState({ options });
    } catch (err: any) {}
  }

  render() {
    const { values, options, movieId } = this.state;
    const isUpdate = movieId !== 'new';
    return (
      <div className=" container mx-auto flex flex-col items-center pt-24">
        <Form onFinish={this.handleSubmit} className="flex w-[500px] flex-col gap-2">
          <Typography className="text-center text-3xl text-blue-700">{isUpdate ? 'Update' : 'Add'} Movie</Typography>
          <Form.Item>
            <Input
              value={values.title}
              onChange={e => this.handleChange('title', e.target.value)}
              placeholder="Title"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Select
              value={values.genreId}
              onChange={genreId => this.handleChange('genreId', genreId)}
              placeholder="Select genre"
              size="large"
              options={options}
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={values.stock}
              onChange={e => this.handleChange('stock', e.target.valueAsNumber)}
              type="number"
              placeholder="Number in stock"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={values.rate}
              onChange={e => this.handleChange('rate', e.target.valueAsNumber)}
              type="number"
              placeholder="Daily rental rate"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit" size="large">
              {isUpdate ? 'Save' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
