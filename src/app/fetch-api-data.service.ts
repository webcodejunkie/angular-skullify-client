import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://skullify.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call to login
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'login', userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }
  // API call to get user information
  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // API call to edit user
  editUser(userDetails: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username + userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // API call to delete user
  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // API to get full list of movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  // API call to get a single movie
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // API call to favorite a single movie and add it to users favorited array
  addFavoriteMovie(movieId: any): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // API call to remove favorited movie from user array
  removeFavoriteMovie(movieId: any): Observable<any> {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + movieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // API call to get director details from movie
  getDirector(director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + director, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // API call to get genre about movie
  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + genre, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // extract a response and return either the response or an empty body
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
  // error handler for our API calls
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => ('Something bad happend; please try again later.'));
  }
}