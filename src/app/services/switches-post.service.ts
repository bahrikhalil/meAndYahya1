import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable , switchMap, tap, throwError  } from 'rxjs';
import { Router ,NavigationExtras} from '@angular/router';
import {log_user,VlanInfo,IntInfo, issueObj, alertObj} from '../shared/switchs-models';
import { baseUrl,firewallsUrl } from '../shared/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SwitchesPostService {

  constructor( private  http :HttpClient,private router:Router) { 
    
  }
  public setGlobalConfig(data:any,hosts:any,headers:HttpHeaders):Observable<any>{
    return this.http.post<any>(firewallsUrl+"/api/switchs/post/setGlobalConfig/"+data,{"hosts":hosts},{'headers':headers}).pipe(
       map((data:any)=> {return data})
     )
   }

   
public addDevice(data:any,headers:HttpHeaders):Observable<any>{
  return this.http.post<any>(baseUrl + "/api/switchs/post/addDevice",{"hosts":data}, { 'headers': headers }).pipe(
    map((data: any) => { return data; })
  );
}
    
   public addACL(data:any,callback: ()=> void,headers:HttpHeaders){
    this.http.post(baseUrl+"/api/switchs/post/addACL",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
    });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" acls")!);
  }
  
    public addVlanInt(data:any,callback: ()=> void,headers:HttpHeaders){
      this.http.post(baseUrl+"/api/switchs/post/addVlanInt",data,{'headers':headers}).subscribe( data=>{
        callback();
  
      },(error)=>{
        alert("there has been an error please try again");
        callback();
      }
      );
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfo"));
    }
  
    public assignIntToVlan(data:any,callback: ()=> void,headers:HttpHeaders):any{
      this.http.post(baseUrl+"/api/switchs/post/assignIntToVlan",data,{'headers':headers}).subscribe( 
        data=>{
          console.log(data);
          callback();
        },(error)=>{
        alert("there has been an error please try again");
        callback();
      });
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" vlanInfo"));
      
    }
    public configTrunk(data:any,callback: ()=> void,headers:HttpHeaders):any{
      this.http.post(baseUrl+"/api/switchs/post/configTrunk",data,{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
      },(error)=>{
        alert("there has been an error please try again");
        callback();
      });
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfoMode"));
    }
    public addVlansToTrunk(data:any,callback: ()=> void,headers:HttpHeaders):any{
      
      this.http.post(baseUrl+"/api/switchs/post/addVlansToTrunk",data,{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
       },(error)=>{
        alert("there has been an error please try again");
        callback();
      }
       );
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfoMode"));
    }
    public setBridgePriority(data:any,callback: ()=> void,headers:HttpHeaders):any{
      this.http.post(baseUrl+"/api/switchs/post/setBridgePriority",data,{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
       },(error)=>{
        alert("there has been an error please try again");
        callback();
      } );
    }
    
    public NoShutDownInt(data:any,callback: ()=> void,headers:HttpHeaders):any{
      this.http.post(baseUrl+"/api/switchs/post/NoShutDownInt",data,{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
    },(error)=>{
      alert("there has been an error please try again");
      callback();
    }
    );
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfo"));
    }
    public ShutDownInt(data:any,callback: ()=> void,headers:HttpHeaders):any{
      this.http.post(baseUrl+"/api/switchs/post/ShutDownInt",data,{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
      },(error)=>{
        alert("there has been an error please try again");
        callback();
      });
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfo"));
    }
    public saveToStartUpConfig(callback: ()=> void,headers:HttpHeaders){
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      this.http.post(baseUrl+"/api/switchs/post/saveToStartUpConfig",{hosts},{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
      },(error)=>{
        alert("there has been an error please try again");
        callback();
      });
    }
  
    public addVlan(data:any,callback: ()=> void,headers:HttpHeaders):any{
      this.http.post(baseUrl+"/api/switchs/post/addVlan",data,{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
      },(error)=>{
        alert("there has been an error please try again");
        callback();
      });
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" vlanInfo"));
    }
    public delVlan(data:any,callback: ()=> void,headers:HttpHeaders):any{
      this.http.post(baseUrl+"/api/switchs/post/deleteVlan",data,{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
      },(error)=>{
        alert("there has been an error please try again");
        callback();
      });
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" vlanInfo"));
    }
    public delVlanInt(data:any,callback: ()=> void,headers:HttpHeaders):any{
      this.http.post(baseUrl+"/api/switchs/post/deleteVlanInterface",data,{'headers':headers}).subscribe( data=>{
        console.log(data);
        callback();
      },(error)=>{
        alert("there has been an error please try again");
        callback();
      });
      let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
      hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfo"));
    }
}
