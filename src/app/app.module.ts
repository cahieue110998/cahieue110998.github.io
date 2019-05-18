import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CourseService } from './services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';

const appRouter:Routes=[
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'courses',
		component: CoursesComponent,
		children:[
			{
				path: '',
				component: CourseListComponent
			},
			{
				path:':id/edit',
				component: CourseEditComponent
			},
			{
				path: 'add',
				component: CourseAddComponent
			}
		]
	}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoursesComponent,
    CourseListComponent,
    CourseAddComponent,
    CourseEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRouter)
  ],
  providers: [
  	CourseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
