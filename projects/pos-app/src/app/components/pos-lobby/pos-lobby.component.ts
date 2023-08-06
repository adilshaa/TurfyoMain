import { Component, OnInit } from '@angular/core';
import { PosServiceService } from '../../core/services/pos-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pos-lobby',
  templateUrl: './pos-lobby.component.html',
  styleUrls: ['./pos-lobby.component.css'],
})
export class PosLobbyComponent implements OnInit {
  constructor(
    private _PosService: PosServiceService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.verifyStaff();
  }
  verifyStaff() {
    this._PosService.verifyStaff().subscribe(
      (res) => {},
      (err) => {
        console.log(err);
        
        localStorage.removeItem('token');
        this._router.navigate(['/poslogin']);
      }
    );
  }
}
