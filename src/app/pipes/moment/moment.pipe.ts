import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    moment.locale('es');

    if(args[0] === 'fromNow') {
      return moment(value).fromNow();
    }

    if(args[0] === 'calendar') {
      return moment(value).calendar();
    }

    if(args[0] === 'future') {
      return moment(value).format('dddd LL');
    }

    return moment(value).format('LL');
  }

}
