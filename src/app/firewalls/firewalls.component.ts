import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { Callback } from 'ssh2';
import { FirewallsService } from '../services/firewalls.service';
import { policy, alertObj, timeoutObj } from '../shared/firewalls-models';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button'
import { SwitchsComponent } from '../switchs/switchs.component';
import { Observable } from 'rxjs';



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

  constructor(private http:HttpClient, private route:Router, private service:FirewallsService ) { 
  
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
        
        this.service.getHosts(key.split("_")[0],this.headers,"/api/firewalls/post/triggerGetFirewalls/").subscribe(
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
    this.service.addDevice(data1,this.headers).subscribe((data)=>{
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
    this.service.addPolicy(this.policy,this.headers).subscribe((data)=>{
      console.log("done");
      
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }

  delPolicy(data:any){
    this.myLoading=true;
    this.service.delPolicy(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  addServiceObject(data:any){
    this.myLoading=true;
    this.service.addServiceObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  delServiceObject(data:any){
    this.myLoading=true;
    this.service.delServiceObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  addAddressGrpObject(data:any){
    this.myLoading=true;
    this.service.addAddressGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  delAddressGrpObject(data:any){
    this.myLoading=true;
    this.service.delAddressGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  addServiceGrpObject(data:any){
    this.myLoading=true;
    this.service.addServiceGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }
  delServiceGrpObject(data:any){
    this.myLoading=true;
    this.service.delServiceGrpObject(data,this.headers).subscribe((data)=>{
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
    return this.service.addPolicy(policy,this.headers)
  }

  setTimeout(data:any, hosts:string[]):Observable<any>{
    this.myLoading=true;
    this.timeout.timeout=data;
    if(hosts.length==0)
    this.timeout.hosts = JSON.parse(localStorage.getItem('firewalls') || 'default value');
    else this.timeout.hosts=hosts;
   return this.service.setTimeout(this.timeout,this.headers)
  }


  getPolicys(data:any){
    if(data[0]!="Individuals"){
      data=JSON.parse(localStorage.getItem(data[0])!);
    }
    this.myLoading=true;
    this.service.getPolicys(data,this.headers).subscribe((data)=>{
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
    this.service.getServiceObject(data,this.headers).subscribe((data)=>{
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
    this.service.getServiceGrpObject(data,this.headers).subscribe((data)=>{
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
    this.service.getAddressObject(data,this.headers).subscribe((data)=>{
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
    this.service.getAddressGrpObject(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;      
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
  }

  getBackup(data:any){
    this.myLoading=true;
    this.service.getBackup(data,()=> this.myLoading=false,this.headers);
  }

  

createReport(data:string[]){

   // set the list of hosts to be sent , remove the first item for the backend functions that will not use
   // ansible playbook (no need for the first element that contains the group name, only hosts needed)
    if(data[0]!="Individuals"){
      data=JSON.parse(localStorage.getItem(data[0])!);
    }
    else{
      data.shift();
    }
   
  this.myLoading=true;
  let promisesList1:any=[];
  let promisesList2:any=[];
  // start the first compliance check (policys)
  const promise1 = new Promise((resolve1,reject1) => {
  this.service.getPolicys(data,this.headers).subscribe((output)=>{
    this.policys=output;
    Object.entries(this.policys).forEach(([key,value])=>{
      value.forEach((element)=>{
      if((element.dstaddr=="all") || (element.srcaddr=="all") || (element.srcintf=="all") || (element.dstintf=="all")) {
          if(element.status=="enable"){
            element.status="disable";              
            const promise = new Promise((resolve,reject) => {
            this.editPolicy(element,["Individuals",key]).subscribe((response)=>{
              let alertObj1:alertObj = this.service.createAlertObj("policy",element.name,"source and destination addresses and ports should be specified","TO BE FIXED MANNUALLY: all policys have been disabled, please specify the addresses/ports",key)
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
    this.service.getTimeout(data,this.headers).subscribe((output1)=>{
        console.log(output1);      
        Object.entries(output1).forEach(([key,value])=>{
        if(parseInt(value)==10){
          const promise = new Promise((resolve,rejects) => {
            this.setTimeout("10",["Individuals",key]).subscribe((response)=>{
              let alertObj1:alertObj = this.service.createAlertObj("system config","admin timeout","admin timeout : ("+value+") should be less than 10mn","FIXED : admin timeout set to 10mn, please chose your custom value",key);       
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
        this.service.getPortsCompliance(data,this.headers).subscribe((output2)=>{
          
          Object.entries(output2).forEach(([key,value])=>{
            if(value.length>0){
              let alertObj1:alertObj = this.service.createAlertObj("ports config","allowaccess list","","",key);
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
        
                 
   
    Promise.all(promisesList1)
    .then(() => {
      Promise.all(promisesList2)
    .then(() => {
      this.myLoading = false;
      console.log(this.alertObjList);
      
    })
    .catch(() => {
      this.myLoading = false;
    });
      
    })
    .catch(() => {
      
    });
   
  
     
 
  
}

getTimeout(data:string[]){
    this.myLoading=true;
    this.service.getTimeout(data,this.headers).subscribe((output)=>{
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
