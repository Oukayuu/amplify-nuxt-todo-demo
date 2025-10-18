export interface ITodo {
  id: string;
  title: string;
  description: string;
  level: Level;
  pin: boolean;
  done: boolean;
  archive: boolean;
}

export interface ICreateTodo {
  title: string;
  description: string;
  level: Level;
}

export interface IUpdateTodo {
  id: string;
  title: string;
  description: string;
}

export interface IDeleteTodo {
  id: string;
}

export interface IDoneToggleTodo {
  id: string;
  done: boolean;
}

export interface IArchiveTodo {
  id: string;
}

export  interface IRestoreTodo {
  id: string;
}
  