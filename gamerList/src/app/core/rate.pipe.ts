import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'exponentialRate'})
export class ExponentialRatePipe implements PipeTransform {
  transform(value: number): number {
 
    return Math.round(value) / 10;
  }
}