import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent, MyService} from './app.component';
import {HelloComponent} from "./hello.component";
import {DateFormatPipe} from "./date-format.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
