import { Component, OnInit } from '@angular/core';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
})
export class TableViewComponent implements OnInit {
  tables:any
  constructor(private dinigService:DiningServicesService) {}
  ngOnInit(): void {
    this.dinigService.leadTables()
  }
}
