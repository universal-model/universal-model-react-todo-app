import { State } from '../../../store/store';
import { Todo } from './initialTodoListState';

const createTodoListStateSelectors = <T extends State>() => ({
  shownTodos: (state: T) =>
    state.todosState.todos.filter(
      (todo: Todo) =>
        (state.todosState.shouldShowOnlyUnDoneTodos && !todo.isDone) ||
        !state.todosState.shouldShowOnlyUnDoneTodos
    )
});

export default createTodoListStateSelectors;
