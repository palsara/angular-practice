import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmComponent } from '../page/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openConfirmDialog() {
    return this.dialog.open(ConfirmComponent, {
      width: '35vw',
      height: '51vh',
      disableClose: true
    });
  }
}
