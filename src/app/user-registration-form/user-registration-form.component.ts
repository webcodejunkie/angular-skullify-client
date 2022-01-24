// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// This import will be to close the dialog on success 
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls 
import { FetchApiDataService } from '../fetch-api-data.service';
//This import is to display notifications back to the user 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  // this is the function responsible for sending the form inputs to the backend 
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // logic for a successful user registration goes here!
      this.dialogRef.close(); // the modal to be closed on success
      this.loginUser(this.userData.Username, this.userData.Password);
      this.snackBar.open(`Welcome ${this.userData.Username}`, 'OK', {
        duration: 3000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 3000,
      });
    });
  }

  loginUser(username: string, password: string): void {
    let userObject = { Username: username, Password: password }
    this.fetchApiData.userLogin(userObject).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);
      this.snackBar.open(`Thanks for coming back, ${this.userData.Username}!`, 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open('User Login failed', 'OK', {
        duration: 2000,
      });
    });
  }

}
