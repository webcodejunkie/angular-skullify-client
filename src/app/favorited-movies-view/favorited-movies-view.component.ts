import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorited-movies-view',
  templateUrl: './favorited-movies-view.component.html',
  styleUrls: ['./favorited-movies-view.component.scss']
})
export class FavoritedMoviesViewComponent implements OnInit {

  username = localStorage.getItem('user'); // set the localStorage of user to username variable
  /**
   * The favorites array will be used at the start of the components lifecycle, a function getFavoriteMovies will be used to store
   * information that already exists to prevent duplication
   */
  favorites: any[] = [];
  /**
   * movies array set to a function getMovies which will hold all the movies that exist in the DB
   */
  movies: any[] = [];
  /**
   * active array which will be used to capture currently favorited movies and will be used to manipulate
   */
  active: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  // get already favorited movies from the user and sync up what they have already liked
  getFavoriteMovies(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies
    });
  }

  // get movies but use the filterMovies and use the response
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((responce: any) => {
      this.filterMovies(responce);
    });
  }
  /**
   * this function is in conjunction with getMovies, using it as a filter for the response. 
   * It will run a forEach method and if the favorites that we pushed into an array match the id. 
   * Then we will push a movie into a new array called active
   * @returns {Array}
   */
  filterMovies(res: any): void {
    res.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.active.push(movie);
        const index = this.active.indexOf(movie);
        console.log(index)
      }
    });
    console.log(this.active);
  }

  /**
   * This method will delete a movie off a FavoriteMovies array through the API but also slice that very same movie off the active array
   * @param {string} movieID 
   * @param {string} title 
   * @param {any} movie 
   */
  deleteMovieFromFavorites(movieID: string, title: string, movie: any): void {
    this.fetchApiData.removeFavoriteMovie(this.username, movieID).subscribe((res: any) => {
      // find the index of the array, so we can use to splice
      const index = this.active.indexOf(movie); // find the index of the movie that will help with deleteing chosen movie
      if (index > -1) {
        this.active.splice(index, 1);
      }
      console.log(index)
      console.log(this.active);
      this.snackBar.open(`${title} has been removed from your favourites!`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Couldn't unfavorite ${title}. Please try again`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }


}
