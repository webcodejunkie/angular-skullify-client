import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ProfileViewComponent } from '../profile-view/profile-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { FavoritedMoviesViewComponent } from '../favorited-movies-view/favorited-movies-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  username = localStorage.getItem('user') || '';
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { dialog.afterAllClosed.subscribe(() => this.ngOnInit()) }

  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
    this.isFav;
  }
  // function to logg the user out and return them to the welcome screen
  onLogOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
  // function to get an instance of the users favorites to populate the favorites array
  getFavMovies(): void {
    this.fetchApiData.getUser(this.username).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.getFavMovies;
    });
  }
  // funcion to fetch an API call and then take that and add the containing response to the array (movies)
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((responce: any) => {
      this.movies = responce;
      return this.getMovies;
    });
  }
  // API function call to add to the favorites array
  addMovieToFavorites(movieID: string, title: string): void {
    this.fetchApiData.addFavoriteMovie(this.username, movieID).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites)
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK',
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Couldn't add ${title} to favorites. Please try again`, 'OK',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }
  // function to delete using an API call then updating the favorites array
  deleteMovieFromFavorites(movieID: string, title: string): void {
    this.fetchApiData.removeFavoriteMovie(this.username, movieID).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      this.snackBar.open(`${title} has been removed from your favorites!`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Couldn't unfavorite ${title}. Please try again`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }
  /*
  function to take the movieId string and compare whether or not it is included in the favorites array and depending on that,
  either delete or add to the favorites array
  */
  toggleFav(movieId: string, title: string): void {
    let movieIds = this.favorites.map(favorite => { return favorite });
    if (movieIds.includes(movieId)) {
      this.deleteMovieFromFavorites(movieId, title);
    } else {
      this.addMovieToFavorites(movieId, title);
    }
  }

  // function to change the color of the heart icon depending on if it was added to the favorites array
  isFav(movieId: string): any {
    let movieIds = this.favorites.map(favorite => { return favorite });
    return movieIds.includes(movieId) ? 'warn' : 'primary';
  }

  openFavoritesViewDialog(): void {
    this.dialog.open(FavoritedMoviesViewComponent, {
      width: '100%',
    })
  }

  // dialog to open a modal of the single movieView taking parameters to pass information on the movie array
  openMovieViewDialog(
    title: string,
    description: string,
    featured: boolean,
    imagepath: string,
  ): void {
    this.dialog.open(MovieViewComponent, {
      data: {
        title: title,
        description: description,
        featured: featured,
        imagepath: imagepath
      },
      width: '80%'
    });
  }
  // dialog to open a modal of the directorView taking parameters to pass information on the movie array
  openDirectorViewDialog(
    name: string,
    bio: string,
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        name: name,
        bio: bio,
      },
      width: '50%'
    });
  }

  // dialog to open a modal of the genreView taking parameters to pass information on the movie array
  openGenreViewDialog(
    title: string,
    description: string,
  ): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        title: title,
        description: description,
      },
      width: '50%'
    });
  }
  // dialog to pop up a modal of the profile view for the user to interact with
  openProfileViewDialog(): void {
    this.dialog.open(ProfileViewComponent, {
      width: '100%',
    });
  }
}
