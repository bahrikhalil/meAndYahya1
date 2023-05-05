import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable , switchMap, tap, throwError  } from 'rxjs';
import { Router ,NavigationExtras} from '@angular/router';
import {VlanInfo,IntInfo,issueObj, alertObj} from '../shared/switchs-models';
import { baseUrl } from '../shared/baseUrl';



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

interface ACLList{
  [key: string]: HostLists[];
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
export class SwitchesGetService {
  bTunisiaHostList:String[]=[""];
  bMoroccoHostList:String[]=[""];
  siteHosts: HostLists={"Tunisia_switchs":[],
                        "Morocco_switchs": []
                      }
  
 public isLoading=false;
 public headers :any;
 public neighbors:Neighbors={};
 

  constructor( private  http :HttpClient,private router:Router) { 
    
  }
  
/**
 * 
 * @param evnt 
 * @apinote event  service  start here
 */

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
  
 public getHosts(site:String,headers:HttpHeaders,playPath: string):Observable<string[]>{

 return this.http.get<string[]>(baseUrl+playPath+site,{'headers':headers}).pipe(
   map((data:string[])=>{
     return data;
   })
  );
 }

 public getNeighbors(hostListName:string,headers:HttpHeaders,callback: ()=> void):Observable<Neighbors>{
  console.log(hostListName);
  
   let hosts =JSON.parse(localStorage.getItem(hostListName)!);
   console.log(hosts);
   
  return this.http.post<Neighbors>(baseUrl+"/api/switchs/get/getNeighbors",{hosts},{'headers':headers}).pipe(
   map((data:Neighbors) =>{
     return data;
     
   })
  ) 
 }
 public getACL(data:any,headers:HttpHeaders):Observable<ACLList>{
      
  return this.http.post<ACLList>(baseUrl+"/api/switchs/get/getACL",{"hosts":data},{'headers':headers}).pipe(
   map((output:ACLList) =>{
     return output;
   })
  );
 }

 
 public getBackup(data:string[],callback: ()=> void,headers:HttpHeaders):any{
 
  const fileName = data[0]+'_backup';
  let hosts = JSON.parse(localStorage.getItem('hosts')!);
   console.log(data);
   

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
 },(error)=>{
   alert("there has been an error please try again");
   callback();
 }
 );
}
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
}
