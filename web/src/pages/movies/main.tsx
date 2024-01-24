import { Component } from 'react';
import { AxiosError } from 'axios';
import { Tab } from 'rc-tabs/lib/interface';
import { Button, Input, Spin, Table, Tabs, Tag, message } from 'antd';

import { IEntity } from 'modules/movies/types';
import { Api, Mappers } from 'modules/movies';
import { Link } from 'react-router-dom';

interface MainState {
  isLoading: boolean;
  genres: IEntity.Genre[];
  movies: IEntity.Movie[];
  genreId: string;
  pageSize: number;
  search: string;
}

export default class Main extends Component<{}, MainState> {
  state: MainState = {
    isLoading: true,
    genres: [],
    movies: [],
    genreId: 'all',
    pageSize: 3,
    search: ''
  };

  async componentDidMount() {
    try {
      const genreResponse = await Api.Genre.List();
      const genres = (genreResponse.data || []).map(Mappers.Genre);

      genres.unshift({ id: 'all', name: 'All Genres' });

      const movieResponse = await Api.Movie.List();
      const movies = (movieResponse.data || []).map(Mappers.Movie);

      this.setState({ genres, movies, isLoading: false });
    } catch (err) {
      if (err instanceof AxiosError) {
        message.error(err.response?.data);
      }
    }
  }

  render() {
    const { genres, movies, genreId, isLoading, pageSize, search } = this.state;

    if (isLoading) return <Spin />;

    const filteredMovies = genreId === 'all' ? movies : movies.filter(m => m.genre.id === genreId);
    const searchedMovies = filteredMovies.filter(
      m =>
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.genre.name.toLowerCase().includes(search.toLowerCase()) ||
        m.owner.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="container relative mx-auto pt-2">
        <Tabs
          animated
          activeKey={genreId}
          onChange={key => this.setState({ genreId: key, search: '' })}
          size="large"
          items={genres.map<Tab>(item => ({
            key: item.id,
            label: item.name,
            children: (
              <Table
                rowKey="id"
                loading={isLoading}
                dataSource={searchedMovies}
                bordered
                columns={[
                  {
                    title: 'Title',
                    dataIndex: 'title',
                    render: (title, movie) => <Link to={movie.id}>{title}</Link>,
                    sorter: (a, b) => a.title.localeCompare(b.title)
                  },
                  {
                    title: 'Genre',
                    dataIndex: 'genre',
                    render: (genre: IEntity.Genre) => <Tag color="gold">{genre?.name}</Tag>
                  },
                  {
                    title: 'Owner',
                    dataIndex: 'owner'
                  },
                  {
                    title: 'Stock',
                    dataIndex: 'stock',
                    sorter: (a, b) => a.stock - b.stock
                  },
                  {
                    title: 'Rate',
                    dataIndex: 'rate',
                    sorter: (a, b) => a.rate - b.rate
                  },
                  {
                    title: 'Actions',
                    width: 100,
                    render: () => (
                      <div className="flex gap-2">
                        <Button type="primary" danger>
                          Delete
                        </Button>
                      </div>
                    )
                  }
                ]}
                pagination={pageSize < filteredMovies.length && { pageSize }}
              />
            )
          }))}
        />
        <Input
          value={search}
          onChange={e => this.setState({ search: e.target.value })}
          allowClear
          placeholder="Search"
          className="absolute right-0 top-5 w-[400px]"
        />
      </div>
    );
  }
}
