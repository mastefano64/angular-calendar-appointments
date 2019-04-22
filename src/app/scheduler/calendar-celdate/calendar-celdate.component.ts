import { Component, Input, OnInit } from '@angular/core';

import { DateAndWeek } from '../datemanager';

@Component({
  selector: 'app-celdate',
  templateUrl: './calendar-celdate.component.html',
  styleUrls: ['./calendar-celdate.component.css']
})
export class CalendarCelDateComponent implements OnInit {
  @Input() date: DateAndWeek;

  constructor() { }

  ngOnInit() {
  }

}
