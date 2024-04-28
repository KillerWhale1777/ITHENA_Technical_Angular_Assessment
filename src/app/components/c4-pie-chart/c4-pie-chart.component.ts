import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { DateSharingService } from '../../services/date-sharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-c4-pie-chart',
  templateUrl: './c4-pie-chart.component.html',
  styleUrls: ['./c4-pie-chart.component.scss']
})
export class C4PieChartComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  monthFilter: string | null = null;
  private svg: any;
  private chartCreated: boolean = false;

  constructor(private elementRef: ElementRef, private dateSharingService: DateSharingService) { }

  ngOnInit(): void {
    this.subscription = this.dateSharingService.monthFilter$.subscribe(month => {
      this.monthFilter = month;
      if (this.chartCreated) {
        this.updateDonutChart();
      } else {
        this.createDonutChart();
        this.chartCreated = true;
      }
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

    this.svg = d3.select(this.elementRef.nativeElement).append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('display', 'block')
      .style('margin', 'auto')
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(['rgba(117,178,101,1)', 'rgba(112,153,209,1)', 'rgba(255,195,73,1)']);

    const pie = d3.pie<any>()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(radius - 70)
      .outerRadius(radius - 10);

    const arcs = this.svg.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => color(d.data.label));

    const outerArc = d3.arc()
      .innerRadius(radius - 20)
      .outerRadius(radius);

    arcs.append('text')
      .attr('transform', (d: any) => {
        const pos = outerArc.centroid(d);
        const midAngle = Math.atan2(pos[1], pos[0]);
        const x = Math.cos(midAngle) * (radius + 20);
        const y = Math.sin(midAngle) * (radius + 1);
        return 'translate(' + x + ',' + y + ')';
      })
      .attr('text-anchor', (d: any) => (d.startAngle + d.endAngle) / 2 > Math.PI ? 'end' : 'start')
      .text((d: any) => d.data.label);
  }

  updateDonutChart() {
    const month = this.monthFilter || 'Default';
    const data = this.generateRandomData(month);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(['rgba(117,178,101,1)', 'rgba(112,153,209,1)', 'rgba(255,195,73,1)']);

    const pie = d3.pie<any>()
      .sort(null)
      .value(d => d.value);

    const arc = d3.arc()
      .innerRadius(50)
      .outerRadius(150);

    const arcs = this.svg.selectAll('.arc')
      .data(pie(data));

    arcs.exit().remove();

    const newArcs = arcs.enter().append('g')
      .attr('class', 'arc');

    newArcs.append('path')
      .merge(arcs.select('path'))
      .attr('d', arc)
      .attr('fill', (d: any) => color(d.data.label));

    newArcs.append('text')
      .merge(arcs.select('text'))
      .attr('transform', (d: any) => {
        const pos = arc.centroid(d);
        const midAngle = Math.atan2(pos[1], pos[0]);
        const x = Math.cos(midAngle) * (150 + 20);
        const y = Math.sin(midAngle) * (150 + 1);
        return 'translate(' + x + ',' + y + ')';
      })
      .attr('text-anchor', (d: any) => (d.startAngle + d.endAngle) / 2 > Math.PI ? 'end' : 'start')
      .style('font-size', '10px')
      .text((d: any) => d.data.label);
  }

  generateRandomData(month: string): { label: string, value: number }[] {
    return [
      { label: 'Referral', value: Math.floor(Math.random() * 100) },
      { label: 'Direct', value: Math.floor(Math.random() * 100) },
      { label: 'Organic', value: Math.floor(Math.random() * 100) }
    ];
  }
}
