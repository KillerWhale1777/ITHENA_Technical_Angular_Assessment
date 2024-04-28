import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { DateSharingService } from '../../services/date-sharing.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-c6-column-chart',
  templateUrl: './c6-column-chart.component.html',
  styleUrls: ['./c6-column-chart.component.scss']
})
export class C6ColumnChartComponent implements OnInit {

  private subscription!: Subscription;
  monthFilter: string | null = null;
  constructor(private elementRef: ElementRef, private dateSharingService: DateSharingService) { }

  ngOnInit(): void {
    this.createColumnChart();
    this.subscription = this.dateSharingService.monthFilter$.subscribe(month => {
      this.monthFilter = month;
      this.updateColumnChart();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  createColumnChart() {
    const data = [
      { month: 'Jan-Feb', low: -3, medium: 2, high: 3 },
      { month: 'Mar-Apr', low: 14, medium: 2, high: 3 },
      { month: 'May-June', low: 2, medium: 3, high: 4 },
      { month: 'july-Sept', low: 2, medium: 3, high: 4 },
      { month: 'Sept-Oct', low: 2, medium: 3, high: 4 },
      { month: 'Nov-Dec', low: 2, medium: 3, high: 4 },
      // Add more months as needed
    ];

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(this.elementRef.nativeElement).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('display', 'block')
      .style('margin', 'auto')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([-4, 14])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(['low', 'medium', 'high'])
      .range(['#719ad1', '#ff9f24', '#ffc744']);

    const keys = ['low', 'medium', 'high'];

    data.forEach((d: any) => {
      let y0 = 0;
      d.categories = keys.map(key => ({ key, y0: y0, y1: y0 += +d[key] }));
      d.total = d.categories[d.categories.length - 1].y1;
    });

    // Append y axis without axis line
    svg.append('g')
      .attr('transform', 'translate(0,0)')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => d3.format("$")(d) + "K").tickPadding(15).tickSize(0))
      .select('.domain')  // select the axis line
      .remove();          // remove the axis line

    // Append x axis without axis line
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickPadding(15).tickSize(0))
      .select('.domain')  // select the axis line
      .remove();          // remove the axis line

    // Add horizontal grid lines
    svg.append('g')
      .selectAll('line')
      .data(y.ticks())
      .enter().append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', d => y(d))
      .attr('y2', d => y(d))
      .attr('stroke', 'lightgray')
      .style('stroke-width', 1)
      .style('stroke-opacity', 0.5);

    svg.selectAll('.bar')
      .data(data)
      .enter().append('g')
      .attr('transform', d => 'translate(' + x(d.month) + ',0)')
      .selectAll('rect')
      .data((d: any) => d.categories)
      .enter().append('rect')
      .attr('x', 0)
      .attr('y', (d: any) => y(d.y1))
      .attr('height', (d: any) => y(d.y0) - y(d.y1))
      .attr('width', x.bandwidth())
      .attr('fill', (d: any) => <any>color(d.key));
  }

  updateColumnChart() {

  }
}
