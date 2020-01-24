import { Todo } from '../state/initialTodoListState';

export interface ITodoService {
  tryFetchTodos(): Promise<Todo[]>;
}
