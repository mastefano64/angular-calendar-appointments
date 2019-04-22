import { DateAndWeek } from './datemanager';

export class ChangeDateArg {

  constructor(public operation: string, public roomId: number, public date: DateAndWeek) { }

}
