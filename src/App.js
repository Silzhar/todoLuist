import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import db from './db';

import './App.scss';
import Navbar from './components/Navbar';
import TodoLuist from './components/TodoLuist';

class App extends React.Component {
  state = {
    todos: [],
    completed: [],
    urgent: [],
  };

  // Conectar a DB.
  async componentDidMount() {
    const { todos, completed } = await db.getState();
    this.setState({ todos, completed });
  }

  // Añadir.
  handleAddTodo = (todo) => {
    const todosDB = db.get('todos').push(todo).write();

    this.setState ({
      todos: todosDB,
    });
  };

  // Eliminar.
  handleRemoveTodo = (id) => {
    db.get('todos').remove({ id }).write();
    const todosDB = db.get('todos').value();
    
    this.setState({
      todos: todosDB,
    });

  };

  // Listado.
  handleAddCompleted = (todo) => {
    const newCompletDB = db.get('completed').push(todo).write();
    
    this.setState({
      completed: newCompletDB,
    });

  };

  handleCompleteTodo = (id) => {
    const todo = this.state.todos.find((elem) => elem.id === id);

      this.handleRemoveTodo(id);
      this.handleAddCompleted(todo);
    };

  handleUrgentTodo = (id) => {
    const urgent = this.state.urgent.find((elem) => elem.id === id);

      this.handleRemoveTodo(id);
      this.handleAddCompleted(urgent);
    };
  
  // Editar tarjeta.
  handleChangeTodo = (id, name, value) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return { 
            ...todo, [name]: value,
          };
        } else {
          return todo;
        }
      }),
    }));
  };
  
  // Guardar los 'todos' del state en la DB
  // para mandar a input de edición.
  handleSaveTodos = () => { };
  

  render() {
    return (
      <Router>
      <div className="App">
        <Navbar />
        
        <Switch>
          <Route path="/complet" exact render={() => (
              <TodoLuist todos={this.state.completed}                 
                title="Tareas completadas"
              />
            )}
          />

          <Route path="/urgent" exact render={() => (
              <TodoLuist title="Tareas urgentes"
                todos={this.state.urgent} 
                onCompleteCard={this.handleUrgentTodo}
                onAddCard={this.handleAddTodo}
              />
            )}
          />

          <Route path="/" exact render={() => (
              <TodoLuist title="Tareas pendientes"
                todos={this.state.todos} 
                onCompleteCard={this.handleCompleteTodo}
                onAddCard={this.handleAddTodo}
                onEditTodo={this.handleChangeTodo}
              />
            )}
          />

        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
