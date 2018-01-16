import { Component, OnInit } from '@angular/core';
import { ToDoService, GlobalLoaderService, AlertService } from '../../services/index';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Todo } from '../../components/todo-list/todo';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  
  private tododata = {
    name: "",
    priority: "Low",
    status: "Pending"
  };

  private openedModal:any;
  
  constructor(
    private todoService: ToDoService,
    private gls: GlobalLoaderService,
    private als: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }

 addTodo (modal) {
    this.gls.globalLoader.isLoading = true;    
    const newtodo = this.tododata;
    this.todoService.add(newtodo).subscribe((result) => {
      this.todoService.updateTodoList();
      this.gls.globalLoader.isLoading = false;
      if (modal && modal === 'modal') this.openedModal.close();
      this.als.updateAlertQueue({
        message: "<strong>" + newtodo.name + "</strong> added successfully", 
        type: "success"
      });      
    }, error => this.errorCallback(error));
  }

  openTodoModal(content) {
    this.openedModal = this.modalService.open(content);
  }

  errorCallback(error) {
    this.gls.globalLoader.isLoading = false;          
    console.log(error);
    this.als.updateAlertQueue({
      message: "<strong>" + error.error + "</strong>",
      type: "danger"
    });
  }
}