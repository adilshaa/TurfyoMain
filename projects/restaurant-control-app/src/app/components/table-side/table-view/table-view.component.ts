import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
})
export class TableViewComponent implements OnInit {
  tables: any;
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private resService: ResturantControlServiceService
  ) {}
  ngOnInit(): void {
    this.resService.loadTables().subscribe(
      (res: any) => {
        this.tables = res;
        console.log(res);
        
      },
      (err) => console.log(err)
    );
  }
  createTable() {
    this.resService.createTable().subscribe((res) => {
       const currentRoute = this.route.snapshot.routeConfig?.path;
       this.router
         .navigateByUrl('/', { skipLocationChange: true })
         .then(() => {
           this.router.navigate([currentRoute]);
         });
    })
   
  }
}
