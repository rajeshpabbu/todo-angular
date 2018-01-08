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
  filteredTodos = [];
  private filterBy = "All";

  private filterTabs = [
    {filterBy: "All"},
    {filterBy: "Completed"},
    {filterBy: "Pending"}
  ];

  constructor(private todoService: ToDoService, private als: AlertService) {
  };

  filterTodos(filter: string) {
    this.filterBy = filter;
    switch(filter){
      case "All":
      this.filteredTodos = this.todos;
      break;

      case "Completed":
      this.filteredTodos = this.todos.filter(item => item.isCompleted === true);
      break;

      case "Pending":
      this.filteredTodos = this.todos.filter(item => item.isCompleted === false);
      break;
    }
  }

  ngOnInit() {
    this.loadTodos();
    this.todoService.castTodos.subscribe((todos) => {
      this.todos = todos;
      this.filterTodos(this.filterBy);
    }); 
  }

  loadTodos () {
    this.todoService.getAll().subscribe((result:any) => {
      this.todos = result;
      this.filterTodos(this.filterBy);
      this.todoService.globalLoader.isLoading = false;          
    }); 
  }

  updateTodo (todo: Todo) {
    this.todoService.globalLoader.isLoading = true;
    this.todoService.update(todo).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +todo.name+ "</strong> updated successfully", type:"success"});
      this.loadTodos();
    });
  }

  removeTodo(todo: Todo) {
    this.todoService.globalLoader.isLoading = true;    
    this.todoService.remove(todo._id).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +todo.name+ "</strong> removed successfully", type:"success"})            
      this.loadTodos();      
    });
  }
}