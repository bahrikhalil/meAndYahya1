import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
//import { UserServiceService } from '../servcies/user-service.service';
import { register_user } from '../shared/switchs-models';
import { log_user } from '../shared/switchs-models';
import { baseUrl } from '../shared/baseUrl';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userlogin = true;
  User:log_user= new log_user();
  events:any;
  frechUser:register_user=new register_user(); 
  userregister = false;
  myLoading=false;
  email:any;
  password:any;
  formdata:any; 
  form:any;
  role:any;
  token:any;


  constructor(private service:BackendService, private route:Router, private http:HttpClient) { }

  ngOnInit(): void {
  
    this.formdata= new FormGroup({
      email: new FormControl("bahri1@gmail.com"),
      password: new FormControl("solomid123")
   });
   this.form= new FormGroup({
    email: new FormControl("foullen@gmail.com"),
    name: new FormControl("foullen"),
    password: new FormControl("abcd1234")
 });
  

  }
  user_register(): void
  {
    this.userlogin = false;
    this.userregister = true;
  }
  user_login()
  {
    this.userlogin = true;
    this.userregister = false;
  }

  onClickSubmit(data:any){
    this.myLoading=true;
    this.User.username=data.email;
    this.User.password=data.password;
    this.service.login(this.User,()=>{
      this.myLoading=false;
    //  this.route.navigate(["../switchs"])
    //  this.route.navigate(["../firewalls"])
    });
    
  }
  register(data:any){
    data={
      "name":data.name,
      "username":data.email,
       "password":data.password
  
  }
    this.service.createUser(data);
  }
 
  routing(){
    this.user_login()
    this.route.navigate(["/switchs"])
  }

}
