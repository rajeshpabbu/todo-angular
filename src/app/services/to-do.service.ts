import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../components/todo-list/todo';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ToDoService {
  host: string = "";
  public globalLoader = true;

  constructor(private _http: HttpClient) {
  }

  private todos = new BehaviorSubject<any>([]);
  castTodos = this.todos.asObservable();

  getAll(): Observable<Todo[]> {
    console.log('getall')
    let _url = this.host + "/todos";

    return this._http.get(_url)
      .map((result: any) => {
        console.log(this.globalLoader)
        this.globalLoader = false;
        console.log(this.globalLoader)       
        return result;
      })
      .catch(this.handleError);
  }

  add(newTodo): Observable<Todo[]> {
    let _url = this.host + "/addTodo";

    return this._http.post(_url, newTodo)
      .map((result: Response) => {
        this.updateTodoList();
        return result;
      })
      .catch(this.handleError);
  }

  update(todo): Observable<Todo> {
    let todoCopy = Object.assign({}, todo);
    let _url = this.host + "/updateTodo/" + todo._id;
    delete todoCopy._id;
    
    return this._http.put(_url, todoCopy)
      .map((result: Response) => {
        return result;
      })
      .catch(this.handleError);
  }

  remove(todoId): Observable<Todo> {
    let _url = this.host + "/removeTodo/" + todoId;
    
    return this._http.delete(_url)
      .map((result: Response) => {
        return result;
      })
      .catch(this.handleError);
  }

  private updateTodoList() {
    this.getAll().subscribe((result) => {
      this.todos.next(result);
    }); 
  }

  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
