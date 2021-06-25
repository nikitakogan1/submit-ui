import { NgModule } from '@angular/core';
import { AssignmentListComponent } from './assignment-list.component';
import { AssignmentDetailComponent } from './assignment-detail.component';
import { RouterModule } from '@angular/router';
import { AssignmentDetailGuard } from './assignment-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AssignmentListComponent,
    AssignmentDetailComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'assignments', component: AssignmentListComponent },
      {
        path: 'courses/:something/assignments/:id',
        canActivate: [AssignmentDetailGuard],
        component: AssignmentDetailComponent
      }
    ]),
    SharedModule,
  ]
})
export class AssignmentModule { }
