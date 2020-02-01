import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './Interfaces/Project';
import { Priority } from './Interfaces/Priority';
import { Task } from './Interfaces/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _projectUrl = 'http://localhost:3000/projects'
  private _priorityUrl = 'http://localhost:3000/priorities'
  private _taskUrl = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient) { }

  public async getTaskProjects() {
    let _url = this._projectUrl
    let Project = await this.http.get<Project[]>(_url).toPromise().then(res => { return res });
    return Project;
  }

  public async getTaskPriorities() {
    let _url = this._priorityUrl
    let Priorities = await this.http.get<Priority[]>(_url).toPromise().then(res => { return res });
    return Priorities
  }

  public async getTaskByProjectId(id: number, TaskId: number) {
    let _url = this._taskUrl + `?ProjectId=${id}&TaskId=${TaskId}`
    let Tasks = await this.http.get<Task[]>(_url).toPromise().then(tasks => {
      let _tasks = []
      tasks.forEach((task) => {
        _tasks.push(task._id)
      })
      return _tasks
    });
    return Tasks
  }

  public async getTaskDetails(id: number) {
    let _url = this._taskUrl + `?_id=${id}`
    let Tasks = await this.http.get<Task[]>(_url).toPromise().then(task => { return task[0] })
    return Tasks
  }

  public async getProjectDetails(id: number) {
    let _url = this._projectUrl + `?_id=${id}`
    let project = await this.http.get<Project[]>(this._projectUrl).toPromise()
      .then(Promise => {
        return Promise.filter((project) => {
          if (project._id == id)
            return project
        })
      })
    return project[0]
  }

  public async getTaskChildIds(id: number) {
    let _url = this._taskUrl + `?TaskId=${id}`
    let TasksId = await this.http.get<Task[]>(_url).toPromise()
      .then(tasks => {
        let taskIds = []
        tasks.forEach((task) => {
          taskIds.push(task._id)
        })
        return taskIds
      })
    return TasksId
  }

  public async getTaskByPriority(priority: number) {
    let TaskIds = await this.http.get<Task[]>(this._taskUrl).toPromise()
      .then(tasks => {
        let taskIds = []
        tasks.forEach(task => {
          if (task.priority == priority)
            taskIds.push(task._id)
        })
        return taskIds
      })
    return TaskIds
  }

}
