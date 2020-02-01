import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() taskId: any
  task: any = {}
  sDate: any
  childIds = []
  isViewed = false
  onEdit = false

  constructor(private _taskService: TaskService) { }

  getDate(date: string) {
    let mDate = new Date(date)
    let newDate = new Date()
    if (mDate.toDateString() == newDate.toDateString())
      return 'today'
    newDate.setDate(newDate.getDate() + 1)
    if (mDate.toDateString() == newDate.toDateString())
      return 'tomorrow'
    newDate.setDate(newDate.getDate() - 2)
    if (mDate.toDateString() == newDate.toDateString())
      return 'yesterday'
    if (mDate.toDateString() > newDate.toDateString())
      return 'days before yesterday'

    return mDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  }

  ngOnInit() {
    this.getTasks()
  }

  toggleSubTask() {
    this.isViewed = !this.isViewed
  }

  getTasks = async () => {
    console.log()
    this.task = await this._taskService.getTaskDetails(this.taskId)
    this.sDate = this.getDate(this.task.dueDate)
    this.childIds = await this._taskService.getTaskChildIds(this.taskId)
  }

}
