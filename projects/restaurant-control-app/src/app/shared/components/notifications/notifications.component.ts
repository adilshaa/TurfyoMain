import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
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
