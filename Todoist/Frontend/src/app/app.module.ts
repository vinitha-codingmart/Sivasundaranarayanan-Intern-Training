import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopnavComponent } from './topnav/topnav.component';
import { LogoComponent } from './logo/logo.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TopIconsComponent } from './top-icons/top-icons.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InboxComponent } from './inbox/inbox.component';
import { TodayComponent } from './today/today.component';
import { NextweekComponent } from './nextweek/nextweek.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './modal/modal.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { PriorityComponent } from './priority/priority.component'

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    LogoComponent,
    SearchBarComponent,
    TopIconsComponent,
    SideNavComponent,
    MainPageComponent,
    InboxComponent,
    TodayComponent,
    NextweekComponent,
    DropDownComponent,
    ModalComponent,
    ProjectComponent,
    TaskComponent,
    PriorityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }