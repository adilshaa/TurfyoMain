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

  constructor(private tostr: ToastrService) {}

  ngOnInit(): void {}

  addNotification() {
    this.tostr.info('Foods is updated 🍔');
    // this.audio();
  }
  normalNotification(tosterMsg: string) {
    this.tostr.warning(tosterMsg, 'Alert', {
      timeOut: 1500,
      progressBar: true,
      positionClass: 'toast-top-center',
      tapToDismiss: false,
    });
  }
  normalErrorNotify(tosterMsg: any) {
    this.tostr.error(tosterMsg, 'Alert', {
      timeOut: 1500,
      progressBar: true,
      positionClass: 'toast-top-center',
      tapToDismiss: false,
    });
  }
  audio() {
    const audio = new Audio();
    audio.src = '/../../../../assets/audios/mixkit-alert-quick-chime-766.wav';
    audio.load();
    audio.play();
  }
  clearNotifications() {
    setTimeout(() => {
      this.tostr.clear();
    }, 2000);
  }
}
