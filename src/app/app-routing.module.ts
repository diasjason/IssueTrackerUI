import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SprintComponent } from './Components/sprint/sprint.component';
import { AddEditSprintComponent } from './Components/add-edit-sprint/add-edit-sprint.component';
import { AddEditReleaseComponent } from './Components/add-edit-release/add-edit-release.component';
import { ReleaseComponent } from './Components/release/release.component';
//import { AddEditSprintComponent } from './Components/add-edit-sprint/add-edit-sprint.component';


const routes: Routes = [
  {path:"Sprints",component:SprintComponent},
  {path:"AddEditSprints",component:AddEditSprintComponent},
  {path:"Release",component:ReleaseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
