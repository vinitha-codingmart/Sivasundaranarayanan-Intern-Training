import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private titleService: Title) { 
    this.titleService.setTitle('Inbox: Todoist')
  }

  ngOnInit() {
  }

}
