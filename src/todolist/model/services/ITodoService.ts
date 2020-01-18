import { Todo } from '../state/initialTodoListState';

export interface ITodoService {
  fetchTodos(): Promise<Todo[]>;
}
