import { IEntity } from './types';

export const User = (item?: any): IEntity.User => ({
  id: item?._id || '',
  name: item?.name || '',
  email: item?.email || ''
});
