import * as React from 'react';
import { useEffect, useMemo } from 'react';
import store from '../store/store';
import { Todo } from './model/state/initialTodoListState';
import removeTodo from './model/actions/removeTodo';
import toggleShouldShowOnlyDoneTodos from './model/actions/toggleShouldShowOnlyDoneTodos';
import fetchTodos from './model/actions/fetchTodos';
import todoListController from './controller/todoListController';
import toggleIsDoneTodo from './model/actions/toggleIsDoneTodo';

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

  const todoItems = useMemo(
    () =>
      shownTodos.value.map((todo: Todo, index: number) => (
        <li key={index}>
          <input
            id={todo.name}
            type="checkbox"
            defaultChecked={todo.isDone}
            onChange={() => toggleIsDoneTodo(todo)}
          />
          <label>{todo.name}</label>
          <button onClick={() => removeTodo(todo)}>Remove</button>
        </li>
      )),
    [shownTodos.value]
  );

  return (
    <div>
      <input
        id="shouldShowOnlyDoneTodos"
        type="checkbox"
        defaultChecked={todosState.shouldShowOnlyDoneTodos}
        onChange={toggleShouldShowOnlyDoneTodos}
      />
      <label>Show only done todos</label>
      <ul>{todoItems}</ul>
    </div>
  );
};

export default TodoListView;
