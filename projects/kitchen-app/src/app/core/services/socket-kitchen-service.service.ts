import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketKitchenServiceService {
  private socket: Socket;
  private resId=localStorage.getItem('resId')
  constructor() {
    this.socket = io('http://localhost:5000');
  }
 

  listen(eventName: string): Observable<any> {
    return new Observable((obsverver) => {
      this.socket.on(eventName, (data:any) => {
        obsverver.next(data);
      });
    });
  }
  emit(eventName:string, data:any):void {
    let datas = {
      data: data,
      resId:this.resId
    }
    this.socket.emit(eventName,datas)
  }
}
