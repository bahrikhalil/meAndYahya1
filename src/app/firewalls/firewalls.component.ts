import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, Routes } from '@angular/router';

import { policy, alertObj, timeoutObj } from '../shared/firewalls-models';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button'
import { Observable } from 'rxjs';
import { FirewallsGetService } from '../services/firewalls-get.service';
import { FirewallsPostService } from '../services/firewalls-post.service';
import { CreateReportFirewallsService } from '../services/create-report-firewalls.service';



interface HostLists {
  [key: string]: string[];
}
interface PolicysStatus {
  [key: string]: string;
}
interface Policys {
  [key: string]: policy[];
}

@Component({
  selector: 'app-firewalls',
  templateUrl: './firewalls.component.html',
  styleUrls: ['./firewalls.component.scss']
})
export class FirewallsComponent implements OnInit {


  contentList=[0,1];
  isAccepted = false;
  isDenied = false;
  itemSelected=false;
  panelOpen = false;
  myLoading= false;
  popupaddpolicy=false;
  individualsList:string[]=[];
  selectedItem:string="";
  hoveredIndex = -1;
  headers:any;
  policysStatus:PolicysStatus={"po6":"enable","po6-1":"disable"}
  sites:string[]=["Morocco_firewalls","Tunisia_firewalls"];
  siteHosts: HostLists={"Tunisia_firewalls":[],"Morocco_firewalls": []  }
  formdata:any;
  policy: policy = new policy();
  policys:Policys= {};
  member:string[]=[];
  exclude_member:string[]=[];
  category:string="";
  firewalls:string[]=[];
  alertObjList:alertObj[]=[];
  timeout:timeoutObj=new timeoutObj();
  hosts1:string[]=[];

  constructor(private route:Router,
     private firewallsGetService:FirewallsGetService,
     private firewallsPostService:FirewallsPostService,
     private reportService:CreateReportFirewallsService ) { 
  
  }

