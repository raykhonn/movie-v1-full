import React from 'react';
import { IContext } from './types';

export const AuthContext = React.createContext<IContext>({} as IContext);
