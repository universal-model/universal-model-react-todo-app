import addTodo from '@/todolist/model/actions/addTodo';
import removeAllTodos from '@/todolist/model/actions/removeAllTodos';

export default {
  handleKeyPress(keyboardEvent: KeyboardEvent): void {
    console.log(keyboardEvent);
    if (keyboardEvent.code === 'KeyA' && keyboardEvent.ctrlKey) {
      keyboardEvent.stopPropagation();
      keyboardEvent.preventDefault();
      addTodo();
    } else if (keyboardEvent.code === 'KeyR' && keyboardEvent.ctrlKey) {
      keyboardEvent.stopPropagation();
      keyboardEvent.preventDefault();
      removeAllTodos();
    }
  }
};
