import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../components/todo-list/todo';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ToDoService {
  host: string = "";
  globalLoader= {isLoading: true};

  constructor(private _http: HttpClient) {
  }

  private todos = new BehaviorSubject<any>([]);
  castTodos = this.todos.asObservable();

  getAll() {
    let _url = this.host + "/todos";
    return this._http.get(_url)
  }

  add(newTodo) {
    let _url = this.host + "/addTodo";

    return this._http.post(_url, newTodo);
  }

  update(todo) {
    let todoCopy = Object.assign({}, todo);
    let _url = this.host + "/updateTodo/" + todo._id;
    delete todoCopy._id;
    
    return this._http.put(_url, todoCopy)
  }

  remove(todoId) {
    let _url = this.host + "/removeTodo/" + todoId;
    
    return this._http.delete(_url);
  }

  updateTodoList() {
    this.globalLoader.isLoading = true;    
    this.getAll().subscribe((result) => {
      console.log(result)
      this.todos.next(result);
      this.globalLoader.isLoading = false;          
    }); 
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
