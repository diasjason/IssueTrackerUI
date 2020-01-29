import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {SprintComponent} from './Components/sprint/sprint.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import {IssueTrackerService} from './services/issue-tracker.service';

import{MatCardModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTableModule,
  MatGridListModule,
  MatToolbarModule,
  MatSortModule,
  MatPaginatorModule,
  MatDatepickerModule, 
  MatNativeDateModule,
  MatDialogModule}
   from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddEditSprintComponent } from './Components/add-edit-sprint/add-edit-sprint.component';

@NgModule({
  declarations: [
    AppComponent,
    SprintComponent,
    NavbarComponent,
    AddEditSprintComponent
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
    ReactiveFormsModule,
    LayoutModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,    
    MatDatepickerModule, 
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [IssueTrackerService],
  bootstrap: [AppComponent],
  exports:[MatTableModule,MatSortModule,MatPaginatorModule]
})
export class AppModule { }
