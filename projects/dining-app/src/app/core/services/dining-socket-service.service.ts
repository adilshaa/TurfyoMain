import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class DiningSocketServiceService {
  private socket!: Socket;
  private resId = localStorage.getItem('resId');
  constructor() {
    this.socket = io('https://oxres.site');
  }
  listen(eventName: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }
  emit(eventname: string, data: any): void {
    let datas = {
      data: data,
      resId:this.resId
    }
    this.socket.emit(eventname, datas);
  }
}
