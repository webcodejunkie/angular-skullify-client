import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorited-movies-view',
  templateUrl: './favorited-movies-view.component.html',
  styleUrls: ['./favorited-movies-view.component.scss']
})
export class FavoritedMoviesViewComponent implements OnInit {

  username = localStorage.getItem('user');
  favorites: any[] = [];
  movies: any[] = [];
  active: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getFavoriteMovies();
    this.getMovies();
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((responce: any) => {
      this.filterMovies(responce);
    });
  }

  filterMovies(res: any): void {
    res.forEach((movie: any) => {
      if (this.favorites.includes(movie._id)) {
        this.active.push(movie);
      }
    });
    console.log(this.active);
  }

  deleteMovieFromFavorites(movieID: string, title: string): void {
    this.fetchApiData.removeFavoriteMovie(this.username, movieID).subscribe((res: any) => {
      const index = this.active.indexOf(movieID);
      this.active.splice(index);
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
