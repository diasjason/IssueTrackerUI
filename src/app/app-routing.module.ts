import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SprintComponent } from './Components/sprint/sprint.component';
import { AddEditSprintComponent } from './Components/add-edit-sprint/add-edit-sprint.component';
import { ReleaseComponent } from './Components/release/release.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { IssuesComponent } from './Components/issues/issues.component';

const routes: Routes = [
  {path:"Sprints",component:SprintComponent},
  {path:"AddEditSprints",component:AddEditSprintComponent},
  {path:"Release",component:ReleaseComponent},
  {path:"Issues",component:IssuesComponent},
  {path:"Login",component:LoginFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
