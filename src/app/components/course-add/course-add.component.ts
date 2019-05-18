import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit, OnDestroy {
	
	public course:Course;
	public subcription:Subscription;

  constructor(
  	public courseService:CourseService,
  	public routerService:Router
  	) { }

  ngOnInit() {
  	this .course = new Course();
  }
  onAddCourse(){
  	this.subcription = this.courseService.addCourse(this.course).subscribe(data=>{
  		if(data && data.id){
  			this.routerService.navigate(['courses']);
  		}
  	});
  }
  ngOnDestroy(){
  	if(this.subcription){
  		this.subcription.unsubscribe();
  	}
  }
}
