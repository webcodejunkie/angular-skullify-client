import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditUserViewComponent } from '../edit-user-view/edit-user-view.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  username = localStorage.getItem('user');
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.fetchApiData.getUser(this.username!).subscribe((response: any) => {
      this.user = response;
      console.log(response);
    });
  }

  openEditUserDialog(): void {
    this.dialog.open(EditUserViewComponent, {
      width: '100%',
    });
  }

}
