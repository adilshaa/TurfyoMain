import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class PosSocketServiceService {
  private socket!: Socket;
  private resId = localStorage.getItem('resId');

  constructor() {
    this.socket = io('http://localhost:5000');
  }
  listen(eventName: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
    });
  }
  emit(eventname: string, Data: any) {
    const datas = {
      data: Data,
      resId: this.resId,
    };
    this.socket.emit(eventname, datas);
  }
}
