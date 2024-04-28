import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { DateSharingService } from 'src/app/services/date-sharing.service';

@Component({
  selector: 'app-c5-scatter-chart',
  templateUrl: './c5-scatter-chart.component.html',
  styleUrls: ['./c5-scatter-chart.component.scss']
})
export class C5ScatterChartComponent implements OnInit {

  private subscription!: Subscription;
  monthFilter: string | null = null;
  private chartCreated: boolean = false;

  constructor(private elementRef: ElementRef, private dateSharingService: DateSharingService) { }

  ngOnInit(): void {
    this.subscription = this.dateSharingService.monthFilter$.subscribe(month => {
      this.monthFilter = month;
      if (this.chartCreated) {
        this.updateBubbleChart();
      } else {
        this.createBubbleChart();
        this.chartCreated = true;
      }
    });

  }

  createBubbleChart() {
    const data = [
      { country: 'United States', mmr: 10, population: 330 },
      { country: 'United Kingdom', mmr: 6, population: 68 },
      { country: 'Australia', mmr: 12, population: 25 },
      { country: 'Canada', mmr: 8, population: 38 }
    ];

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(this.elementRef.nativeElement).select('.bubble-chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('display', 'block')
      .style('margin', 'auto')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const x = d3.scaleLinear()
      .domain([0, 700])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([-2, 14])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.country))
      .range(['#ead8ee', '#ffa128', '#fed094', '#b8cce7']);

    svg.selectAll('.bubble')
      .data(data)
      .enter().append('circle')
      .attr('class', 'bubble')
      .attr('cx', d => x(d.population))
      .attr('cy', d => y(d.mmr))
      .attr('r', 15)
      .attr('fill', d => <any>color(d.country))
      .style('opacity', 0.7);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format('$.0f')).tickPadding(15).tickSize(0));

    svg.append('g')
      .call(d3.axisLeft(y).tickFormat(d3.format('$.1f')).tickPadding(15).tickSize(0));


    const legendWidth = 120;
    const legendMargin = 10;

    const legend = svg.selectAll('.legend')
      .data(data)
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (_, i) => `translate(${i * (legendWidth + legendMargin) + (legendWidth / 2)}, ${height + margin.bottom / 1.3})`);

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', -5)
      .attr('r', 5)
      .attr('fill', d => <any>color(d.country));

    legend.append('text')
      .attr('x', 10)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .style('text-anchor', 'start')
      .text(d => d.country);
  }

  updateBubbleChart() {
    const month = this.monthFilter || 'Default';
    const data = this.generateRandomData(month);
    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const svg = d3.select(this.elementRef.nativeElement).select('.bubble-chart');
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const x = d3.scaleLinear()
      .domain([0, 700])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([-2, 14])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(data.map((d:any) => d.country))
      .range(['#ead8ee', '#ffa128', '#fed094', '#b8cce7']);

    svg.selectAll('.bubble')
      .data(data)
      .transition()
      .duration(1000)
      .attr('cx', (d: any) => x(d.population))
      .attr('cy', (d: any) => y(d.mmr))
      .attr('r', 15)
      .attr('fill', (d: any) => <any>color(d.country));
  }
  generateRandomData(month: string): { country: string, mmr: number, population: number }[] {
    return [
      { country: 'United States', mmr: Math.random() * 12, population: Math.random() * 700 },
      { country: 'United Kingdom', mmr: Math.random() * 12, population: Math.random() * 700 },
      { country: 'Australia', mmr: Math.random() * 12, population: Math.random() * 700 },
      { country: 'Canada', mmr: Math.random() * 12, population: Math.random() * 700 }
    ];
  }
}
