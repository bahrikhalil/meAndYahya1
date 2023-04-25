import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable , switchMap, tap, throwError  } from 'rxjs';
import { Router ,NavigationExtras} from '@angular/router';
import {log_user,VlanInfo,IntInfo, issueObj, alertObj} from '../shared/switchs-models';

import { baseUrl,firewallsUrl } from '../shared/baseUrl';
import { data } from 'vis-network/declarations/index-legacy';
import { text } from 'd3';
interface HostsIpToName {
  [key: string]: string;
}
interface Neighbors {
  [key: string]: string[];
}

interface HostLists {
  [key: string]: String[];
}
interface IssueObjList {
  [key: string]: issueObj[];
}
interface IssueMap {
  [key: string]: string;
}

interface HttpOptions {
  headers?: HttpHeaders;
  context?: any;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  observe?: 'body';
  reportProgress?: boolean;
  withCredentials?: boolean;
  params?: HttpParams;
}
@Injectable({
  providedIn: 'root'
})


export class BackendService {



  bTunisiaHostList:String[]=[""];
  bMoroccoHostList:String[]=[""];
  siteHosts: HostLists={"Tunisia_switchs":[],
                        "Morocco_switchs": []
                      }
  
hostsIpToNames:HostsIpToName = {'Switch1':'192.168.254.20',
                  'Switch2':'192.168.254.18',
                   'Router1':'5645',
                  'Router2':'777'}
 
 
 public isLoading=false;
 public headers :any;
 public neighbors:Neighbors={};
 issue:IssueObjList = {};
 issuemap:IssueMap= {};

  constructor( private  http :HttpClient,private router:Router) { 
    
  }
  
/**
 * 
 * @param evnt 
 * @apinote event  service  start here
 */


addDevice(data:any,headers:HttpHeaders):Observable<any>{
  return this.http.post<any>(firewallsUrl + "/api/firewalls/post/addDevice",{"hosts":data}, { 'headers': headers }).pipe(
    map((data: any) => { return data; })
  );
}

public triggerGetACLCompliance(data:any,headers:HttpHeaders):Observable<IssueObjList>{
    
  return this.http.post<IssueObjList>(baseUrl+"/api/switchs/get/triggerGetACLCompliance",{"hosts":data},{'headers':headers}).pipe(
   map((output:IssueObjList) =>{
     return output;
   })
  );
 }

 public triggerLineCompliance(data:any,headers:HttpHeaders):Observable<IssueObjList>{
    
  return this.http.post<IssueObjList>(baseUrl+"/api/switchs/get/triggerLineCompliance",{"hosts":data},{'headers':headers}).pipe(
   map((output:IssueObjList) =>{
     return output;
   })
  );
 }

 public triggerPortCompliance(data:any,headers:HttpHeaders):Observable<IssueObjList>{
    
  return this.http.post<IssueObjList>(baseUrl+"/api/switchs/get/triggerPortCompliance",{"hosts":data},{'headers':headers}).pipe(
   map((output:IssueObjList) =>{
     return output;
   })
  );
 }

 public triggerSystemCompliance(data:any,headers:HttpHeaders):Observable<IssueMap>{
    
  return this.http.post<IssueMap>(baseUrl+"/api/switchs/get/triggerSystemCompliance",{"hosts":data},{'headers':headers}).pipe(
   map((output:IssueMap) =>{
     return output;
   })
  );
 }
 createAlertObj(type:string,name:string,comment:string,status:string,hosts:string):alertObj{
  let alertObj1:alertObj = new alertObj();
  alertObj1.subjectName=name;
  alertObj1.subjectType=type;
  alertObj1.comment=comment;
  alertObj1.status=status;
  alertObj1.hosts=hosts;
  return alertObj1;
 }

 setGlobalConfig(data:any,hosts:any,headers:HttpHeaders):Observable<any>{
  return this.http.post<any>(firewallsUrl+"/api/switchs/post/setGlobalConfig/"+data,{"hosts":hosts},{'headers':headers}).pipe(
     map((data:any)=> {return data})
   )
 }
  
