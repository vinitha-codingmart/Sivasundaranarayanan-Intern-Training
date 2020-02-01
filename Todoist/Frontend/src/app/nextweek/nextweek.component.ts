import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nextweek',
  templateUrl: './nextweek.component.html',
  styleUrls: ['./nextweek.component.css']
})
export class NextweekComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Next 7 days: Todoist')
  }


  ngOnInit() {
  }

}
