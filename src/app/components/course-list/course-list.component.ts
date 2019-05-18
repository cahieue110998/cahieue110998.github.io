import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from './../../services/course.service';
import { Subscription } from 'rxjs';
import { Course } from './../../models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit,OnDestroy {

	public subcription:Subscription;
	public courses:Course[]=[];

  constructor(public courseService:CourseService) { }

  ngOnInit() {
  	this.subcription = this.courseService.getAllCourses().subscribe(data=>{
  		this.courses=data;
  	});
  }
  ngOnDestroy(){
  	if(this.subcription){
  		this.subcription.unsubscribe();
  	}
  }

  onDeleteCourse(id:number){
    this.subcription = this.courseService.deleteCourse(id).subscribe((data:Course)=>{
      this.updateDataAfterDelete(id);
    });
  }
  updateDataAfterDelete(id:number){
    for (var i = 0; i < this.courses.length; i++) {
      if(this.courses[i].id==id){
        this.courses.splice(i,1);
        break;
      }
    }
  }

}
