import { config } from 'config';

export const session = {
  add: (token: string) => localStorage.set(config.api.tokenKEY, token),
  remove: () => localStorage.remove(config.api.tokenKEY),
  get: () => localStorage.get(config.api.tokenKEY)
};
