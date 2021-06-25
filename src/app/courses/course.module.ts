import { NgModule } from '@angular/core';
import { CourseListComponent } from './course-list.component';
import { CourseDetailComponent } from './course-detail.component';
import { RouterModule } from '@angular/router';
import { CourseDetailGuard } from './course-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: 'courses', component: CourseListComponent },
      {
        path: 'courses/:id',
        canActivate: [CourseDetailGuard],
        component: CourseDetailComponent
      }
    ]),
    SharedModule,
  ]
})
export class CourseModule { }
