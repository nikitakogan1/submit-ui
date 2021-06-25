import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IStudent } from './student';
import { StudentService } from './student.service';

@Component({
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  pageTitle = 'student detail';
  errorMessage = '';
  student: IStudent | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentService) {
  }

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getStudent(id);
    }
  }

  getStudent(id: string): void {
    this.studentService.getStudent(id).subscribe({
      next: student => this.student = student,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/students']);
  }
}
