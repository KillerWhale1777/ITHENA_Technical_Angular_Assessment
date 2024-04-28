import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DateSharingService {
  private monthFilterSubject = new BehaviorSubject<string | null>(null);
  monthFilter$ = this.monthFilterSubject.asObservable();

  constructor() { }

  setDateFilter(month: string | null) {
    this.monthFilterSubject.next(month);
  }
}
