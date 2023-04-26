import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams } from '@angular/common/http';
import {  tap } from 'rxjs';
import {log_user} from '../shared/switchs-models';

import { baseUrl,firewallsUrl } from '../shared/baseUrl';
import { SwitchesGetService } from './switches-get.service';

interface HostLists {
  [key: string]: String[];
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  siteHosts: HostLists={"Tunisia_switchs":[],
                        "Morocco_switchs": []
                      }
  constructor( private  http :HttpClient, private switchGetService:SwitchesGetService ) { }
  public  createUser(data:any):any{
    
    this.http.post(baseUrl+"/api/user",data).subscribe(
      data=>{
        console.log(data);
      }
    );
  }
   options = {
    headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',}).set('Content-Type', 'application/x-www-form-urlencoded')
};

public login(user:log_user,callback: ()=>void){
  let body = new URLSearchParams(); 
body.set('username', user.username);
body.set('password', user.password);

const headers= new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded');
  
  this.http.post(firewallsUrl + "/login", body.toString(), { headers: headers })
  .pipe(
    tap(data => {
      localStorage.setItem('usertoken', data.toString());   
      const headers1 = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Bearer "+ data.toString(),
      });
      this.http.post(baseUrl+"/api/user/getSwitchUsername",{"user": user.username},{'headers':headers1,responseType:'text'}).subscribe( data=>{
             
        localStorage.setItem('user', data);
        Object.entries(this.siteHosts).forEach(([key,value])=>{  
          this.switchGetService.getHosts(key.split("_")[0],headers1,"/api/switchs/post/triggerGetSwitchs/").subscribe(
            (data:String[])=>{
              this.siteHosts[key]=data;
              this.siteHosts[key]= this.siteHosts[key].map(item => item.replace(/"/g, ''));
              localStorage.setItem(key,JSON.stringify(this.siteHosts[key]))
              callback();
            },(error)=>{
              alert("there has been an error please try again");
              callback();
            });
          }); 
      })
      console.log(headers1);
            
    })
  ).subscribe(()=> {
    console.log("finished");
    
  })
      
    }
}
