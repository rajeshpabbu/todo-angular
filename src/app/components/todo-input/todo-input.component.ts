import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { AlertService } from '../../services/alert.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../components/todo-list/todo';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  
  private tododata:Todo = {
    _id : "",
    name: "",
    isCompleted: false
  };
  
  constructor(
    private todoService: ToDoService,
    private als: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log(this.tododata)
    
  }

  addQuickTodo(todo: string) {

  }

  addTodo (todo: string) {
    this.todoService.globalLoader.isLoading = true;    
    const newtodo = {name: todo, isCompleted: false};
    this.todoService.add(newtodo).subscribe((result) => {
      this.als.updateAlertQueue({message:"<strong>" +todo+ "</strong> added successfully", type:"success"});
      this.todoService.updateTodoList();
      this.todoService.globalLoader.isLoading = false;
    });
  }

  openTodoModal(content) {
    this.modalService.open(content).result.then((result) => {

    }, (reason) => {

    });
  }
}
