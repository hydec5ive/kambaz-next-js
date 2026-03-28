"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      {/* 5.2.4.1 - Retrieving Arrays */}
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary me-2" href={API}>
        Get Todos
      </a>
      <a id="wd-retrieve-completed-todos" className="btn btn-primary"
        href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <hr />

      {/* 5.2.4.2 - Retrieving by ID */}
      <h4>Retrieving an Item from an Array by ID</h4>
      <a id="wd-retrieve-todo-by-id" className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <FormControl id="wd-todo-id" className="w-50" defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <hr />

      {/* 5.2.4.4 - Creating */}
      <h4>Creating new Items in an Array</h4>
      <a id="wd-create-todo" className="btn btn-primary" href={`${API}/create`}>
        Create Todo
      </a>
      <hr />

      {/* 5.2.4.5 - Deleting */}
      <h4>Deleting from an Array</h4>
      <a id="wd-delete-todo" className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>
      <FormControl id="wd-todo-id-delete" className="w-50" defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <hr />

      {/* 5.2.4.6 - Updating Title */}
      <h4>Updating an Item in an Array</h4>
      <a id="wd-update-todo-title" className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${todo.title}`}>
        Update Todo Title
      </a>
      <FormControl id="wd-todo-id-update" className="w-25 float-start me-2" defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <FormControl id="wd-todo-title" className="w-50 float-start" defaultValue={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
      <br /><br />
      <hr />

      {/* 5.2.4.7 - Updating Completed */}
      <h4>Updating Completed Status</h4>
      <a id="wd-update-todo-completed" className="btn btn-primary float-end"
        href={`${API}/${todo.id}/completed/${todo.completed}`}>
        Update Completed
      </a>
      <input type="checkbox" className="form-check-input" id="wd-todo-completed"
        defaultChecked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} />
      <hr />

      {/* 5.2.4.7 - Updating Description */}
      <h4>Updating Description</h4>
      <a id="wd-update-todo-description" className="btn btn-primary float-end"
        href={`${API}/${todo.id}/description/${todo.description}`}>
        Update Description
      </a>
      <FormControl id="wd-todo-description" className="w-50" defaultValue={todo.description}
        onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
      <hr />
    </div>
  );
}