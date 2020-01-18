import { Todo } from '../state/initialTodoListState';

export default function toggleIsDoneTodo(todo: Todo): void {
  todo.isDone = !todo.isDone;
}
