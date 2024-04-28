import { Component, OnInit } from '@angular/core';
import { DateSharingService } from '../../services/date-sharing.service'
@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {
  selectedMonth:string | undefined;
  showMonthList: boolean = false;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  toggleMonthList(): void {
    this.showMonthList = !this.showMonthList;
  }

  constructor(private dateSharingService: DateSharingService) { }

  ngOnInit(): void {
  }
  selectMonth(month: string): void {
    this.selectedMonth = month;
    this.dateSharingService.setDateFilter(month);
    this.showMonthList= false
  }
}
