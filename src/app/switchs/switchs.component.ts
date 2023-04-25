
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackendService } from '../services/backend.service';
import { baseUrl } from '../shared/baseUrl';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button'
import { FirewallsComponent } from '../firewalls/firewalls.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ifError } from 'assert';
import { alertObj, issueObj } from '../shared/switchs-models';
import { NetworkTopologyService } from '../services/network-topology.service';
import { option } from 'vis-util';

interface Neighbors {
  [key: string]: string[];
}

interface IssueObjList {
  [key: string]: issueObj[];
}
interface IssueMap {
  [key: string]: string;
}

interface HostLists {
  [key: string]: String[];
}

@Component({
  selector: 'app-switchs',
  templateUrl: './switchs.component.html',
  styleUrls: ['./switchs.component.scss']
})
@Injectable({
  providedIn: 'root'
})

export class SwitchsComponent implements OnInit {
  
  isAccepted = false;
  isDenied = false;
  itemSelected=false;
  panelOpen = false;
  myLoading= false;
  contentList=[0,0,0];
  individualsList:String[]=[];
  hosts:String[]=[];
  selectedItem:String="";
  hoveredIndex = -1;
  headers:any;
  sites:string[]=["Morocco_switchs","Tunisia_switchs"];
  siteHosts: HostLists={"Tunisia_switchs":[],"Morocco_switchs": [] }
  alertObjList:alertObj[]=[];
  issue:IssueObjList = {};
  issuemap:IssueMap= {};
  neigh:Neighbors = {};

  constructor(private topologyService:NetworkTopologyService, private route:Router, private service:BackendService ) { 
    this.hosts = JSON.parse(localStorage.getItem('hosts')!);
  }

  ngOnInit(): void {
    
  
   this.headers = new HttpHeaders({
    'user': localStorage.getItem("user")!,
    Authorization: "Bearer "+ localStorage.getItem("usertoken"),
  });
  
   
    Object.entries(this.siteHosts).forEach(([key,value])=>{     
      if(JSON.parse(localStorage.getItem(key)!)==null){   
        this.service.getHosts(key.split("_")[0],this.headers,"/api/switchs/post/triggerGetSwitchs/").subscribe(
          (data:String[])=>{
            this.siteHosts[key]=data;
            this.siteHosts[key]= this.siteHosts[key].map(item => item.replace(/"/g, ''));
            localStorage.setItem(key,JSON.stringify(this.siteHosts[key]))
            
          }, (error)=>{alert("there has been an error please try again")}
          );
          
        } 
        else this.siteHosts[key]=JSON.parse(localStorage.getItem(key)!);
      });    
      
  
   
  
 //this.sites[this.sites.indexOf('Morocco_switchs')]
  }
addDevice(data:any){
    this.myLoading=true;
    this.service.addDevice(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{alert("there has been an error please try again")}
    )
  }

networkTopology(){
  this.myLoading=true;
  this.changeContent(1);
  this.service.getNeighbors(localStorage.getItem("lastSite")!,this.headers,()=>{}).subscribe((data)=>{
  this.myLoading=false;
  this.neigh=data;
  this.topologyService.buildTopology(this.neigh); 

 },(error)=>{
  this.myLoading=false;
  alert("there has been an error please try again")
}
 )   
}

  
  onAcceptClick() {
    this.isAccepted = true;
    this.isDenied = false;
  }

  onDenyClick() {
    this.isAccepted = false;
    this.isDenied = true;
  }
  onItemSelect(event: any, item: String) {
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
    console.log(this.individualsList);
    console.log(this.itemSelected);
    
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
  this.myLoading=true;
  this.hosts=[site];
  localStorage.setItem('hosts', JSON.stringify(this.hosts));
  console.log(this.hosts);
  this.service.getNeighbors(site,this.headers,()=>{}).subscribe((data)=>{
    this.myLoading=false;
    localStorage.setItem('lastSite',site)
    this.route.navigate(["/per-country-or-group"]);

  },(error)=>{
    this.myLoading=false;
    alert("there has been an error please try again")
  }
  );
  
 }
 showIndividuals(){
  this.hosts=["Individuals"];
  this.individualsList.map((item)=>{
    this.hosts.push(item);
  })
  localStorage.setItem('hosts', JSON.stringify(this.hosts));
  this.route.navigate(["/per-country-or-group"]);
 }


 changeContent(data:any){
  this.contentList = this.contentList.map(num => num === 1 ? 0 : num);
  this.contentList[data]=1;
  console.log(this.contentList);

}
setGlobalConfig(data:string,hosts:any){
  this.myLoading=true;
  this.service.setGlobalConfig(data,hosts,this.headers).subscribe(()=>{
     this.myLoading=false;

  },(error)=>{
    this.myLoading=false;
    alert("there has been an error please try again")
  }
  )
}

 createReport(data:any){
  
  this.myLoading=true;
  this.service.createReport(data,this.headers).then((alertObjects)=>{
      console.log(alertObjects);
      this.myLoading=false;     
      
  },(error)=>{
    this.myLoading=false;
    alert("there has been an error please try again")
  }
  )

 }
 

  
}

