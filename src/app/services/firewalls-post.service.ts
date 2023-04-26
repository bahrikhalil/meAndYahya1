import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AddressObject, alertObj, policy, ServiceObject, timeoutObj } from '../shared/firewalls-models';
import { baseUrl, firewallsUrl } from '../shared/baseUrl';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirewallsPostService {

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

}
