import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { StepHours } from '../datemanager';
import { Activity } from '../model/activity';
import { ActivityData } from '../model/activitydata';
import { ActivityCreateArg } from '../activitycreatearg';
import { ActivityEditArg } from '../activityeditarg';
import { StatusbarArg } from '../changestatusbarargs';

@Component({
  selector: 'app-attivity',
  templateUrl: './calendar-attivity.component.html',
  styleUrls: ['./calendar-attivity.component.css']
})
export class CalendarAttivityComponent implements OnInit, OnChanges  {
  @Input() slectedview: string;
  @Input() date: Date;
  @Input() hour: StepHours;
  @Input() datasource: Activity[];
  @Output() changestatusbar = new EventEmitter<StatusbarArg>();
  @Output() createactivity = new EventEmitter<ActivityCreateArg>();
  @Output() editactivity = new EventEmitter<ActivityEditArg>();
  activities: ActivityData[];
  hasActivity: boolean;

  constructor() {
    this.activities = [];
    this.hasActivity = false;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.datasource) {
      this.datasourceChanged();
    }
  }

  classRoomBox(activity: ActivityData): string {
    let valret = '';
    valret += `activtyRoomBox${activity.position} `;
    valret += `activtyRoomBoxColor${activity.activity.roomId} `;
    return valret;
  }

  onMouseEnter(a: ActivityData) {
    const args = new StatusbarArg('enter', a.activity);
    this.changestatusbar.emit(args);
  }

  onMouseLeave(a: ActivityData) {
    const args = new StatusbarArg('leave', a.activity);
    this.changestatusbar.emit(args);
  }

  onCreateActivityClick(event: Event) {
    event.stopPropagation();
    const args = new ActivityCreateArg(new Date(this.date), this.hour.startTime, this.hour.endTime);
    this.createactivity.emit(args);
  }

  onEditActivityClick(event: Event, data: ActivityData) {
    event.stopPropagation();
    const args = new ActivityEditArg(Object.assign({}, data.activity));
    this.editactivity.emit(args);
  }

  private datasourceChanged() {
    this.activities = [];
    this.hasActivity = false;
    let activities = this.datasource.filter(
      a => a.date.getTime() === this.date.getTime()
    );
    activities = activities.sort((a, b) => {
      if (a.roomId < b.roomId) {
        return -1;
      }
      if (a.roomId > b.roomId) {
        return +1;
      }
      return 0;
    });
    for (const activity of activities) {
      const a1 = parseFloat(activity.startTime);
      const a2 = parseFloat(this.hour.startTime);
      const b1 = parseFloat(activity.endTime);
      const b2 = parseFloat(this.hour.endTime);
      if (a2 >= a1 && b2 <= b1) {
        const ad = new ActivityData();
        ad.activity = activity;
        if (a2 === a1 && b2 === b1) {
          ad.position = 1;
        }
        if (a2 === a1 && b2 !== b1) {
          ad.position = 2;
        }
        if (a2 !== a1 && b2 !== b1) {
          ad.position = 3;
        }
        if (a2 !== a1 && b2 === b1) {
          ad.position = 4;
        }
        this.activities.push(ad);
        this.hasActivity = true;
      }
    }
  }

}
