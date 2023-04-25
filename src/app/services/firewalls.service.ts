import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddressObject, alertObj, policy, ServiceObject, timeoutObj } from '../shared/firewalls-models';
import { baseUrl, firewallsUrl } from '../shared/baseUrl';
import { Observable, map, switchMap } from 'rxjs';
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
export class FirewallsService {
  bTunisiaHostList:String[]=[""];
  bMoroccoHostList:String[]=[""];
  siteHosts: HostLists={"TunisiaHostList":[],
                        "MoroccoHostList": []
                      }
  
hostsIpToNames:HostsIpToName = {'Switch1':'192.168.254.20',
                  'Switch2':'192.168.254.18',
                   'Router1':'5645',
                  'Router2':'777'}
 
 
 public isLoading=false;
 public headers :any;
 public neighbors:Neighbors={};

  constructor(private http:HttpClient, private router:Router) { }

  addDevice(data:string[],headers:HttpHeaders):Observable<any>{
    console.log(data);
    
    return this.http.post<any>(firewallsUrl + "/api/firewalls/post/addDevice",{"hosts":data} , { 'headers': headers }).pipe(
      map((data: any) => { return data; })
    );
  }

  addPolicy(data:any,headers:HttpHeaders):Observable<any>{
    return this.http.post<any>(firewallsUrl + "/api/firewalls/post/addPolicy", data, { 'headers': headers }).pipe(
      map((data: any) => { return data; })
    );
  }
  delPolicy(data:any,headers:HttpHeaders):Observable<any>{
   return this.http.post<any>(firewallsUrl+"/api/firewalls/post/delPolicy",data,{'headers':headers}).pipe(
      map((data:any)=> {return data})
    )
  }
   
  addServiceObject(data:any,headers:HttpHeaders):Observable<any>{
   return this.http.post<any>(firewallsUrl+"/api/firewalls/post/addServiceObject",data,{'headers':headers}).pipe(
      map((data:any)=> {return data})
    )
  }
   delServiceObject(data:any,headers:HttpHeaders):Observable<any>{
   return this.http.post<any>(firewallsUrl+"/api/firewalls/post/delServiceObject",data,{'headers':headers}).pipe(
      map((data:any)=> {return data})
    )
  }
   addAddressGrpObject(data:any,headers:HttpHeaders):Observable<any>{
   return this.http.post<any>(firewallsUrl+"/api/firewalls/post/addAddressGrpObject",data,{'headers':headers}).pipe(
      map((data:any)=> {return data})
    )
  }
  delAddressGrpObject(data:any,headers:HttpHeaders):Observable<any>{
   return this.http.post<any>(firewallsUrl+"/api/firewalls/post/delAddressGrpObject",data,{'headers':headers}).pipe(
      map((data:any)=> {return data})
    )
  }
  addServiceGrpObject(data:any,headers:HttpHeaders):Observable<any>{
   return this.http.post<any>(firewallsUrl+"/api/firewalls/post/addServiceGrpObject",data,{'headers':headers}).pipe(
      map((data:any)=> {return data})
    )
  }
   delServiceGrpObject(data:any,headers:HttpHeaders):Observable<any>{
   return this.http.post<any>(firewallsUrl+"/api/firewalls/post/addServiceGrpObject",data,{'headers':headers}).pipe(
      map((data:any)=> {return data})
    )
  }

   setGlobalSettings(data:any,hosts:any,headers:HttpHeaders):Observable<any>{
    return this.http.post<any>(firewallsUrl+"/api/firewalls/post/setGlobalConfig/"+data,{"hosts":hosts},{'headers':headers}).pipe(
       map((data:any)=> {return data})
     )
   }
   setTimeout(data:any,headers:HttpHeaders):Observable<any>{
   return this.http.post<any>(firewallsUrl+"/api/firewalls/post/setTimeout",data,{'headers':headers}).pipe(
      map((data:any)=> {return data})
    )
  }


  public getHosts(site:string,headers:HttpHeaders,playPath: string):Observable<string[]>{

    return this.http.get<string[]>(firewallsUrl+playPath+site,{'headers':headers}).pipe(
      map((data:string[])=>{
        return data;
      })
     );
    }
  
 
  public getPolicys(data:string[],headers:HttpHeaders):Observable<Policys>{
    
    return this.http.post<Policys>(baseUrl+"/api/firewalls/get/getPolicys",{"hosts":data},{'headers':headers}).pipe(
     map((output:Policys) =>{

       return output;
     })
    );
   }

   public getServiceObject(data:any,headers:HttpHeaders):Observable<ServiceObject[]>{
    
    return this.http.post<ServiceObject[]>(baseUrl+"/api/firewalls/get/getServiceObject",{"hosts":data},{'headers':headers}).pipe(
     map((output:ServiceObject[]) =>{
       return output;
     })
    );
   }

   public getServiceGrpObject(data:any,headers:HttpHeaders):Observable<ServiceObject[]>{
    
    return this.http.post<ServiceObject[]>(baseUrl+"/api/firewalls/get/getServiceGrpObject",{"hosts":data},{'headers':headers}).pipe(
     map((output:ServiceObject[]) =>{
       return output;
     })
    );
   }

   public getAddressObject(data:any,headers:HttpHeaders):Observable<AddressObject[]>{
    
    return this.http.post<AddressObject[]>(baseUrl+"/api/firewalls/get/getAddressObject",{"hosts":data},{'headers':headers}).pipe(
     map((output:AddressObject[]) =>{
       return output;
     })
    );
   }

   public getAddressGrpObject(data:any,headers:HttpHeaders):Observable<AddressObject[]>{

    return this.http.post<AddressObject[]>(baseUrl+"/api/firewalls/get/getAddressGrpObject",{"hosts":data},{'headers':headers}).pipe(
     map((output:AddressObject[]) =>{
       return output;
     })
    );
   }
   public getTimeout(data:string[],headers:HttpHeaders):Observable<Timeouts>{
    
    return this.http.post<Timeouts>(baseUrl+"/api/firewalls/get/getTimeout",{"hosts":data},{'headers':headers}).pipe(
     map((output:Timeouts) =>{

       return output;
     })
    );
   }
   public getPortsCompliance(data:any,headers:HttpHeaders):Observable<PortsCompliance>{

    return this.http.post<PortsCompliance>(baseUrl+"/api/firewalls/get/getPortsCompliance",{"hosts":data},{'headers':headers}).pipe(
     map((output:PortsCompliance) =>{
       return output;
     })
    );
   }

   public getBackup(data:string[],callback: ()=> void,headers:HttpHeaders):any{
  
    const fileName = data[0]+'_backup';
    let hosts = JSON.parse(localStorage.getItem('firewalls')!);
  
 
    if(data[0]=="Individuals"){
     console.log("this is if -------------");
     
     this.http.post(baseUrl+"/api/firewalls/get/createIndividualsBackup",{"hosts":hosts},{'headers':headers}).pipe(
       switchMap(() => this.http.get(baseUrl+"/api/firewalls/get/getBackupFiles/Individuals.zip",{"headers":headers,responseType:'arraybuffer'}))
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
   
    this.http.get(baseUrl+"/api/firewalls/get/getBackupFiles/"+data[0]+".zip",{"headers":headers,responseType:'arraybuffer'})
 
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
