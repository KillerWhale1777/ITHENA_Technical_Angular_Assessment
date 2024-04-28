import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DateSharingService } from '../../services/date-sharing.service';

@Component({
  selector: 'app-c3-new-mmr',
  templateUrl: './c3-new-mmr.component.html',
  styleUrls: ['./c3-new-mmr.component.scss']
})
export class C3NewMmrComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  monthFilter: string | null = null;

  newWinsData: { currency: string, percentage: number } = { currency: '25,690', percentage: 25 };

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
      if (month === 'January') {
        this.newWinsData.currency = this.formatCurrency('25690');
        this.newWinsData.percentage = 25;
      } else if (month === 'February') {
        this.newWinsData.currency = this.formatCurrency('30000');
        this.newWinsData.percentage = 30;
      }
      else if (month === 'March') {
        this.newWinsData.currency = this.formatCurrency('60700');
        this.newWinsData.percentage = 60;
      }
      else if (month === 'April') {
        this.newWinsData.currency = this.formatCurrency('20000');
        this.newWinsData.percentage = 30;
      }
      else if (month === 'May') {
        this.newWinsData.currency = this.formatCurrency('40000');
        this.newWinsData.percentage = 30;
      }
      else if (month === 'June') {
        this.newWinsData.currency = this.formatCurrency('50000');
        this.newWinsData.percentage = 30;
      }
      else if (month === 'July') {
        this.newWinsData.currency = this.formatCurrency('70000');
        this.newWinsData.percentage = 30;
      }
      else if (month === 'August') {
        this.newWinsData.currency = this.formatCurrency('40000');
        this.newWinsData.percentage = 30;
      }
      else if (month === 'September') {
        this.newWinsData.currency = this.formatCurrency('80000');
        this.newWinsData.percentage = 30;
      }
      else if (month === 'October') {
        this.newWinsData.currency = this.formatCurrency('30440');
        this.newWinsData.percentage = 30;
      }
      else if (month === 'November') {
        this.newWinsData.currency = this.formatCurrency('60700');
        this.newWinsData.percentage = 70;
      }
      else if (month === 'December') {
        this.newWinsData.currency = this.formatCurrency('30000');
        this.newWinsData.percentage = 50;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formatCurrency(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
