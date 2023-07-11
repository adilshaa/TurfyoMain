import { Injectable } from '@angular/core';
import { ResturantControlServiceService } from '../services/resturant-control-service.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, of, switchMap } from 'rxjs';
import { staffsStructure } from '../models/staffs';
import {
  fetchStaffsData,
  reciveStaffsData,
} from './res-admin.actions';
import { foodsStructure } from 'projects/dining-app/src/app/core/models/foods';

@Injectable()
export class Saffseffect {
  constructor(
    private actions$: Actions,
    private resService: ResturantControlServiceService
  ) {}

  projectAllStaffs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchStaffsData),
      switchMap(() => {
        return this.resService.fetcheStaffData().pipe(
          map((data) =>
            reciveStaffsData({
              staffsData: data as staffsStructure[],
            })
          )
        );
      })
    )
  );

}
