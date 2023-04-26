import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddressObject, alertObj, policy, ServiceObject, timeoutObj } from '../shared/firewalls-models';
import { baseUrl, firewallsUrl } from '../shared/baseUrl';
import { Observable, map, switchMap } from 'rxjs';
import { FirewallsGetService } from './firewalls-get.service';
import { FirewallsPostService } from './firewalls-post.service';
interface HostsIpToName {
  [key: string]: string;
}
interface Timeouts {
  [key: string]: string;
}
interface Neighbors {
  [key: string]: string[];
}
interface HostLists {
  [key: string]: string[];
}
interface PortsCompliance {
  [key: string]: string[];
}
interface Policys {
  [key: string]: policy[];
}




@Injectable({
  providedIn: 'root'
})
export class CreateReportFirewallsService {

  alertObjList:alertObj[]=[];
  timeout:timeoutObj=new timeoutObj();

  constructor(private http:HttpClient,
     private firewallsGetService:FirewallsGetService,
     private firewallsPostService:FirewallsPostService,) { }

     public getPortsCompliance(data:any,headers:HttpHeaders):Observable<PortsCompliance>{

      return this.http.post<PortsCompliance>(baseUrl+"/api/firewalls/get/getPortsCompliance",{"hosts":data},{'headers':headers}).pipe(
       map((output:PortsCompliance) =>{
         return output;
       })
      );
     }

     editPolicy(policy:policy, hosts:string[],headers:HttpHeaders):Observable<any>{
  
      this.timeout.hosts=hosts;
      return this.firewallsPostService.addPolicy(policy,headers)
    }
  
    setTimeout(data:any, hosts:string[],headers:HttpHeaders):Observable<any>{
      this.timeout.timeout=data;
      this.timeout.hosts=hosts;
     return this.firewallsPostService.setTimeout(this.timeout,headers)
    }


  createReport(data:string[],headers:HttpHeaders):Promise<alertObj[]>{

    // set the list of hosts to be sent , remove the first item for the backend functions that will not use
    // ansible playbook (no need for the first element that contains the group name, only hosts needed)
     if(data[0]!="Individuals"){
       data=JSON.parse(localStorage.getItem(data[0])!);
     }
     else{
       data.shift();
     }
 
   let promisesList1:any=[];
   let promisesList2:any=[];
   // start the first compliance check (policys)
   const promise1 = new Promise((resolve1,reject1) => {
   this.firewallsGetService.getPolicys(data,headers).subscribe((output)=>{
     let policys=output;
     Object.entries(policys).forEach(([key,value])=>{
       value.forEach((element)=>{
       if((element.dstaddr=="all") || (element.srcaddr=="all") || (element.srcintf=="all") || (element.dstintf=="all")) {
           if(element.status=="enable"){
             element.status="disable";              
             const promise = new Promise((resolve,reject) => {
             this.editPolicy(element,["Individuals",key],headers).subscribe((response)=>{
               let alertObj1:alertObj = this.createAlertObj("policy",element.name,"source and destination addresses and ports should be specified","TO BE FIXED MANNUALLY: all policys have been disabled, please specify the addresses/ports",key)
               this.alertObjList.push(alertObj1);
               resolve(response);
             },
             (error)=>reject(error)
             ); 
            });
             promisesList2.push(promise);
           }         
         }
       })
     });
     resolve1(output);
   },
   (error)=>reject1(error)
   )
 });
 
     // second compliance check (adminetimeout)
     const promise2 = new Promise((resolve1,reject1) => {
     this.firewallsGetService.getTimeout(data,headers).subscribe((output1)=>{
         console.log(output1);      
         Object.entries(output1).forEach(([key,value])=>{
         if(parseInt(value)==10){
           const promise = new Promise((resolve,rejects) => {
             this.setTimeout("10",["Individuals",key],headers).subscribe((response)=>{
               let alertObj1:alertObj = this.createAlertObj("system config","admin timeout","admin timeout : ("+value+") should be less than 10mn","FIXED : admin timeout set to 10mn, please chose your custom value",key);       
               this.alertObjList.push(alertObj1);
               resolve(response);
             },
             (error)=>rejects(error)
             );     
            });
           promisesList2.push(promise);
         }
       });
       resolve1(output1);
     },
     (error)=>reject1(error)
     ) 
   });
       // third compliance check (ports)
       const promise3 = new Promise((resolve,reject) => {
         this.getPortsCompliance(data,headers).subscribe((output2)=>{
           
           Object.entries(output2).forEach(([key,value])=>{
             if(value.length>0){
               let alertObj1:alertObj = this.createAlertObj("ports config","allowaccess list","","",key);
               if((value.indexOf("port1")!=-1) && (value.length>1)){
                   alertObj1.status="FIXED: disabled http and/or telnet on port1 and disabled all services on all the other ports";
                   alertObj1.comment="unallowed services were enabled on port1 and allowedaccess was set on some ports";
               }
               else if((value.indexOf("port1")!=-1) && (value.length==1)){
                   alertObj1.status="FIXED: disabled http and/or telnet on port1";
                   alertObj1.comment="unallowed services were enabled on port1";
               }
               else if((value.indexOf("port1")==-1)){
                   alertObj1.status="disabled all services on all ports beside port1";
                   alertObj1.comment="allowedaccess was set on some ports";
               }
   
               this.alertObjList.push(alertObj1);     
             }           
           });
           resolve(output2);
         },
         (error)=>reject(error))
        });
       
         promisesList1.push(promise1,promise2,promise3);

    return  Promise.all(promisesList1+promisesList2)
          .then((res) => {
               
               return this.alertObjList;     
               
          })
          .catch((error) => {
            
            return this.alertObjList;
            
          });
    
     
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
}
