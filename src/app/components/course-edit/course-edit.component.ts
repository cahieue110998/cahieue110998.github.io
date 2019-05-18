import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit, OnDestroy {

	public course:Course;
	public subcription:Subscription;
  public subcriptionParams:Subscription;

  constructor(
  	public courseService:CourseService,
  	public routerService:Router,
    public activatedRouteService:ActivatedRoute
  	) { }

  ngOnInit() {
  	this .course = new Course();
    this.loadData();
  }

  loadData(){
    this.subcriptionParams = this.activatedRouteService.params.subscribe((data:Params)=>{
      let id = data['id'];
      this.subcription = this.courseService.getCourse(id).subscribe((course:Course)=>{
        this.course= course;
      });
    });
  }

  ngOnDestroy(){
  	if(this.subcription){
  		this.subcription.unsubscribe();
  	}
    if(this.subcriptionParams){
      this.subcriptionParams.unsubscribe();
    }
  }

  onEditCourse(){
  	this.subcription=this.courseService.updateCourse(this.course).subscribe((data:Course)=>{
        this.routerService.navigateByUrl('courses');
    });
  }
}
