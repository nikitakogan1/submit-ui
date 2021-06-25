import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IAssignment } from './assignment';
import { AssignmentService } from './assignment.service';

@Component({
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  pageTitle = 'assignment details';
  errorMessage = '';
  assignment: IAssignment | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private assignmentService: AssignmentService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getAssignment(id);
    }
  }

  getAssignment(id: number): void {
    this.assignmentService.getAssignment(id).subscribe({
      next: assignment => this.assignment = assignment,
      error: err => this.errorMessage = err
    });
  }


//TODO: back button.
  onBack(): void {
    this.router.navigate(['/assignments']);
  }

  testOnClick(): void {
    this.pageTitle = "testOnClick pressed"
  }

  submitOnClick(): void {
    this.pageTitle = "submitOnClick pressed"
  }

}

