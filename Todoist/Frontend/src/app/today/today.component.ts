import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Today: Todoist')
  }

  ngOnInit() {
  }

}
