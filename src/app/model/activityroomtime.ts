import { KeyValuePair } from './keyvaluepair';

export class ActivityRoomTime {
  rooms: KeyValuePair<number, string>[];
  startTimes: KeyValuePair<string, string>[];
  endTimes: KeyValuePair<string, string>[];

  constructor() {
    this.rooms = [];
    this.startTimes = [];
    this.endTimes = [];
  }

}
