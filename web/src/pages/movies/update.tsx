import React, { Component } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { AxiosError } from 'axios';
import { Button, Input, message, Select, Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { Api, Mappers } from 'modules/movies';
import { IForm } from 'modules/movies/types';

interface AddState {
  options: DefaultOptionType[];
  values: IForm.Movie.Update;
}

interface AddProps {
  navigate: NavigateFunction;
}

export default class Update extends Component<AddProps, AddState> {
  state: AddState = { options: [], values: { genreId: '', movieId: '', title: '', stock: 0, rate: 0 } };

  handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const { values } = this.state;

    console.log(values);

    const token = localStorage.getItem('token') || '';

    try {
      const { data } = await Api.Movie.Update({ ...values, token });
      const movie = Mappers.Movie(data);
      message.success('Movie update successfully 🎉');
      console.log('movie = ', movie);
      this.props.navigate('/movies');
    } catch (err) {
      if (err instanceof AxiosError) {
        message.error(err.response?.data);
      }
    }
  };

  async componentDidMount() {
    try {
      const genresResponse = await Api.Genre.List();
      const genres = (genresResponse.data || []).map(Mappers.Genre);
      const options: DefaultOptionType[] = genres.map(item => ({ label: item.name, value: item.id }));

      const movieId = window.location.pathname.split('/movies/')[1];
      const movieResponse = await Api.Movie.Single({ movieId });
      const movie = Mappers.Movie(movieResponse.data);

      this.setState({
        options,
        values: {
          movieId,
          genreId: movie.genre.id,
          title: movie.title,
          stock: movie.stock,
          rate: movie.rate
        }
      });
    } catch (err: any) {}
  }

  render() {
    const { options, values } = this.state;
    return (
      <div className="container mx-auto flex flex-col items-center  pt-28">
        <form onSubmit={this.handleSubmit}>
          <Typography className="text-center text-3xl">Update Movie</Typography>
          <Input
            value={values.title || undefined}
            placeholder="Title.."
            size="large"
            onChange={e => this.setState(({ values }) => ({ values: { ...values, title: e.target.value } }))}
          />
          <Select
            value={values.genreId || undefined}
            placeholder="Select genre.."
            size="large"
            options={options}
            onChange={genreId => this.setState(({ values }) => ({ values: { ...values, genreId: genreId! } }))}
          />
          <Input
            value={values.stock || undefined}
            type="number"
            placeholder="Number in stock.."
            size="large"
            onChange={e => this.setState(({ values }) => ({ values: { ...values, stock: +e.target.value } }))}
          />
          <Input
            value={values.rate || undefined}
            type="number"
            placeholder="Daily rental rate.."
            size="large"
            onChange={e => this.setState(({ values }) => ({ values: { ...values, rate: +e.target.value } }))}
          />
          <Button type="primary" htmlType="submit" size="large">
            Save
          </Button>
        </form>
      </div>
    );
  }
}
