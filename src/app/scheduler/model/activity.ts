
export class Activity {
  activityId: number;
  roomId: number;
  date: Date;
  startTime: string;
  endTime: string;
  stepDuration: number;
  title: string;
  description: string;

  constructor() {
    this.activityId = 0;
    this.roomId = 1;
    this.date = undefined;
    this.startTime = '';
    this.endTime = '';
    this.stepDuration = 0;
    this.title = '';
    this.description = '';
  }
}
