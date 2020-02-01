import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { TodayComponent } from './today/today.component';
import { NextweekComponent } from './nextweek/nextweek.component';
import { ProjectComponent } from './project/project.component';
import { PriorityComponent } from './priority/priority.component';

const routes: Routes = [
  { path: 'inbox', component: InboxComponent },
  { path: 'today', component: TodayComponent },
  { path: 'nextweek', component: NextweekComponent },
  { path: 'projects/:id', component: ProjectComponent },
  { path: 'filters/:id', component: PriorityComponent },
  { path: '', redirectTo: "/inbox", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
