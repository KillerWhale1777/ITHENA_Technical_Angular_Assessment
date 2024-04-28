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
      // Replace this with your actual logic to fetch data for the selected month
      // For demonstration, we'll just update with static values
      if (month === 'January') {
        this.newWinsData.currency = this.formatCurrency('25690'); // Example currency for January
        this.newWinsData.percentage = 25; // Example percentage for January
      } else if (month === 'February') {
        this.newWinsData.currency = this.formatCurrency('30000'); // Example currency for February
        this.newWinsData.percentage = 30; // Example percentage for February
      }
      else if (month === 'March') {
        this.newWinsData.currency = this.formatCurrency('60700'); // Example currency for February
        this.newWinsData.percentage = 60; // Example percentage for February
      }
      else if (month === 'April') {
        this.newWinsData.currency = this.formatCurrency('20000'); // Example currency for February
        this.newWinsData.percentage = 30; // Example percentage for February
      }
      else if (month === 'May') {
        this.newWinsData.currency = this.formatCurrency('40000'); // Example currency for February
        this.newWinsData.percentage = 30; // Example percentage for February
      }
      else if (month === 'June') {
        this.newWinsData.currency = this.formatCurrency('50000'); // Example currency for February
        this.newWinsData.percentage = 30; // Example percentage for February
      }
      else if (month === 'July') {
        this.newWinsData.currency = this.formatCurrency('70000'); // Example currency for February
        this.newWinsData.percentage = 30; // Example percentage for February
      }
      else if (month === 'August') {
        this.newWinsData.currency = this.formatCurrency('40000'); // Example currency for February
        this.newWinsData.percentage = 30; // Example percentage for February
      }
      else if (month === 'September') {
        this.newWinsData.currency = this.formatCurrency('80000'); // Example currency for February
        this.newWinsData.percentage = 30; // Example percentage for February
      }
      else if (month === 'October') {
        this.newWinsData.currency = this.formatCurrency('30440'); // Example currency for February
        this.newWinsData.percentage = 30; // Example percentage for February
      }
      else if (month === 'November') {
        this.newWinsData.currency = this.formatCurrency('60700'); // Example currency for February
        this.newWinsData.percentage = 70; // Example percentage for February
      }
      else if (month === 'December') {
        this.newWinsData.currency = this.formatCurrency('30000'); // Example currency for February
        this.newWinsData.percentage = 50; // Example percentage for February
      }
      // Add conditions for other months as needed
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Helper function to format currency with commas
  formatCurrency(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
