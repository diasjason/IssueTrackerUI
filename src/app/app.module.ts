import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {SprintComponent} from './Components/sprint/sprint.component';
import {IssueTrackerService} from './services/issue-tracker.service';

import{MatCardModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatGridListModule,
  MatToolbarModule}
   from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SprintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatTableModule,
    MatGridListModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [IssueTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
