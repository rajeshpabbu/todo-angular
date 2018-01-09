import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';
import { AlertService } from '../../services/alert.service';
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
    private als: AlertService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log(this.tododata)
    
  }

 addTodo () {
    this.todoService.globalLoader.isLoading = true;    
    const newtodo = this.tododata;
    this.todoService.add(newtodo).subscribe((result) => {
      this.todoService.updateTodoList();
      this.todoService.globalLoader.isLoading = false;
      this.openedModal.close();
      this.als.updateAlertQueue({message:"<strong>" +newtodo.name+ "</strong> added successfully", type:"success"});      
    });
  }

  openTodoModal(content) {
    this.openedModal = this.modalService.open(content);
  }
}
