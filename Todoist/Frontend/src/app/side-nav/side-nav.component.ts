import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  public inbox: any = [{
    title: 'title'
  }]

  public date = new Date().getDate()

  public Projects = []
  public Priorities = []

  constructor(private _taskService: TaskService) {
  }

  async ngOnInit() {
    this.Projects = await this._taskService.getTaskProjects()
    this.Priorities = await this._taskService.getTaskPriorities()
  }


}
