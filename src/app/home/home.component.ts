import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  covidGlobalData;
  allCountryData;

  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartColors: Colors[] = [];

  constructor(private http: HttpClient) { }

  displayedColumns: string[] = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical', 'casesPerOneMillion', 'deathsPerOneMillion'];

  // displayedColumns: string[] = ['title', 'total_cases', 'total_recovered', 'total_deaths', 'total_new_cases_today', 'total_new_deaths_today', 'total_active_cases', 'total_serious_cases'];
  dataSource: any;

  ngOnInit() {

    // this.http.get('https://thevirustracker.com/free-api?global=stats').subscribe(
    this.http.get('https://corona.lmao.ninja/all').subscribe(
      (res) => {
        if (res) {
          // console.log(res);
          // this.covidGlobalData = res['results'][0];
          this.covidGlobalData = res;
          this.doughnutChartLabels = ['Total Cases', 'Total Recovered', 'Total Active', 'Total Deaths'];
          this.doughnutChartData = [res['cases'], res['recovered'], res['active'], res['deaths']];
          this.doughnutChartColors = [{ backgroundColor: ["#0101DF", "#04B404", '#FE2E2E', '#A4A4A4'] }];
        }
      }
    );

    // this.http.get('https://thevirustracker.com/free-api?countryTotals=ALL').subscribe(
    // this.http.get('https://corona.lmao.ninja/countries?sort={cases}').subscribe(
    this.http.get('https://corona.lmao.ninja/countries').subscribe(
      (res) => {
        if (res) {
          // console.log(res['countryitems']);
          // console.log(res)
          // this.allCountryData = Object.values(res['countryitems'][0]);
          // console.log(this.allCountryData)
          // this.allCountryData.forEach((element, index) => {
          //   console.log('ele ', element[index + 1]);
          // });
          this.allCountryData = res;
          this.allCountryData.sort((a, b) => {
            return b.cases - a.cases
          });
          this.dataSource = this.allCountryData;
        }
      }
    );


  }

}

