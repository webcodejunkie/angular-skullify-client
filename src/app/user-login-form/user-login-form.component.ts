import { Component, OnInit, Input } from '@angular/core';
// This import will be to close the dialog on success 
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls 
import { FetchApiDataService } from '../fetch-api-data.service';
//This import is to display notifications back to the user 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.snackBar.open(`Thanks for coming back, ${this.userData.Username}!`, 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    });
  }

}
