import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddressObject, alertObj, policy, ServiceObject, timeoutObj } from '../shared/firewalls-models';
import { baseUrl, firewallsUrl } from '../shared/baseUrl';
import { Observable, map, switchMap } from 'rxjs';

interface Timeouts {
  [key: string]: string;
}
interface Neighbors {
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
export class FirewallsGetService {

  constructor(private http:HttpClient) { }
  public getHosts(site:string,headers:HttpHeaders,playPath: string):Observable<string[]>{

    return this.http.get<string[]>(firewallsUrl+playPath+site,{'headers':headers}).pipe(
      map((data:string[])=>{
        return data;
      })
     );
    }
  
 
  public getPolicys(data:string[],headers:HttpHeaders):Observable<Policys>{
    
    return this.http.post<Policys>(firewallsUrl+"/api/firewalls/get/getPolicys",{"hosts":data},{'headers':headers}).pipe(
     map((output:Policys) =>{
       return output;
     })
    );
   }

   public getServiceObject(data:any,headers:HttpHeaders):Observable<ServiceObject[]>{
    
    return this.http.post<ServiceObject[]>(firewallsUrl+"/api/firewalls/get/getServiceObject",{"hosts":data},{'headers':headers}).pipe(
     map((output:ServiceObject[]) =>{
       return output;
     })
    );
   }

   public getServiceGrpObject(data:any,headers:HttpHeaders):Observable<ServiceObject[]>{
    
    return this.http.post<ServiceObject[]>(firewallsUrl+"/api/firewalls/get/getServiceGrpObject",{"hosts":data},{'headers':headers}).pipe(
     map((output:ServiceObject[]) =>{
       return output;
     })
    );
   }

   public getAddressObject(data:any,headers:HttpHeaders):Observable<AddressObject[]>{
    
    return this.http.post<AddressObject[]>(firewallsUrl+"/api/firewalls/get/getAddressObject",{"hosts":data},{'headers':headers}).pipe(
     map((output:AddressObject[]) =>{
       return output;
     })
    );
   }

   public getAddressGrpObject(data:any,headers:HttpHeaders):Observable<AddressObject[]>{

    return this.http.post<AddressObject[]>(firewallsUrl+"/api/firewalls/get/getAddressGrpObject",{"hosts":data},{'headers':headers}).pipe(
     map((output:AddressObject[]) =>{
       return output;
     })
    );
   }
   public getTimeout(data:string[],headers:HttpHeaders):Observable<Timeouts>{
    
    return this.http.post<Timeouts>(firewallsUrl+"/api/firewalls/get/getTimeout",{"hosts":data},{'headers':headers}).pipe(
     map((output:Timeouts) =>{

       return output;
     })
    );
   }
   

   public getBackup(data:string[],callback: ()=> void,headers:HttpHeaders):any{
  
    const fileName = data[0]+'_backup';
    let hosts = JSON.parse(localStorage.getItem('firewalls')!);
  
 
    if(data[0]=="Individuals"){
     console.log("this is if -------------");
     
     this.http.post(firewallsUrl+"/api/firewalls/get/createIndividualsBackup",{"hosts":hosts},{'headers':headers}).pipe(
       switchMap(() => this.http.get(firewallsUrl+"/api/firewalls/get/getBackupFiles/Individuals.zip",{"headers":headers,responseType:'arraybuffer'}))
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
   
    this.http.get(firewallsUrl+"/api/firewalls/get/getBackupFiles/"+data[0]+".zip",{"headers":headers,responseType:'arraybuffer'})
 
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
}
