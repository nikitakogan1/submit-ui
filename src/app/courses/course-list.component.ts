import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICourse } from './course';
import { CourseService } from './course.service';

@Component({
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  pageTitle = 'Course List';
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCourses = this.performFilter(value);
  }

  filteredCourses: ICourse[] = [];
  courses: ICourse[] = [];

  constructor(private courseService: CourseService) {}

  performFilter(filterBy: string): ICourse[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.courses.filter((course: ICourse) =>
      course.name.toLocaleLowerCase().includes(filterBy));
  }


  ngOnInit(): void {
    this.sub = this.courseService.getCourses().subscribe({
      next: courses => {
        var d : any
        for(let key in courses){
          d = courses[key]
       }
        this.courses = d;
        this.filteredCourses = this.courses;
      },
      error: err  => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Courses List: ' + message;
  }
}
