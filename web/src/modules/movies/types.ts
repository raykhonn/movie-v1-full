export namespace IEntity {
  export interface Genre {
    id: string;
    name: string;
  }

  export interface Movie {
    id: string;
    title: string;
    owner: string;
    genre: IEntity.Genre;
    stock: number;
    rate: number;
    like?: string;
  }
}

export namespace IForm {
  export namespace Movie {
    export interface Add extends Pick<IEntity.Movie, 'title' | 'stock' | 'rate'> {
      genreId: string;
    }

    export interface Update extends Add {
      movieId: string;
    }
  }

  export namespace Genre {
    export interface Add extends Pick<IEntity.Genre, 'name'> {}
  }
}

export namespace IApi {
  export namespace Movie {
    export namespace List {
      export interface Response extends Array<IEntity.Movie> {}
    }
    
    export namespace Single {
      export interface Request {
        movieId: string;
      }
      export interface Response extends IEntity.Movie {}
    }

    export namespace Add {
      export interface Request extends IForm.Movie.Add {
        token: string;
      }
      export interface Response extends IEntity.Movie {}
    }
    export namespace Delete {
      export interface Request  {
        id: string;
      }
      export interface Response  {}
    }

    export namespace Update {
      export interface Request extends IForm.Movie.Update {
        token: string;
      }
      export interface Response extends IEntity.Movie {}
    }
  }

  export namespace Genre {
    export namespace List {
      export interface Response extends Array<IEntity.Genre> {}
    }

    export namespace Single {
      export interface Request {
        genreId: string;
      }
      export interface Response extends IEntity.Genre {}
    }

    export namespace Add {
      export interface Request extends IForm.Genre.Add {
        token: string;
      }

      export interface Response extends IEntity.Genre {}
    }
  }
}
