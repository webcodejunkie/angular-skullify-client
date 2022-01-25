import { Component, OnInit, Input } from '@angular/core';
// This import will be to close the dialog on success 
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls 
import { FetchApiDataService } from '../fetch-api-data.service';
//This import is to display notifications back to the user 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * Take the input using two-way databinding that will be used to login user
   * @param {string} Username - Input for Username
   * @param {string} Password - Input for Password
   */
  @Input() userData = { Username: '', Password: '', };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * @param {object} userData - the object with pertaining data (Username, Password)
   * @returns Token
   * After userData is passed, API will send back a token and we can set token to localStorage
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);
      this.snackBar.open(`Nice to see you, ${this.userData.Username}!`, 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']); // Navigate from [/welcome] to [/movies] using Router
    }, (response) => {
      this.snackBar.open('User Login failed', 'OK', {
        duration: 2000,
      });
    });
  }

}
