import ListGroup from "react-bootstrap/esm/ListGroup";
import TodoItem from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
  return (
    <div id="wd-todo-list">
      <h3>Todo List</h3>
      <ListGroup>
        {todos.map((todo) => (
          <TodoItem key={todo.title} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );}