import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable , switchMap, tap, throwError  } from 'rxjs';
import { Router ,NavigationExtras} from '@angular/router';
import {log_user,VlanInfo,IntInfo, issueObj, alertObj} from '../shared/switchs-models';
import { baseUrl,firewallsUrl } from '../shared/baseUrl';

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

@Injectable({
  providedIn: 'root'
})
export class CreateReportSwitchesService {

  bTunisiaHostList:String[]=[""];
  bMoroccoHostList:String[]=[""];
  siteHosts: HostLists={"Tunisia_switchs":[],"Morocco_switchs": []}
                      
 public isLoading=false;
 public headers :any;
 public neighbors:Neighbors={};
 issue:IssueObjList = {};
 issuemap:IssueMap= {};                   

  constructor( private  http :HttpClient,private router:Router) { }
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
          , (error)=>{
            alert("there has been an error please try again")
            reject(error);}
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
          , (error)=>{
            alert("there has been an error please try again")
            rejecet(error)}
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
          , (error)=>{
            alert("there has been an error please try again")
            rejecet(error)}
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
            , (error)=>{
              alert("there has been an error please try again");
              rejecet(error)
            }
          )
        })
      
       
      const promisesList=[promise1,promise2,promise3,promise4];
      
       return  Promise.all(promisesList)
          .then((res) => {
               
               return alertObjList;     
               
          })
          .catch((error) => {
            
            return alertObjList;
            
          });
         
         
      
       }    
}
