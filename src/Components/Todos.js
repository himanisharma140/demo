import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { BsFillCalendar2RangeFill } from "react-icons/bs";


const Todos = ({ todos}) => {
  return (
    <ListGroup className="mt-5 mb-2 items">
      {todos.map(todo => (
        <ListGroupItem key={todo.id} style={{background: todo.isComplete ? 'green' : 'white'}}>
          {todo.data}
          <span>
          <BsFillCalendar2RangeFill/> &nbsp;
          {todo.edate}
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>

    
  );
};

export default Todos;
