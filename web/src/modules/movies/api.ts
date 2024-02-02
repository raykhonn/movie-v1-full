import { http } from 'services';
import { IApi } from './types';

export const Movie = {
  List: () => http.get<IApi.Movie.List.Response>('/movies'),

  Single: ({ movieId }: IApi.Movie.Single.Request) => http.get<IApi.Movie.Single.Response>(`/movies/${movieId}`),

  Add: ({ title, genreId, stock: numberInStock, rate: dailyRentalRate, token }: IApi.Movie.Add.Request) =>
    http.post<IApi.Movie.Add.Response>(
      '/movies',
      { title, genreId, numberInStock, dailyRentalRate },
      { headers: { 'x-auth-token': token } }
    ),

  // Delete: ({ token }: IApi.Movie.Add.Request) =>
  //   http.post<IApi.Movie.Add.Response>(
  //     '/movies',
  //     { headers: { 'x-auth-token': token } }
  //   ),

  Delete: ({ id}: IApi.Movie.Delete.Request) =>
    http.delete<IApi.Movie.Delete.Response>('/movies'),

  Update: ({
    movieId,
    title,
    genreId,
    stock: numberInStock,
    rate: dailyRentalRate,
    token
  }: IApi.Movie.Update.Request) =>
    http.put<IApi.Movie.Update.Response>(
      `/movies/${movieId}`,
      { title, genreId, numberInStock, dailyRentalRate },
      { headers: { 'x-auth-token': token } }
    )
};

export const Genre = {
  List: () => http.get<IApi.Genre.List.Response>('/genres'),
  Single: ({ genreId }: IApi.Genre.Single.Request) => http.get<IApi.Genre.Single.Response>(`/genres/${genreId}`),
  Add: ({ name, token }: IApi.Genre.Add.Request) =>
    http.post<IApi.Genre.Add.Response>('/genres', { name }, { headers: { 'x-auth-token': token } })
};
