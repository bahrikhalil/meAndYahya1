import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams } from '@angular/common/http';
import {  tap } from 'rxjs';
import {log_user} from '../shared/switchs-models';

import { authServerUrl, baseUrl,firewallsUrl } from '../shared/baseUrl';
import { SwitchesGetService } from './switches-get.service';

interface HostLists {
  [key: string]: String[];
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  siteHosts: HostLists={"Tunisia_switches":[], "Morocco_switches": [] }
  siteFirewalls: HostLists={"Tunisia_firewalls":[], "Morocco_firewalls": [] }
                      
  constructor( private  http :HttpClient, private switchGetService:SwitchesGetService ) { }
  public  createUser(data:any):any{
    
    this.http.post(baseUrl+"/api/user",data).subscribe(
      data=>{
        console.log(data);
      }
    );
  }
//    options = {
//     headers: new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',}).set('Content-Type', 'application/x-www-form-urlencoded')
// };

public login(user:log_user,callback: ()=>void){
  let body = new URLSearchParams(); 
body.set('username', user.username);
body.set('password', user.password);
body.set('grant_type','password');

const headers = new HttpHeaders({
  'Authorization': 'Basic ' + btoa('switches_app:switches_app@2023'),
  'Content-Type': 'application/x-www-form-urlencoded'
});
  
  this.http.post<any>(authServerUrl + "/oauth/token", body.toString(), { headers: headers })
  .pipe(
    tap(data => {
      localStorage.setItem('usertoken', data.access_token);   
      const headers1 = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "bearer "+ data.access_token,
      });
      
             
        localStorage.setItem('user', user.username);
        Object.entries(this.siteHosts).forEach(([key,value])=>{  
          this.switchGetService.getHosts(key.split("_")[0],headers1,"/api/switchs/post/triggerGetSwitchs/").subscribe(
            (data:String[])=>{
              console.log(key);
              
              this.siteHosts[key]=data;
              console.log(data);
              
              this.siteHosts[key]= this.siteHosts[key].map(item => item.replace(/"/g, ''));
              localStorage.setItem(key,JSON.stringify(this.siteHosts[key]))
              callback();
            },(error)=>{
              alert("there has been an error please try again");
              callback();
            });
          }); 
          // Object.entries(this.siteHosts).forEach(([key,value])=>{  
          //   this.switchGetService.getHosts(key.split("_")[0],headers1,"/api/firewalls/post/triggerGetfirewalls/").subscribe(
          //     (data:String[])=>{
          //       this.siteFirewalls[key]=data;
          //       this.siteFirewalls[key]= this.siteHosts[key].map(item => item.replace(/"/g, ''));
          //       localStorage.setItem(key,JSON.stringify(this.siteFirewalls[key]))
          //       callback();
          //     },(error)=>{
          //       alert("there has been an error please try again");
          //       callback();
          //     });
          //   });
    
            
    })
  ).subscribe(()=> {
    console.log("finished");
    
  })
      
    }
}
