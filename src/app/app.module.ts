import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { fakeBackendProvider } from './_helpers/index';
import { routing }        from './app.routing';


import { AppComponent } from './components/app/app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { MyFilterPipe } from './filters/filter-todos';
import { ToDoService, GlobalLoaderService, UserService, AlertService } from './services/index';

import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoAlertComponent } from './components/todo-alert/todo-alert.component';
import { TodoLoaderComponent } from './components/todo-loader/todo-loader.component';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AuthenticationService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { UsersComponent } from './components/users/users.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    MyFilterPipe,
    TodoInputComponent,
    TodoAlertComponent,
    TodoLoaderComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    routing
  ],
  providers: [
    MyFilterPipe, 
    ToDoService,
    GlobalLoaderService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
