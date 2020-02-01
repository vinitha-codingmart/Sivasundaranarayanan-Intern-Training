import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent implements OnInit {

  id: number
  taskIds: any = []

  constructor(private _route: ActivatedRoute, private _taskService: TaskService) {
    this._route.params.subscribe(async (params) => {
      this.id = params.id
      this.taskIds = await this._taskService.getTaskByPriority(params.id)
    })
  }

  ngOnInit() {
    
  }

}
