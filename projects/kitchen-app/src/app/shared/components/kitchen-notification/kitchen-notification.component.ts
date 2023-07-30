import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kitchen-notification',
  templateUrl: './kitchen-notification.component.html',
  styleUrls: ['./kitchen-notification.component.css'],
})
export class KitchenNotificationComponent implements OnInit {
  constructor(private tostr: ToastrService) {}
  ngOnInit(): void {}
  normalErrorNotification(err: string) {
    this.tostr.error(err, 'Error', {
      timeOut: 1500,
      progressBar: true,
      positionClass: 'toast-top-center',
      tapToDismiss: false,
    });
  }
  normalWarninigNotification(err: string) {
    this.tostr.warning(err, 'Warninig', {
      timeOut: 1500,
      progressBar: true,
      positionClass: 'toast-top-center',
      tapToDismiss: false,
    });
  }
}
