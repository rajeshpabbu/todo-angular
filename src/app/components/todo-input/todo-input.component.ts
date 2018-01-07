import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { AlertService } from '../../services/alert.service';

declare var $:any

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  constructor(
    private todoService: ToDoService,
    private als: AlertService
  ) { }

  ngOnInit() {
    
  }

  addTodo (todo: string) {
    const newtodo = {name: todo, isCompleted: false};
    this.todoService.add(newtodo).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +todo+ "</strong> added successfully", type:"success"})
    });
  }

  openTodoModal (type: string) {
    $('#add-edit-todo').modal('show');
  }

}
