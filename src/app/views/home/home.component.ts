import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable, startWith, take} from 'rxjs';
import { FieldDataType, ResultRow } from 'src/app/models/models';
import { ApiService } from 'src/app/services/api/api.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private apiService: ApiService) {}
  apiResponse$!: Observable<FieldDataType[]>;
  sidebarExpanded = false;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | number | string[]> =
    {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

  ngOnInit(): void {
    this.apiResponse$ = this.apiService.getSchema().pipe(
      take(1),
      startWith([]),
      map((res) => res.fields)
    );
  }

  sidebarOnExpand(isExpanded: boolean) {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  sidebarOnFields(fields: string[]) {
    //TODO interceptors to show api messages
    if (fields.length > 0) {
      this.apiService
        .getAggregate({ fields: fields, method: 'count' })
        .pipe(take(1))
        .subscribe((res: ResultRow[][]) => {
          this.pieChartData.labels = [];
          this.pieChartData.datasets[0].data = [];
          res[0].forEach((row) => {
            this.pieChartData.labels?.push(Object.values(row.fieldValues)[0]);
            this.pieChartData.datasets[0].data?.push(row.aggregateValue);
          });
          this.chart?.update();
        });
    }
  }
}
