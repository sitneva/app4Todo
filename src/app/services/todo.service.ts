import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Todo} from '../interfaces/todo';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TodoService {
  constructor(private _http: Http ) {

  }

  getTodos() {
    return this._http.get('http://localhost:3000/Todos')
      .map (res => res.json());
  }

  saveTodo(todo: Todo) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post('http://localhost:3000/Todos', JSON.stringify(todo), options)
    .map(res => res.json());
  }

  updateTodo(todo) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.put('http://localhost:3000/Todos/' + todo.id, JSON.stringify(todo), options)
      .map(res => res.json());
  }

}
