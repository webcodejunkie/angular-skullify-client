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

  /**
   * 
   * @param userDetails 
   * @returns 
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'register', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param userDetails 
   * @returns 
   */
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
  /**
   * 
   * @param {any} username 
   * @returns 
   */
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

  /**
   * 
   * @param username 
   * @param userDetails 
   * @returns 
   */
  editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param username 
   * @returns 
   */
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + 'users/' + username,
      /**
       * Because this request returns a text response rather than a JSON object, the response type
       * must be specified in the request.
       */
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }), responseType: 'text' }
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * 
   * @returns {object} - movies
   */
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

  /**
   * 
   * @param title 
   * @returns 
   */
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

  /**
   * 
   * @param username 
   * @param movieID 
   * @returns 
   */
  addFavoriteMovie(username: string, movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param username 
   * @param movieID 
   * @returns 
   */
  removeFavoriteMovie(username: any, movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param director 
   * @returns 
   */
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
  /**
   * 
   * @param genre 
   * @returns 
   */
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