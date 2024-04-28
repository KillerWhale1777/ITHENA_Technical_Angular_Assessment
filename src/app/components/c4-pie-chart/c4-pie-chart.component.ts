import { Component, ElementRef, OnInit, ViewChild ,OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { DateSharingService } from '../../services/date-sharing.service'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-c4-pie-chart',
  templateUrl: './c4-pie-chart.component.html',
  styleUrls: ['./c4-pie-chart.component.scss']
})
export class C4PieChartComponent implements OnInit {
  private subscription!: Subscription;
  monthFilter: string | null = null;
  constructor(private elementRef: ElementRef,private dateSharingService: DateSharingService) { }

  ngOnInit(): void {
    this.createDonutChart();
    this.subscription = this.dateSharingService.monthFilter$.subscribe(month => {
      this.monthFilter = month;
      this.updateDonutChart();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  createDonutChart() {
    const data = [
      { label: 'Referral', value: 30 },
      { label: 'Direct', value: 40 },
      { label: 'Organic', value: 30 }
    ];

    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(this.elementRef.nativeElement).append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block')
      .style('margin', 'auto')
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(['rgba(117,178,101,1)', 'rgba(112,153,209,1)', 'rgba(255,195,73,1)']); // Custom colors

    const pie = d3.pie<any>()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(radius - 70)
      .outerRadius(radius - 10);

    const arcs = svg.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', <any>arc)
      .attr('fill', d => <any>color(d.data.label));

    const outerArc = d3.arc()
      .innerRadius(radius - 20)
      .outerRadius(radius);

    arcs.append('text')
      .attr('transform', d => {
        const pos = outerArc.centroid(<any>d);
        const midAngle = Math.atan2(pos[1], pos[0]);
        const x = Math.cos(midAngle) * (radius + 20); // Move the label further away
        const y = Math.sin(midAngle) * (radius + 1); // Move the label further away
        return 'translate(' + x + ',' + y + ')';
      })
      .attr('text-anchor', d => {
        return (d.startAngle + d.endAngle) / 2 > Math.PI ? 'end' : 'start';
      })
      .text(d => d.data.label);

  }
  updateDonutChart(){

  }
}
