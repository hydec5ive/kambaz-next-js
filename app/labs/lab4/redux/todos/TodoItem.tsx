"use client";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";
export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id} className="d-flex justify-content-between align-items-center">
      <span>{todo.title}</span>
      <div>
        <Button onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click" className="btn-primary me-2">Edit</Button>
        <Button onClick={() => dispatch(deleteTodo(todo.id))} id="wd-delete-todo-click" className="btn-danger">Delete</Button>
      </div>
    </ListGroupItem>
);}