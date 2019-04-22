import { DateAndWeek } from './datemanager';

export class ChangeActivityArg {

  // tslint:disable-next-line:max-line-length
  constructor(public type: string, public operation: string, public roomId: number, public date?: Date, public dateStart?: Date, public dateEnd?: Date) { }

}
