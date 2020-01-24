import * as React from 'react';
import { useEffect } from 'react';
import store from '../../store/store';
import { Todo } from '../model/state/initialTodoListState';
import removeTodo from '../model/actions/removeTodo';
import fetchTodos from '../model/actions/fetchTodos';
import todoListController from '../controller/todoListController';
import toggleIsDoneTodo from '../model/actions/toggleIsDoneTodo';
import toggleShouldShowOnlyUnDoneTodos from '../model/actions/toggleShouldShowOnlyUnDoneTodos';

const TodoListView = () => {
  const { todosState } = store.getState();
  store.useState([todosState]);
  const { shownTodos } = store.getSelectors();
  store.useSelectors([shownTodos]);

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    fetchTodos();
    document.addEventListener('keypress', todoListController.handleKeyPress);
    return () => document.removeEventListener('keypress', todoListController.handleKeyPress);
  }, []);

  let todoListContent;

  if (todosState.isFetchingTodos) {
    todoListContent = <div>Fetching todos...</div>;
  } else if (todosState.hasTodosFetchFailure) {
    todoListContent = <div>Failed to fetch todos</div>;
  } else {
    const todoListItems = shownTodos.value.map((todo: Todo, index: number) => (
      <li key={todo.id}>
        <input
          id={todo.name}
          type="checkbox"
          defaultChecked={todo.isDone}
          onChange={() => toggleIsDoneTodo(todo)}
        />
        <label>{todo.name}</label>
        <button onClick={() => removeTodo(todo)}>Remove</button>
      </li>
    ));

    todoListContent = <ul>{todoListItems}</ul>;
  }

  return (
    <div>
      <input
        id="shouldShowOnlyDoneTodos"
        type="checkbox"
        defaultChecked={todosState.shouldShowOnlyUnDoneTodos}
        onChange={toggleShouldShowOnlyUnDoneTodos}
      />
      <label>Show only undone todos</label>
      {todoListContent}
    </div>
  );
};

export default TodoListView;
