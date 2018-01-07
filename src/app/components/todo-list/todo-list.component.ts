import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo';
import { ToDoService } from '../../services/to-do.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos = [];

  constructor(private todoService: ToDoService, private als: AlertService) {
  };

  ngOnInit() {
    this.loadTodos();
    this.todoService.castTodos.subscribe((todos) => {
      console.log("casted todos: "+todos)
      this.todos = todos;
    }); 
  }

  loadTodos () {
    this.todoService.getAll().subscribe((result) => {
      this.todos = result;      
    }); 
  }

  updateTodo (todo: Todo) {
    this.todoService.update(todo).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +todo.name+ "</strong> updated successfully", type:"success"})      
      this.loadTodos();
    });
  }

  removeTodo(todo: Todo) {
    this.todoService.remove(todo._id).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +todo.name+ "</strong> removed successfully", type:"success"})            
      this.loadTodos();      
    });
  }
}