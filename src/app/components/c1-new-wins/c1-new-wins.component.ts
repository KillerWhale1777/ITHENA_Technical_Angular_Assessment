import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateSharingService } from '../../services/date-sharing.service';

@Component({
  selector: 'app-c1-new-wins',
  templateUrl: './c1-new-wins.component.html',
  styleUrls: ['./c1-new-wins.component.scss']
})
export class C1NewWinsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  monthFilter: string | null = null;

  newWinsData: { count: number, percentage: number } = { count: 230, percentage: 25 };

  constructor(private dateSharingService: DateSharingService) { }

  ngOnInit(): void {
    this.getMonth();
  }

  getMonth(): void {
    this.subscription = this.dateSharingService.monthFilter$.subscribe(month => {
      this.monthFilter = month;
      this.fetchDataForMonth(month);
    });
  }

  fetchDataForMonth(month: string | null): void {
    if (month) {
      this.newWinsData.count = Math.floor(Math.random() * 500);
      this.newWinsData.percentage = Math.floor(Math.random() * 100);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
