import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../interfaces/todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  constructor( private _todoService: TodoService) { }

  ngOnInit() {
    this.getTodo();
  }

  getTodo() {
    this.todos = [];
    this._todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  addTodo(todoText) {
    let result;
    let newTodo = {
      text: todoText.value,
      isCompleted: false
    };

    result = this._todoService.saveTodo(newTodo);
    result.subscribe(data => {
      this.todos.push(data);
      todoText.value = '';
      //this.getTodo();
    });
  }

  setEditState(todo, state) {
    if (state) {
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateStatus(todo) {
    let _todo = {
      id: todo.id,
      text: todo.text,
      isCompleted: !todo.isCompleted
    };
    this._todoService.updateTodo(_todo)
      .subscribe(data => {
        todo.isCompleted = !todo.isCompleted;
      });
  }

  updateTodoText(event, todo) {
    if (event.which === 13) {
      todo.text = event.target.value;
      let _todo = {
        id: todo.id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };

      this._todoService.updateTodo(_todo)
        .subscribe(data => {
          this.setEditState(todo, false);
        });
    }
  }

  deleteTodo(todo) {
    let todos = this.todos;
    console.log(todo);
    this._todoService.deleteTodo(todo.id)
      .subscribe(data => {
          for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === todo.id) {
              todos.splice(i, 1);
            }
          }
      });
  }

}
