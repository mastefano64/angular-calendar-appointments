import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

import { Activity } from 'src/app/scheduler/model/activity';
import { Utility } from 'src/app/appcore/utility';
import { ActivityService } from 'src/app/service/activity-service';

@Component({
  selector: 'app-dialogsearch',
  templateUrl: './form-activity.component.html',
  styleUrls: ['./form-activity.component.css']
})
export class FormActivityComponent implements OnInit, OnDestroy  {
  title: string;
  activity: Activity;
  type: string;
  $roomtime: any;
  sub: Subscription;
  rooms: any;
  roomId: any;
  startTimes: any;
  startTimeId: any;
  endTimes: any;
  endTimeId: any;

  // tslint:disable-next-line:max-line-length
  constructor(private service: ActivityService, private dialogRef: MatDialogRef<FormActivityComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {
    this.activity = new Activity();
    this.type = data.type;
    this.title = (this.type === 'create') ? 'New' : 'Modify';
    if (data.type === 'create') {
      this.activity.date = data.param.date;
      this.activity.startTime = data.param.startTime;
      this.activity.endTime = data.param.endTime;
    } else {
      this.activity = data.param.activity;
    }
    this.roomId = this.activity.roomId;
    this.startTimeId = this.activity.startTime;
    this.endTimeId = this.activity.endTime;
    this.$roomtime = data.roomtime;
  }

  ngOnInit() {
    this.sub = this.$roomtime.subscribe(result => {
      this.rooms = result.rooms;
      this.startTimes = result.startTimes;
      this.endTimes = result.endTimes;
    });
  }

  onConfirm(form: NgForm) {
    const vm = new Activity();
    vm.activityId = this.activity.activityId;
    vm.date = this.activity.date;
    vm.roomId = Utility.toInteger(form.value.roomId);
    vm.startTime = Utility.toString(form.value.startTimeId);
    vm.endTime = Utility.toString(form.value.endTimeId);
    vm.title = Utility.toString(form.value.title);
    vm.description = Utility.toString(form.value.description);
    //
    if (vm.endTime < vm.startTime) {
      alert('Attention: startTime > endTime');
      return;
    }
    vm.stepDuration = this.computeStep(vm);
    //
    if (this.type === 'create') {
      this.service.insertActivity(vm).subscribe(
        result => this.dialogRef.close(result),
        error => alert(error)
      );
    } else {
      this.service.updateActivity(vm).subscribe(
        result => this.dialogRef.close(result),
        error => alert(error)
      );
    }
  }

  onDelete() {
    const id = this.activity.activityId;
    this.service.deleteActivity(id).subscribe(
      result => this.dialogRef.close(result),
      error => alert(error)
    );
  }

  onClose() {
    this.dialogRef.close('no');
  }

  private computeStep(activity: Activity): number {
    let valret = 0;
    const start = activity.startTime.replace('.30', '.5');
    const end = activity.endTime.replace('.30', '.5');
    valret = ((parseFloat(end) - parseFloat(start)) / 0.5);
    return valret;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
