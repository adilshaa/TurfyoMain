import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResturantControlServiceService } from '../../../core/services/resturant-control-service.service';
import { SocketResAdminServiceService } from '../../../core/services/socket-res-admin-service.service';
import {
  fadeInAnimation,
  fadeOutAnimation,
} from '../../../shared/animations/browserAnimations';
import { NotificationsComponent } from '../../../shared/components/notifications/notifications.component';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  animations: [fadeOutAnimation, fadeInAnimation],
})
export class TableViewComponent implements OnInit {
  tables: any[] = [];
  selectTableindex: number = -1;
  selectTablestatus: boolean = false;
  isPopupVisible = false;
  confirmedAction: boolean | null = null;
  Orders: any[] = [];
  currentOrder!: any;
  allFoods: any[] = [];
  total_amount!: number;
  total_Foods_Count!: number;
  CloseDiv: boolean = true;
  openDIv: boolean = true;
  openState: string = 'hidden';
  closeState: string = 'visible';
  constructor(
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _route: ActivatedRoute,
    private resService: ResturantControlServiceService,
    private _resSocketService: SocketResAdminServiceService,
    private _notifications: NotificationsComponent
  ) {}
  ngOnInit(): void {
    this.takeOrders();
    this.resService.loadTables().subscribe(
      (res: any) => {
        this.tables = res;
       
      },
      (err) => console.log(err)
    );
  }
  createTable() {
    this.resService.createTable().subscribe((res: any) => {
      this.tables = res.tables;
    });
  }
  takeOrders() {
    this._resSocketService.emit('loadOrdersToPOS', {});
    this._resSocketService.listen('listOrdersToPOS').subscribe((res) => {
      this.Orders = res;
    });
  }
  updateTables() {
    this._resSocketService.listen('updatedTables').subscribe((res) => {
      this.tables = res;
    });
  }

  selectingTable(index: number, status: boolean) {
    this.selectTableindex = index;
  }
  unselectTable() {
    this.selectTableindex = -1;

  }
  deleteTable(id: string) {
    
    let findTable = this.tables.find((items) => items._id == id);
    if (findTable.table_status == true) {
      this._notifications.normalWarninigNotification(
        'This table still reserved'
      );
    } else {
      this.resService.delteTable(id).subscribe((res: any) => {
        if (res.message == true) {
          this.tables = res.tables;
          this.selectTableindex = -1;
        }
      });
    }
  }

  takeCurrentOrder(id: string) {
    let existingOrder = this.Orders.find((items) => items.tableId._id == id);

    if (existingOrder) {
      this.openDiv();
      this.currentOrder = existingOrder;
      this.allFoods = existingOrder.foods;
      this.total_Foods_Count = existingOrder.foods.length;
      this.total_amount = existingOrder.total_price;
    } else {
      this.closeDiv();
    }
  }
  confirmAction(confirmed: boolean) {
    this.confirmedAction = confirmed;
    this.isPopupVisible = false;
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (
      clickedElement.classList.contains('cd-popup-close') ||
      clickedElement.classList.contains('cd-popup')
    ) {
      this.isPopupVisible = false;
      this.confirmedAction = null; // Reset the confirmed action
    }
  }
  closeDiv() {
    this.closeState = 'hidden';
    this.openState = 'hidden';
    setTimeout(() => {
      this.CloseDiv = true;
      this.openDIv = false;
    }, 300);
  }
  openDiv() {
    this.closeState = 'visible';

    this.openState = 'visible';
    setTimeout(() => {
      this.openDIv = true;
      this.CloseDiv = false;
    }, 300);
  }
}
