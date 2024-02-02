import { config } from 'config';
import store from 'store2';

export const session = {
  add: (token: string) => store.set(config.api.tokenKEY, token),
  remove: () => store.remove(config.api.tokenKEY),
  get: () => store.get(config.api.tokenKEY)
};
