import { Component, Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-kitchen-notify',
  templateUrl: './kitchen-notify.component.html',
  styleUrls: ['./kitchen-notify.component.css'],
})
@Injectable({
  providedIn: 'root',
})
export class KitchenNotifyComponent implements OnInit {
  constructor(private tostr: ToastrService) {}
  ngOnInit(): void {}
  NewOrderNotify(tosterMsg: string) {
    this.audio();
    this.tostr.warning(tosterMsg, 'New Order', {
      timeOut: 1500,
      progressBar: true,
      positionClass: 'toast-top-right', // Change this to 'toast-top-left'
      tapToDismiss: false,
    });
  }
  handleNewOrderNotification( notifyMsg:string) {
    if (Notification.permission === 'granted') {
      new Notification('New Order', {
        body: notifyMsg,
        icon: '../../../../assets/images/20230617_002438.png',
        badge: '../../../../assets/images/20230617_002438.png',
        image: '../../../../assets/images/order_notify_imge.jpeg',
        vibrate: [200, 100, 200],
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('New Order');
        }
      });
    }
  }
  
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
  audio() {
    const audio = new Audio();
    audio.src = '/../../../../assets/audios/mixkit-alert-quick-chime-766.wav';
    audio.load();
    audio.play();
  }
  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }

  showNotification(title: string, options?: NotificationOptions) {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(title, options);
    }
  }
}
