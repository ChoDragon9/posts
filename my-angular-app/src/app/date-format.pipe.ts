import {Pipe, PipeTransform} from "../../node_modules/@angular/core";

@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date): string {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const longMonth = `${month < 10 ? 0 : ''}${month}`
    const longDay = `${day < 10 ? 0 : ''}${day}`
    return `${year}-${longMonth}-${longDay}`
  }
}
