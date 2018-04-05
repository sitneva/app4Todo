import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Todo} from '../interfaces/todo';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TodoService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http ) {

  }

  getTodos() {
    return this._http.get('http://localhost:3000/Todos')
      .map (res => res.json());
  }

  saveTodo(todo: Todo) {
    return this._http.post('http://localhost:3000/Todos/', JSON.stringify(todo), this.options)
    .map(res => res.json());
  }

  updateTodo(todo) {
    return this._http.put('http://localhost:3000/Todos/' + todo.id, JSON.stringify(todo), this.options)
      .map(res => res.json());
  }

  deleteTodo(id) {
    return this._http.delete('http://localhost:3000/Todos/' + id)
      .map(res => res.json());
  }

}
