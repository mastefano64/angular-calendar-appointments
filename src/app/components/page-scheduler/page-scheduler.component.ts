import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Subscription } from 'rxjs';

import { FormActivityComponent } from '../form-activity/form-activity.component';
import { ActivityCreateArg } from '../../scheduler/activitycreatearg';
import { ActivityEditArg } from '../../scheduler/activityeditarg';
import { ChangeActivityArg } from '../../scheduler/changeactivityarg';
import { ActivityService } from '../../service/activity-service';
import { KeyValuePair } from 'src/app/model/keyvaluepair';
import { CalendarCfg } from '../../settings/calendarcfg';

@Component({
  selector: 'app-pagescheduler',
  templateUrl: './page-scheduler.component.html',
  styleUrls: ['./page-scheduler.component.css']
})
export class PageSchedulerComponent implements OnInit {
  year: number;
  month: number;
  day: number;
  startHoursAM: number;
  endHoursAM: number;
  stepHoursAM: number;
  startHoursPM: number;
  endHoursPM: number;
  stepHoursPM: number;
  currentsearch: ChangeActivityArg;
  sub: Subscription;
  datasource = [];
  rooms = [];

  constructor(private dialog: MatDialog, private service: ActivityService, private cd: ChangeDetectorRef) {
    // const d = new Date();
    const d = new Date(2019, 2, 4);
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
    this.day = d.getDate();
    this.startHoursAM = CalendarCfg.startHoursAM;
    this.endHoursAM = CalendarCfg.endHoursAM;
    this.stepHoursAM = CalendarCfg.stepHoursAM;
    this.startHoursPM = CalendarCfg.startHoursPM;
    this.endHoursPM = CalendarCfg.endHoursPM;
    this.stepHoursPM = CalendarCfg.stepHoursPM;
   }

  ngOnInit() {
    this.service.getActivityRoomTime().subscribe(result => {
      const r = result as any;
      r.rooms.push(new KeyValuePair<number, string>(0, '-- all room --'));
      this.rooms = r.rooms;
    });
  }

  onActivityChanged(args: ChangeActivityArg) {
    this.currentsearch = args;
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = undefined;
    }
    this.sub = this.service.getActivity(args).subscribe(result => {
        this.datasource = result as any[];
        this.cd.detectChanges();
      }
    );
  }

  onCreateActivity(args: ActivityCreateArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '550px';
    const p1 = this.service.getActivityRoomTime();
    dialogConfig.data = { type: 'create', param: args, roomtime: p1 };
    const dialogRef = this.dialog.open(FormActivityComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === 'ok') {
        this.onActivityChanged(this.currentsearch);
      }
      if (data === 'no') {
      }
    });
  }

  onEditActivity(args: ActivityEditArg) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.height = '550px';
    const p1 = this.service.getActivityRoomTime();
    dialogConfig.data = { type: 'edit', param: args, roomtime: p1 };
    const dialogRef = this.dialog.open(FormActivityComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data === 'ok') {
        this.onActivityChanged(this.currentsearch);
      }
      if (data === 'no') {
      }
    });
  }

}
