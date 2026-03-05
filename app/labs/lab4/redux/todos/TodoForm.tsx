"use client";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center">
      <FormControl defaultValue={todo.title} className="me-2"
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
      <Button onClick={() => dispatch(updateTodo(todo))} id="wd-update-todo-click" className="btn-warning me-2">Update</Button>
      <Button onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click" className="btn-success">Add</Button>
    </ListGroupItem>
);}