  ngOnInit(): void {

   this.headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: "Bearer "+ localStorage.getItem("usertoken"),
  });
  this.formdata= new FormGroup({
    name: new FormControl("po"),
    policyid: new FormControl("3"),
    action: new FormControl("accept"),
    srcaddr: new FormControl("all"),
    dstaddr: new FormControl("all"),
    srcintf: new FormControl("port2"),
    dstintf: new FormControl("port1"),
    service: new FormControl("HTTP"),
    schedule: new FormControl("always"),
    status: new FormControl("enable"),
    comment: new FormControl("comment1"),
    allow_routing: new FormControl("comment1"),
    IP: new FormControl("comment1"),
    IPRange: new FormControl("comment1"),
    fqdn: new FormControl("comment1"),
    type: new FormControl("comment1"),
    
   

  });
  
   
    Object.entries(this.siteHosts).forEach(([key,value])=>{     
      if(JSON.parse(localStorage.getItem(key)!)==null) {
        console.log("nulllllllllllll");
        
        this.firewallsGetService.getHosts(key.split("_")[0],this.headers,"/api/firewalls/post/triggerGetFirewalls/").subscribe(
          (data:string[])=>{
            this.siteHosts[key]=data;
            this.siteHosts[key]= this.siteHosts[key].map(item => item.replace(/"/g, ''));
            localStorage.setItem(key,JSON.stringify(this.siteHosts[key]))
            
          });      
        } 
        else this.siteHosts[key]=JSON.parse(localStorage.getItem(key) || 'default value');
      });  
      
     // this.showPolicys(["Individuals","192.168.254.10"]);
      
   }
 changeContent(data:any){
      this.contentList = this.contentList.map(num => num === 1 ? 0 : num);
      this.contentList[data]=1;
      console.log(this.contentList);
      

 }

   onAcceptClick() {
    this.isAccepted = true;
    this.isDenied = false;
  }

  onDenyClick() {
    this.isAccepted = false;
    this.isDenied = true;
  }

  addDevice(data:string[]){
   
    
    let data1 = ["Morocco_firewalls","192.168.254.10"]
    this.myLoading=true;
    this.firewallsPostService.addDevice(data1,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    })
  }

  addPolicy(data:any){
    this.myLoading=true;
    this.policy.name=data.name;
    this.policy.policyid=data.policyid;
    this.policy.action=data.action;
    this.policy.srcaddr=data.srcaddr;
    this.policy.dstaddr=data.dstaddr;
    this.policy.srcintf=data.srcintf;
    this.policy.dstintf=data.dstintf;
    this.policy.service=data.service;
    this.policy.schedule=data.schedule;
    this.policy.status=data.status;   
    this.policy.hosts = JSON.parse(localStorage.getItem('firewalls') || 'default value');
    this.firewallsPostService.addPolicy(this.policy,this.headers).subscribe((data)=>{
      console.log("done");
      
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }

  delPolicy(data:any){
    this.myLoading=true;
    this.firewallsPostService.delPolicy(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  addServiceObject(data:any){
    this.myLoading=true;
    this.firewallsPostService.addServiceObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  delServiceObject(data:any){
    this.myLoading=true;
    this.firewallsPostService.delServiceObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  addAddressGrpObject(data:any){
    this.myLoading=true;
    this.firewallsPostService.addAddressGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  delAddressGrpObject(data:any){
    this.myLoading=true;
    this.firewallsPostService.delAddressGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  addServiceGrpObject(data:any){
    this.myLoading=true;
    this.firewallsPostService.addServiceGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  delServiceGrpObject(data:any){
    this.myLoading=true;
    this.firewallsPostService.delServiceGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  
  editPolicy(policy:policy, hosts:string[]):Observable<any>{
    if(hosts.length==0)
    policy.hosts = JSON.parse(localStorage.getItem('firewalls') || 'default value');
    else this.timeout.hosts=hosts;
    return this.firewallsPostService.addPolicy(policy,this.headers)
  }

  setTimeout(data:any, hosts:string[]):Observable<any>{
    this.myLoading=true;
    this.timeout.timeout=data;
    if(hosts.length==0)
    this.timeout.hosts = JSON.parse(localStorage.getItem('firewalls') || 'default value');
    else this.timeout.hosts=hosts;
   return this.firewallsPostService.setTimeout(this.timeout,this.headers)
  }


  getPolicys(data:any){
    if(data[0]!="Individuals"){
      data=JSON.parse(localStorage.getItem(data[0])!);
    }
    this.myLoading=true;
    this.firewallsGetService.getPolicys(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }

  getServiceObject(data:any){
    if(data[0]!="Individuals"){
      data=JSON.parse(localStorage.getItem(data[0])!);
    }
    this.myLoading=true;
    this.firewallsGetService.getServiceObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;
      
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }

  getServiceGrpObject(data:any){
    if(data[0]!="Individuals"){
      data=JSON.parse(localStorage.getItem(data[0])!);
    }
    this.myLoading=true;
    this.firewallsGetService.getServiceGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;
      
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }

  getAddressObject(data:any){
    if(data[0]!="Individuals"){
      data=JSON.parse(localStorage.getItem(data[0])!);
    }
    this.myLoading=true;
    this.firewallsGetService.getAddressObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;
      
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }

  getAddressGrpObject(data:any){
    if(data[0]!="Individuals"){
      data=JSON.parse(localStorage.getItem(data[0])!);
    }
    this.myLoading=true;
    this.firewallsGetService.getAddressGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;      
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }

  getBackup(data:any){
    this.myLoading=true;
    this.firewallsGetService.getBackup(data,()=> this.myLoading=false,this.headers);
  }


getTimeout(data:string[]){
    this.myLoading=true;
    this.firewallsGetService.getTimeout(data,this.headers).subscribe((output)=>{
      console.log(output);
      
      this.myLoading=false;
    }
    ,(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
}

  onPopAddPolicy(){
    this.popupaddpolicy=!this.popupaddpolicy;
 }

  onItemSelect(event: any, item: string) {
    if (event.target.checked) {
      // Add item to selectedItems array
      this.individualsList.push(item);
    } else {
      // Remove item from selectedItems array
      const index = this.individualsList.indexOf(item);
      if (index !== -1) {
        this.individualsList.splice(index, 1);
      }
    }
    this.itemIsSelected();
   
    
  }
 itemIsSelected(){
  if(this.individualsList.length !=0){
    this.itemSelected=true;
  }
  else{
    this.itemSelected=false;
  }
 }

 createReport(data:any){
  
  this.myLoading=true;
  this.reportService.createReport(data,this.headers).then((alertObjects)=>{
      console.log(alertObjects);
      this.myLoading=false;     
      
  },(error)=>{
    this.myLoading=false;
    alert("there has been an error please try again")
  }
  )

 }

 showSiteHosts(site:string){
   //this.myLoading=true;
   this.firewalls=[site];
   localStorage.setItem('firewalls', JSON.stringify(this.firewalls));
   console.log(this.firewalls);
  // this.service.getNeighbors(site,this.headers,()=>{}).subscribe((data)=>{
  //   this.myLoading=false;
  //   localStorage.setItem('lastSite',site)
  //   this.route.navigate(["/per-country-or-group-firewalls"]);
  // });
  
  
 }
 showIndividuals(){
  this.firewalls=[];
  this.firewalls.push("Individuals")
  this.individualsList.map((item)=>{
    this.firewalls.push(item);
  })
  localStorage.setItem('firewalls', JSON.stringify(this.firewalls));
  console.log(this.firewalls);
  
 }

}
