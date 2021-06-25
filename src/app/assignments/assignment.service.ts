import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IAssignment } from './assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private assignmentsURl = 'api/products/assignments.json';

  constructor(private http: HttpClient) { }

  getAssignments(): Observable<IAssignment[]> {
    return this.http.get<IAssignment[]>(this.assignmentsURl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  getAssignment(id: number): Observable<IAssignment | undefined> {
    return this.getAssignments()
      .pipe(
        map((assignments: IAssignment[]) => assignments.find(p => p.assignmentId === id))
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
