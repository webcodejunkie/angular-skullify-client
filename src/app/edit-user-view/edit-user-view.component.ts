import { Component, OnInit, Input } from '@angular/core';
// This import will be to close the dialog on success 
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls 
import { FetchApiDataService } from '../fetch-api-data.service';
//This import is to display notifications back to the user 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-view',
  templateUrl: './edit-user-view.component.html',
  styleUrls: ['./edit-user-view.component.scss']
})
export class EditUserViewComponent implements OnInit {
  /**
   * initalize this component with a user which is connected to an object
   */
  user: any = {};
  username = localStorage.getItem('user'); // set localStorage on variable username

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '', }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserViewComponent>,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * @method editUser
   * @param {string} username - Username of the User
   * @param {object} userData - an object containing modified user details
   * @returns {object} - The edited user
   */

  editUser(): void {
    this.fetchApiData.editUser(this.username!, this.userData).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('user', this.userData.Username);
      this.snackBar.open('Congrats! you updated your user', 'OK', {
        duration: 2000
      }); setTimeout(this.redirectToMovies);
    }, (res) => {
      this.snackBar.open('Update Failed', 'Try again', {
        duration: 2000,
      })
    })
  }

  /**
 * @method deletedUser
 * @param {string} username - Username of the User
 * @returns {response} - The user is deleted
 */

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.username!).subscribe((res) => {
      localStorage.clear();
      this.dialogRef.close();
      this.snackBar.open('Sorry to see you go..', 'Bye', {
        duration: 2000
      });
      this.router.navigate(['welcome']);
    }, (res) => {
      this.snackBar.open('Deletion Failed', 'Try again', {
        duration: 2000,
      })
    })
  }

  redirectToMovies(): void {
    window.open('/movies', '_self');
  }

}
