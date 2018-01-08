import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../services/to-do.service';

@Component({
  selector: 'app-todo-loader',
  templateUrl: './todo-loader.component.html',
  styleUrls: ['./todo-loader.component.css']
})
export class TodoLoaderComponent implements OnInit {
  globalLoader:object;

  constructor(private tds: ToDoService) { }

  ngOnInit() {
    this.globalLoader = this.tds.globalLoader;
  }

}
