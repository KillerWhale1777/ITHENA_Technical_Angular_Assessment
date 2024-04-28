import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainContainerComponent } from '../main-container/main-container.component';
import { C1NewWinsComponent } from '../c1-new-wins/c1-new-wins.component';
import { C2WinRateComponent } from '../c2-win-rate/c2-win-rate.component';
import { C3NewMmrComponent } from '../c3-new-mmr/c3-new-mmr.component';
import { C4PieChartComponent } from '../c4-pie-chart/c4-pie-chart.component';
import { C5ScatterChartComponent } from '../c5-scatter-chart/c5-scatter-chart.component';
import { C6ColumnChartComponent } from '../c6-column-chart/c6-column-chart.component';
import { MaterialModuleModule } from 'src/app/modules/material-module/material-module.module';
import { DateSharingService } from 'src/app/services/date-sharing.service';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [
      // Define child routes if needed
    ]
  },
  // Define other routes if needed
  // ...
  {
    path: '**',
    redirectTo: '', // Redirect to MainContainerComponent for unknown routes
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    MainContainerComponent,
    C1NewWinsComponent,
    C2WinRateComponent,
    C3NewMmrComponent,
    C4PieChartComponent,
    C5ScatterChartComponent,
    C6ColumnChartComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Use forChild() since this is a feature module
    MaterialModuleModule,
  ],
  providers: [
    DateSharingService
  ]
})
export class DashboardModule { }
