import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './components/app/app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MyFilterPipe } from './filters/filter-todos';
import { ToDoService } from './services/to-do.service';
import { AlertService } from './services/alert.service';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoAlertComponent } from './components/todo-alert/todo-alert.component';
import { TodoLoaderComponent } from './components/todo-loader/todo-loader.component';
import { AddEditTodoComponent } from './components/add-edit-todo/add-edit-todo.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    MyFilterPipe,
    TodoInputComponent,
    TodoAlertComponent,
    TodoLoaderComponent,
    AddEditTodoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [MyFilterPipe, ToDoService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
