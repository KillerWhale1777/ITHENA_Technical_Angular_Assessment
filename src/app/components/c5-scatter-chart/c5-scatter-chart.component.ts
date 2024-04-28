import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-c5-scatter-chart',
  templateUrl: './c5-scatter-chart.component.html',
  styleUrls: ['./c5-scatter-chart.component.scss']
})
export class C5ScatterChartComponent implements OnInit {
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.createBubbleChart();
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
      .range(['#ead8ee', '#ffa128', '#fed094', '#b8cce7']); // Custom color codes

    svg.selectAll('.bubble')
      .data(data)
      .enter().append('circle')
      .attr('class', 'bubble')
      .attr('cx', d => x(d.population))
      .attr('cy', d => y(d.mmr))
      .attr('r', 10)
      .attr('fill', d => <any>color(d.country))
      .style('opacity', 0.7);

    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickFormat(d3.format('$.0f')).tickPadding(15).tickSize(0));

    svg.append('g')
      .call(d3.axisLeft(y).tickFormat(d3.format('$.1f')).tickPadding(15).tickSize(0));

    // Add legend
    const legendWidth = 100; // Adjust this value as needed
    const legendMargin = 20; // Add margin here

    const legend = svg.selectAll('.legend')
      .data(data)
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (_, i) => `translate(${i * (legendWidth + legendMargin) + (legendWidth / 2)}, ${height + margin.bottom / 1})`);

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
}
