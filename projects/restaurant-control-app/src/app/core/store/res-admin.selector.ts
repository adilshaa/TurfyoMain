import { createSelector } from '@ngrx/store';

import { staffsStructure } from '../models/staffs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { foodsStructure } from 'projects/dining-app/src/app/core/models/foods';
import { StaffsState } from './res-admin.state';
export const StaffsRootsSelector = (state: StaffsState) => state.staffsData;

export const staffsDatas = createSelector(
  StaffsRootsSelector,
  (staffsDatas: staffsStructure[]) => {
    console.log(staffsDatas);

    return [...staffsDatas];
  }
);

