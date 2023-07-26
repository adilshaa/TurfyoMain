import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DiningServicesService } from 'projects/dining-app/src/app/core/services/dining-services.service';

@Component({
  selector: 'app-dining-notify',
  templateUrl: './dining-notify.component.html',
  styleUrls: ['./dining-notify.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class DiningNotifyComponent implements OnInit {
  notifications: string[] = [];

  constructor(private tostr:ToastrService) {}

  ngOnInit(): void {}

  addNotification() {
    this.tostr.info('Foods is updated 🍔');
    // this.audio();
  }
  normalNotification(tosterMsg:string) {
    this.tostr.warning(tosterMsg)
  }

  clearNotifications() {
    setTimeout(() => {
      this.tostr.clear();
    }, 2000);
  }
  
}
