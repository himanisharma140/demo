import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import { FormGroup, Input, InputGroup,Button, Form} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 } from "uuid";
import Todos from "./Todos";

toast.configure()
const TodoForm = () => {
  const [todoString, setTodoString] = useState("");
  const [duedate, setDuedate] = useState("");
  const [todos, setTodos] = useState([]);
  const isComplete = "false";

  

  const showToast = (todo) => {
    toast.error('Due date of this task is expired: ' + todo.data ,{autoClose:10000})
    todo.isComplete = true;
    setTodos([...todos,todo]);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  
 useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      setTodos(JSON.parse(localTodos));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = e => {
    e.preventDefault();
    if (todoString === "") {
      return alert("Please enter the Todo");
    }
    if (duedate === "") {
        return alert("Please enter the Due date");
    }

    const todo = {
      data: todoString,
      edate: duedate,
      isComplete: false,
      id: v4()
    };

    setTodos([...todos,todo]);
    setTodoString("");
    setDuedate("");
    
    var splittime = todo.edate.split(":");
    var expirationtime = splittime[0]*3600+splittime[1]*60+splittime[2]*1;
    var today = new Date()
    var time = today.getHours()*3600+today.getMinutes()*60+today.getSeconds();

    const timeout = setTimeout(() => showToast(todo), Math.abs(expirationtime-time)*1000);
      return () => { 
        clearTimeout(timeout) 
      };
    };
  

  
return (
  <div>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <InputGroup>
          <Input type="text" name="todoString" id="todoString" placeholder="Enter a todo string" value={todoString} onChange={e => setTodoString(e.target.value)}/>
          <Input type="time" step="1" name="duedate" id="duedate" placeholder="HH:MM:SS" value={duedate} onChange={e => setDuedate(e.target.value)}/>
          <Button color="success">Add Todo</Button>
         </InputGroup>
      </FormGroup>
    </Form>
    <Todos todos={todos}/>
    </div>
  );
};

export default TodoForm;
