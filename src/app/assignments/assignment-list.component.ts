import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAssignment } from './assignment';
import { AssignmentService } from './assignment.service';

@Component({
  templateUrl: './assignemnt-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit, OnDestroy {
  pageTitle = 'Assignment List';
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredAssignments = this.performFilter(value);
  }

  filteredAssignments: IAssignment[] = [];
  assignments: IAssignment[] = [];

  constructor(private assignmentService: AssignmentService) {}

  performFilter(filterBy: string): IAssignment[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.assignments.filter((assignment: IAssignment) =>
      assignment.assignmentName.toLocaleLowerCase().includes(filterBy));
  }


  ngOnInit(): void {
    this.sub = this.assignmentService.getAssignments().subscribe({
      next: assignments => {
        this.assignments = assignments;
        this.filteredAssignments = this.assignments;
      },
      error: err  => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Assignment List: ' + message;
  }
}
