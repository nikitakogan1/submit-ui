import { NgModule } from '@angular/core';
import { StudentListComponent } from './student-list.component';
import { StudentDetailComponent } from './student-detail.component';
import { RouterModule } from '@angular/router';
import { StudentDetailGuard } from './student-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'students', component: StudentListComponent },
      {
        path: 'students/:id',
        canActivate: [StudentDetailGuard],
        component: StudentDetailComponent
      }
    ]),
    SharedModule
  ]
})
export class StudentModule { }