  public addVlanInt(data:any,callback: ()=> void,headers:HttpHeaders){
    this.http.post(baseUrl+"/api/switchs/post/addVlanInt",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
    });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfo"));
  }
  public assignIntToVlan(data:any,callback: ()=> void,headers:HttpHeaders):any{
    this.http.post(baseUrl+"/api/switchs/post/assignIntToVlan",data,{'headers':headers}).subscribe( 
      data=>{
        console.log(data);
        callback();
      });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" vlanInfo"));
    
  }
  public configTrunk(data:any,callback: ()=> void,headers:HttpHeaders):any{
    this.http.post(baseUrl+"/api/switchs/post/configTrunk",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
    });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfoMode"));
  }
  public addVlansToTrunk(data:any,callback: ()=> void,headers:HttpHeaders):any{
    
    this.http.post(baseUrl+"/api/switchs/post/addVlansToTrunk",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
     });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfoMode"));
  }
  public setBridgePriority(data:any,callback: ()=> void,headers:HttpHeaders):any{
    this.http.post(baseUrl+"/api/switchs/post/setBridgePriority",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
     } );
  }
  
  public NoShutDownInt(data:any,callback: ()=> void,headers:HttpHeaders):any{
    this.http.post(baseUrl+"/api/switchs/post/NoShutDownInt",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
  });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfo"));
  }
  public ShutDownInt(data:any,callback: ()=> void,headers:HttpHeaders):any{
    this.http.post(baseUrl+"/api/switchs/post/ShutDownInt",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
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
    });
  }

  public addVlan(data:any,callback: ()=> void,headers:HttpHeaders):any{
    this.http.post(baseUrl+"/api/switchs/post/addVlan",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
    });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" vlanInfo"));
  }
  public delVlan(data:any,callback: ()=> void,headers:HttpHeaders):any{
    this.http.post(baseUrl+"/api/switchs/post/deleteVlan",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
    });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" vlanInfo"));
  }
  public delVlanInt(data:any,callback: ()=> void,headers:HttpHeaders):any{
    this.http.post(baseUrl+"/api/switchs/post/deleteVlanInterface",data,{'headers':headers}).subscribe( data=>{
      console.log(data);
      callback();
    });
    let hosts = JSON.parse(localStorage.getItem('hosts') || 'default value');
    hosts.slice(1,hosts.length).map((item:String)=>localStorage.removeItem(item+" IntInfo"));
  }

public triggerGetVlans(data:String,headers:HttpHeaders):Observable<VlanInfo[]>{
    
   return this.http.post<VlanInfo[]>(baseUrl+"/api/switchs/get/triggerGetVlans",{"hosts":["Individuals",data]},{'headers':headers}).pipe(
    map((output:VlanInfo[]) =>{
      return output;
    })
   );
  }
  public triggerGetIntInfo(data:String,headers:HttpHeaders):Observable<IntInfo[]>{
    
    return this.http.post<IntInfo[]>(baseUrl+"/api/switchs/get/triggerGetIntInfo",{"hosts":["Individuals",data]},{'headers':headers}).pipe(
     map((output:IntInfo[]) =>{
       return output;
     })
    );
   }
   
  public getHosts(site:String,headers:HttpHeaders,playPath: string):Observable<String[]>{

  return this.http.get<String[]>(baseUrl+playPath+site,{'headers':headers}).pipe(
    map((data:String[])=>{
      return data;
    })
   );
  }
  public getNeighbors(hostListName:string,headers:HttpHeaders,callback: ()=> void):Observable<Neighbors>{
    let hosts =JSON.parse(localStorage.getItem(hostListName)!);
   return this.http.post<Neighbors>(baseUrl+"/api/switchs/get/getNeighbors",{hosts},{'headers':headers}).pipe(
    map((data:Neighbors) =>{
      return data;
      
    })
   )
   
  }
  
  public getBackup(data:string[],callback: ()=> void,headers:HttpHeaders):any{
  
   const fileName = data[0]+'_backup';
   let hosts = JSON.parse(localStorage.getItem('hosts')!);
 

   if(data[0]=="Individuals"){
    console.log("this is if -------------");
    
    this.http.post(baseUrl+"/api/switchs/get/createIndividualsBackup",{hosts},{'headers':headers}).pipe(
      switchMap(() => this.http.get(baseUrl+"/api/switchs/get/getBackupFiles/Individuals.zip",{"headers":headers,responseType:'arraybuffer'}))
    ).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/zip' }); // replace with the actual MIME type of the file
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = fileName;
    link.click();
    callback();
    }, (error) => {
      // Handle the error
    });

   }
else{
  console.log("this is else-------------------");
  
   this.http.get(baseUrl+"/api/switchs/get/getBackupFiles/"+data[0]+".zip",{"headers":headers,responseType:'arraybuffer'})

  .subscribe(data => {
    const blob = new Blob([data], { type: 'application/zip' }); // replace with the actual MIME type of the file
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = fileName;
    link.click();
    callback();
  });
}
  }
 
  
  
  /**
   * user service
   */
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
            console.log(data);
             
        localStorage.setItem('user', data);
        Object.entries(this.siteHosts).forEach(([key,value])=>{  
          this.getHosts(key.split("_")[0],headers1,"/api/switchs/post/triggerGetSwitchs/").subscribe(
            (data:String[])=>{
              this.siteHosts[key]=data;
              this.siteHosts[key]= this.siteHosts[key].map(item => item.replace(/"/g, ''));
              localStorage.setItem(key,JSON.stringify(this.siteHosts[key]))
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

createReport(data:any,headers:HttpHeaders):Promise<alertObj[]>{

      if(data[0]!="Individuals"){
        data=JSON.parse(localStorage.getItem(data[0])!);
      }
      let alertObjList:alertObj[] = [];  
      const promise1 = new Promise((resolve,reject)=>{
        this.triggerLineCompliance(data,headers)
        .subscribe((response)=> {
         // this.issue=response;
          Object.entries(response).forEach((key)=>{
            key[1].forEach((element)=>{
              if( (element.line!="****") && /[a-zA-Z]/.test(element.issue)){
              let alertObj1:alertObj = this.createAlertObj("lines config",element.line,element.issue,"FIXED: set transport to ssh and exec timeout to 10, please chose your custom value",key[0]);
              alertObjList.push(alertObj1);
              }
            })
          });
          resolve(response);  
        }
        , (error)=>reject(error)
        )
      });
      const promise2 = new Promise((resolve,rejecet)=>{
        this.triggerSystemCompliance(data,headers)
        .subscribe((response)=> {
        
          Object.entries(response).forEach((key)=>{
            Object.entries(key[1].split("and")).forEach((curr)=>{
              let alertObj1:alertObj = this.createAlertObj("System config","",curr[1],"TO BE FIXED MANNUALLY",key[0]);
              alertObjList.push(alertObj1);
             })
              
            })
          resolve(response);
        }
        , (error)=>rejecet(error)
        )
      });
    
      const promise3 = new Promise((resolve,rejecet)=>{
        this.triggerPortCompliance(data,headers)
        .subscribe((response)=> {
          console.log(response);
          
         // this.issue=response;
          Object.entries(response).forEach((key)=>{
            key[1].forEach((element)=>{
              if((element.port_name!="****") && (/[a-zA-Z]/.test(element.issue))){
              let alertObj1:alertObj = this.createAlertObj("l3 port config",element.port_name,element.issue,"TO BE FIXED MANNUALLY",key[0]);
              alertObjList.push(alertObj1);
              }
            })
          });
          resolve(response);
        }
        , (error)=>rejecet(error)
        )
      });
      const promise4 = new Promise((resolve,rejecet)=>{
        this.triggerGetACLCompliance(data,headers).subscribe(
          (response)=> {
            Object.entries(response).forEach((key)=>{
              key[1].forEach((element)=>{
               // if((element.port_name!="****") && (/[a-zA-Z]/.test(element.issue))){
                let alertObj1:alertObj = this.createAlertObj("ACL",element.id,element.issue,"TO BE FIXED MANNUALLY",key[0]);
                alertObjList.push(alertObj1);
               // }
              })
            });
            
            resolve(response);
          }
          , (error)=>rejecet(error)
        )
      })
    
     
    const promisesList=[promise1,promise2,promise3,promise4];
    
     return  Promise.all(promisesList)
        .then((res) => {
             
             return alertObjList;     
             
        })
        .catch(() => {
        
          return alertObjList;
          
        });
       
       
    
     }    
      
  
 
};






