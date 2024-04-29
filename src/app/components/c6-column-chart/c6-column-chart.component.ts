import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { DateSharingService } from '../../services/date-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-c6-column-chart',
  templateUrl: './c6-column-chart.component.html',
  styleUrls: ['./c6-column-chart.component.scss']
})
export class C6ColumnChartComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private monthFilter: string | null = null;
  private chartCreated: boolean = false;
  private svg: any;

  constructor(private elementRef: ElementRef, private dateSharingService: DateSharingService) { }

  ngOnInit(): void {
    this.subscription = this.dateSharingService.monthFilter$.subscribe(month => {
      this.monthFilter = month;
      if (this.chartCreated) {
        this.updateBarPlot();
      } else {
        this.drawBarPlot();
        this.chartCreated = true;
      }
    });

    this.drawBarPlot();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  drawBarPlot(): void {

    const data = [
      { category: 'Jan-Feb', value1: -3, value2: 2, value3: 3 },
      { category: 'Mar-Apr', value1: 7, value2: 2, value3: 3 },
      { category: 'May-June', value1: -3, value2: 3, value3: 4 },
      { category: 'july-Sept', value1: 1, value2: 3, value3: 4 },
      { category: 'Sept-Oct', value1: 2, value2: 3, value3: 4 },
      { category: 'Nov-Dec', value1: -3, value2: 3, value3: 4 },

    ];



    data.forEach((d: any) => {
      const total = d.value1 + d.value2 + d.value3;
      d.value1Percent = d.value1;
      d.value2Percent = d.value2;
      d.value3Percent = d.value3;
    });

    const color = d3.scaleOrdinal()
      .domain(['low', 'medium', 'high'])
      .range(['#719ad1', '#ff9f24', '#ffc744']);

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    this.svg = d3.select(this.elementRef.nativeElement).select('#column-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('display', 'block')
      .style('margin', 'auto')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const categories = ['value1Percent', 'value2Percent', 'value3Percent'];


    const stack = d3.stack().keys(categories)
      .order(d3.stackOrderNone);

    const series = stack(data as any);


    const maxY = 14;


    const x = d3.scaleBand()
      .domain(data.map(d => d.category))
      .range([40, 360])
      .padding(0.1);


    const y = d3.scaleLinear()
      .domain([-4, maxY])
      .range([360, 40]);


    this.svg.selectAll('.series').remove();


    this.svg.selectAll('.series')
      .data(series)
      .enter().append('g')
      .attr('fill', (d, i) => {
        if (i === 0) return '#719ad1';
        else if (i === 1) return '#ff9f24';
        else return '#ffc744';
      })
      .selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', (d: any) => x(d.data.category))
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());


    this.svg.append('g')
      .attr('transform', 'translate(0,0)')
      .call(d3.axisLeft(y).ticks(10).tickFormat(d => d3.format("$")(d) + "K").tickPadding(15).tickSize(0))
      .select('.domain')
      .remove();

    this.svg.append('g')
      .attr('transform', 'translate(0,' + (height + 20) + ')') // Move the x-axis down by 10 units
      .call(d3.axisBottom(x).tickPadding(15).tickSize(0))
      .select('.domain')
      .remove();

    this.svg.append('rect')
    .attr('width', 600)
    .attr('height', 300)
    .attr('fill', 'none')
    .attr('stroke', 'none');

    this.svg.append('g')
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
  }

  updateBarPlot(): void {

    const newData = this.getMonthData(this.monthFilter);

    newData.forEach((d: any) => {
      const total = d.value1 + d.value2 + d.value3;
      d.value1Percent = d.value1;
      d.value2Percent = d.value2;
      d.value3Percent = d.value3;
    });

    const keys = ['value1Percent', 'value2Percent', 'value3Percent'];

    const stack = d3.stack().keys(keys)
      .order(d3.stackOrderNone);

    const series = stack(newData);

    const x = d3.scaleBand()
      .domain(newData.map(d => d.category))
      .range([40, 360])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([-4, 14])
      .range([360, 40]);


    this.svg.selectAll('.series').remove();


    const barGroups = this.svg.selectAll('.series')
      .data(series)
      .enter().append('g')
      .attr('class', 'series')
      .attr('fill', (d, i) => {
        if (i === 0) return '#719ad1';
        else if (i === 1) return '#ff9f24';
        else return '#ffc744';
      });

    barGroups.selectAll('rect')
      .data(d => d)
      .enter().append('rect')
      .attr('x', d => x(d.data.category))
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth());
  }

  getMonthData(month: string | null): any[] {
    return [
      { category: 'Jan-Feb', value1: Math.random(), value2: Math.random(), value3: Math.random() },
      { category: 'Mar-Apr', value1: Math.random(), value2: Math.random(), value3: Math.random() },
      { category: 'May-Jun', value1: Math.random(), value2: Math.random(), value3: Math.random() },
      { category: 'Jul-Aug', value1: Math.random(), value2: Math.random(), value3: Math.random() },
      { category: 'Sept-Oct', value1: Math.random(), value2: Math.random(), value3: Math.random() },
      { category: 'Nov-Dec', value1: Math.random(), value2: Math.random(), value3: Math.random() }
    ];
  }
}
