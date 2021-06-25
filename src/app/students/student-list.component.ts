import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  pageTitle = 'Student List';
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredStudents = this.performFilter(value);
  }

  filteredStudents: IStudent[] = [];
  students: IStudent[] = [];

  constructor(private studentService: StudentService) {}

  performFilter(filterBy: string): IStudent[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.students.filter((student: IStudent) =>
      student.user_name.toLocaleLowerCase().includes(filterBy));
  }


  ngOnInit(): void {
    this.sub = this.studentService.getStudents().subscribe({
      next: students => {
        var d : any
        for(let key in students){
          d = students[key]
       }
        this.students = d;
        this.filteredStudents = this.students;
      },
      error: err  => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
