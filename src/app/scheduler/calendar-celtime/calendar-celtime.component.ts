import { Component, Input, OnInit } from '@angular/core';

import { StepHours } from '../datemanager';

@Component({
  selector: 'app-celtime',
  templateUrl: './calendar-celtime.component.html',
  styleUrls: ['./calendar-celtime.component.css']
})
export class CalendarCelTimeComponent implements OnInit {
  @Input() hour: StepHours;

  constructor() { }

  ngOnInit() {
  }

}
