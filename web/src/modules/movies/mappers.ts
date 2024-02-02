import get from 'lodash/get';
import { IEntity } from './types';

export const Genre = (item?: any): IEntity.Genre => ({
  id: item?._id || '',
  name: item?.name || ''
});
 
export const Movie = (item?: any): IEntity.Movie => ({
  id: get(item, '_id') || '',
  title: get(item, 'title') || '',
  owner: get(item, 'username') || '',
  genre: Genre(get(item, 'genre')) || '',
  rate: get(item, 'dailyRentalRate') || 0,
  stock: get(item, 'numberInStock') || 0
});
