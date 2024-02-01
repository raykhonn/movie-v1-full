import React, { Component } from 'react';
import { Spin } from 'antd';
import { Api } from 'modules/auth';
import { IEntity } from 'modules/auth/types';
import Routes from 'routes';
import { session } from 'services';

interface IContext {
  user: IEntity.User | null;
  logout(): void;
  login(user: IEntity.User): void;
}

export const MainContext = React.createContext<IContext>({} as IContext);

interface IMainState {
  loading: boolean;
  user: IEntity.User | null;
}

class Main extends Component<{}, IMainState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      loading: !!session.get(),
      user: null
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    const { loading } = this.state;

    if (!loading) return;

    const token = session.get();
    Api.Me({ token }).then(({ data }) => {
      const user = data.data;
      this.login(user);
      this.setState({ loading: false });
    });
  };

  logout = () => {
    session.remove();
    this.setState({ user: null });
  };

  login = (user: IEntity.User) => {
    this.setState({ user });
  };

  render() {
    const { loading, user } = this.state;

    if (loading) {
      return (
        <div className="grid h-screen w-screen place-items-center">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <MainContext.Provider value={{ user, login: this.login, logout: this.logout }}>
        <Routes />
      </MainContext.Provider>
    );
  }
}

export default Main;
