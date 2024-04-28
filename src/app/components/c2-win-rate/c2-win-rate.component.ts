import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateSharingService } from '../../services/date-sharing.service';

@Component({
  selector: 'app-c2-win-rate',
  templateUrl: './c2-win-rate.component.html',
  styleUrls: ['./c2-win-rate.component.scss']
})
export class C2WinRateComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  monthFilter: string | null = null;

  newWinsData: { floatPercentage: number, percentage: number } = { floatPercentage: 9.86, percentage: 25 };

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
      const randomPercentage = Math.random() * 100;
      this.newWinsData.floatPercentage = parseFloat(randomPercentage.toFixed(2)); // Convert to fixed 2 decimal places
      this.newWinsData.percentage = Math.floor(this.newWinsData.floatPercentage);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
