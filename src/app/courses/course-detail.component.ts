import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {IAssignment} from '../assignments/assignment'
import { ICourse } from './course';
import { CourseService } from './course.service';
import { AssignmentService } from '../assignments/assignment.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  pageTitle = 'course detail';
  errorMessage = '';
  course: ICourse | undefined;
  assignments: IAssignment[] | undefined;
  sub!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private courseService: CourseService,
              private assignmentService: AssignmentService,
              ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("got id")
    if (id) {
      this.getCourse(id);
    }
    this.sub = this.assignmentService.getAssignments().subscribe({
      next: assignments => {
        this.assignments = assignments;
      },
      error: err  => this.errorMessage = err
    });
  }

  getCourse(id: number): void {
    console.log("getting course")
    this.courseService.getCourse(id).subscribe({
      next: course => this.course = course,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/courses']);
  }
}
