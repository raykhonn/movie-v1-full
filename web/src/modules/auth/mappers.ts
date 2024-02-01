import { IEntity } from './types';
import get from 'lodash/get';

export const User = (item?: any): IEntity.User => ({
  id: get(item, '_id') || '',
  name: get(item, '_name') || '',
  email: get(item, '_email') || ''
});
