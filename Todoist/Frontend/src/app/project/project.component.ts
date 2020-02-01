import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  private project: any = {}
  private data = []
  private id: number


  constructor(private route: ActivatedRoute, private _taskService: TaskService, private titleService: Title) {
    this.route.params.subscribe(async (params) => {
      this.id = params.id
      this.project = await this._taskService.getProjectDetails(this.id)
      this.data = await this._taskService.getTaskByProjectId(this.id, null)
      this.setTitle(`${this.project.title}: Todoist`)

    });
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }

  ngOnInit() {

  }
}
