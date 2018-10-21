import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TodoListComponent} from "./todo-list.component";
import {TodoListService} from "./todo-list.service";

@NgModule({
  declarations: [
    AppComponent, TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TodoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
