import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ICourse } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseURl = 'http://localhost:4200/back_end_courses/';
  //private courseURl = 'api/products/courses.json'
  
  constructor(private http: HttpClient) { }

  getCourses(): Observable<ICourse[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin'),
      })
    };
    return this.http.get<ICourse[]>(this.courseURl, httpOptions)
      .pipe(
        tap(data => {
          for(let key in data){
            var d
            d = JSON.stringify(data[key])
            return console.log(d)
         }
        }
        ),
        catchError(this.handleError)
      );
  }

  parse(courses: ICourse[]): ICourse[] {
    var d : any
    for(let key in courses){
      d = courses[key]
   }
    return d
  }

  getCourse(id: number): Observable<ICourse | undefined> {
    console.log("getting course from service")
    return this.getCourses()
      .pipe(
        map((courses: ICourse[]) => this.parse(courses).find(p => p.number === id))
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
