export namespace IEntity {
  export interface User {
    id: string;
    name: string;
    email: string;
  }
}

export namespace IForm {
  export interface Login {
    email: string;
    password: string;
  }
  export interface Register {
    name: string;
    email: string;
    password: string;
  }
}

export namespace IApi {
  export namespace Login {
    export interface Request extends IForm.Login {}
    export interface Response {
      data: string;
    }
  }

  export namespace Register {
    export interface Request extends IForm.Register {}
    export interface Response extends IEntity.User {
      data: any;
    }
  }

  export namespace Me {
    export interface Request {
      token: string;
    }
    export interface Response extends IEntity.User {
      [x: string]: any;
    }
  }
}
export interface IContext {
  user: IEntity.User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  methods: {
    login(user: IEntity.User): void;
    logout(): void;
  };
}
