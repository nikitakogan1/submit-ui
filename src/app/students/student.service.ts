import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IStudent } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
   //private studentUrl = 'api/products/products.json';
  private studentUrl = 'http://localhost:4200/back_end_users/';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<IStudent[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin')
      })
    };
    return this.http.get<IStudent[]>(this.studentUrl, httpOptions)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  parse(students: IStudent[]): IStudent[] {
    var d : any
    for(let key in students){
      d = students[key]
   }
    return d
  }

  // Get one product
  // Since we are working with a json file, we can only retrieve all products
  // So retrieve all products and then find the one we want using 'map'
  getStudent(id: string): Observable<IStudent | undefined> {
    return this.getStudents()
      .pipe(
        map((students: IStudent[]) => this.parse(students).find(p => p.user_name === id))
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
