import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  @Input() name: String
  @Input() items: any

  status:boolean = false

  constructor() { }

  ngOnInit() {
  }

  dropDown = () => {
    this.status = !this.status
  }

}
