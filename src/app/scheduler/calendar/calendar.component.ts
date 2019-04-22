import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';

import { CalendarNavbarComponent } from '../calendar-navbar/calendar-navbar.component';
import { DateManager, DateAndWeek, StepHours } from '../datemanager';
import { ActivityCreateArg } from '../activitycreatearg';
import { ActivityEditArg } from '../activityeditarg';
import { ChangeActivityArg } from '../changeactivityarg';
import { ChangeDateArg } from '../changedatearg';
import { StatusbarArg } from '../changestatusbarargs';
import { Activity } from '../model/activity';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit  {
  @Input() year: number;
  @Input() month: number;
  @Input() day: number;
  @Input() startHoursAM: number;
  @Input() endHoursAM: number;
  @Input() stepHoursAM: number;
  @Input() startHoursPM: number;
  @Input() endHoursPM: number;
  @Input() stepHoursPM: number;
  @Input() rooms: any[];
  @Input() datasource: any[];
  @Output() changeactivity = new EventEmitter<ChangeActivityArg>();
  @Output() createactivity = new EventEmitter<ActivityCreateArg>();
  @Output() editactivity = new EventEmitter<ActivityEditArg>();
  @ViewChild(CalendarNavbarComponent) navbar;
  slectedview = 'giorno';
  stepdays: DateAndWeek[] = [];
  stephours: StepHours[] = [];
  statusbar: Activity;
  manager: DateManager;

  constructor() {
    this.manager = new DateManager();
  }

  get currentRoom(): number {
    if (this.navbar) {
      return this.navbar.roomid;
    } else {
      return undefined;
    }
  }

  get currentYMD(): Date {
    if (this.navbar) {
      return this.navbar.currymd;
    } else {
      return undefined;
    }
  }

  ngOnInit() {
    for (let i = this.startHoursAM; i <= this.endHoursAM; i = i + this.stepHoursAM) {
      const st = new StepHours();
      st.startTime = this.formatHours(i);
      st.endTime = this.formatHours(i + this.stepHoursAM);
      st.stepTime = (this.stepHoursAM * 60).toString();
      this.stephours.push(st);
    }
    for (let i = this.startHoursPM; i <= this.endHoursPM; i = i + this.stepHoursPM) {
      const st = new StepHours();
      st.startTime = this.formatHours(i);
      st.endTime = this.formatHours(i + this.stepHoursPM);
      st.stepTime = (this.stepHoursPM * 60).toString();
      this.stephours.push(st);
    }
  }

  onStatusbarChanged(args: StatusbarArg) {
    if (args.type === 'enter') {
      this.statusbar = args.activity;
    } else {
      this.statusbar = undefined;
    }
  }

  onDayChanged(args: ChangeDateArg) {
    this.stepdays = [];
    this.notifyChangeActivity(1);
  }

  onWeekChanged(args: ChangeDateArg) {
    this.stepdays = this.navbar.getDaysOfWeek();
    this.notifyChangeActivity(2);
  }

  onMonthChanged(args: ChangeDateArg) {
    this.stepdays = [];
    this.notifyChangeActivity(1);
  }

  onRomChanged(args: ChangeDateArg) {
    if (this.slectedview === 'settimana') {
      this.stepdays = this.navbar.getDaysOfWeek();
      this.notifyChangeActivity(2);
    } else {
      this.stepdays = [];
      this.notifyChangeActivity(1);
    }
  }

  onViewChanged(value: string) {
    this.slectedview = value;
    if (this.slectedview === 'settimana') {
      this.stepdays = this.navbar.getDaysOfWeek();
      this.notifyChangeActivity(2);
    } else {
      this.stepdays = [];
      this.notifyChangeActivity(1);
    }
  }

  onCreateActivity(args: ActivityCreateArg) {
    this.createactivity.emit(args);
  }

  onEditActivity(args: ActivityEditArg) {
    this.editactivity.emit(args);
  }

  private notifyChangeActivity(type: number) {
    const param = (type === 1) ? 'giorno' : 'settimana';
    const ca = new ChangeActivityArg(param, this.slectedview, this.currentRoom);
    if (type === 1) {
      ca.date = new Date(this.currentYMD);
    } else {
      ca.dateStart = new Date(this.currentYMD);
      ca.dateEnd = new Date(this.currentYMD);
      ca.dateEnd.setDate(ca.dateStart.getDate() + 7);
    }
    this.changeactivity.emit(ca);
  }

  private formatHours(value: number): string {
    const hours = Math.floor(value);
    const minutes1 = (value % 1).toFixed(2);
    const minutes2 = parseFloat(minutes1) * 60;
    let s1 = hours.toString();
    let s2 = minutes2.toString();
    if (s1.length === 1) {
      s1 = '0' + s1;
    }
    if (s2.length === 1) {
      s2 = '0' + s2;
    }
    const hm = s1 + '.' + s2;
    return hm;
  }

}
