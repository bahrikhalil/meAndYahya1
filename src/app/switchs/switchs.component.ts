
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { alertObj, issueObj } from '../shared/switchs-models';
import { NetworkTopologyService } from '../services/network-topology.service';
import { SwitchesGetService } from '../services/switches-get.service';
import { SwitchesPostService } from '../services/switches-post.service';
import { SwitchesVlansComponent } from '../switches-vlans/switches-vlans.component';
import { SwitchesInterfacesComponent } from '../switches-interfaces/switches-interfaces.component';
import { SwitchesSystemConfComponent } from '../switches-system-conf/switches-system-conf.component';
import { ReportSwitchesComponent } from '../report-switches/report-switches.component';
import { CreateReportSwitchesService } from '../services/create-report-switches.service';
import { vlan,vlanInt,trunk, VlanInfo, IntInfo } from '../shared/switchs-models';


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
  [key: string]: string[];
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
  contentList=[0,0,0,0,0,0,0,0,0,0];
  individualsList:string[]=[];
  hosts:string[]=[];
  selectedItem:String="";
  hoveredIndex = -1;
  headers:any;
  sites:string[]=["Morocco_switchs","Tunisia_switchs"];
  siteHosts: HostLists={"Tunisia_switchs":[],"Morocco_switchs": [] }
  currentSite:string="Morocco_switchs";
  alertObjList:alertObj[]=[];
  issue:IssueObjList = {};
  issuemap:IssueMap= {};
  neigh:Neighbors = {};
  vlanInfo:VlanInfo=new VlanInfo;
  currVlanInfo:VlanInfo[]=[];
  currIntInfo:IntInfo[]=[];

  constructor(private topologyService:NetworkTopologyService,
    private route:Router,
    private switchesGetService:SwitchesGetService,
    private switchesPostService:SwitchesPostService,
    private reportService:CreateReportSwitchesService
     ){

    this.hosts = JSON.parse(localStorage.getItem('hosts')!);
  }

  ngOnInit(): void {
    
  
   this.headers = new HttpHeaders({
    'user': localStorage.getItem("user")!,
    Authorization: "Bearer "+ localStorage.getItem("usertoken"),
  });
  
  
   
    Object.entries(this.siteHosts).forEach(([key,value])=>{     
      if(JSON.parse(localStorage.getItem(key)!)==null){   
        this.switchesGetService.getHosts(key.split("_")[0],this.headers,"/api/switchs/post/triggerGetSwitchs/").subscribe(
          (data:string[])=>{
            this.siteHosts[key]=data;
            this.siteHosts[key]= this.siteHosts[key].map(item => item.replace(/"/g, ''));
            localStorage.setItem(key,JSON.stringify(this.siteHosts[key]))
            
          }, (error)=>{alert("there has been an error please try again")}
          );
          
        } 
        else this.siteHosts[key]=JSON.parse(localStorage.getItem(key)!);
      });    
      console.log(this.siteHosts);
      
  }

 


networkTopology(){
  this.myLoading=true;
  this.changeContent(1);
  this.switchesGetService.getNeighbors(localStorage.getItem("currentSite")!,this.headers,()=>{}).subscribe((data)=>{
  this.myLoading=false;
  this.neigh=data;
  this.topologyService.buildTopology(this.neigh); 

 },(error)=>{
  this.myLoading=false;
  alert("there has been an error please try again")
}
 )   
}

getBackUp(data:any){
  this.myLoading=true;
  this.switchesGetService.getBackup(data,()=> this.myLoading=false,this.headers);
}


 setCurrentSite(site:string){
  this.hosts=[site];
  localStorage.setItem('hosts', JSON.stringify(this.hosts));
  //console.log(this.hosts);
  //this.networkTopology()
  localStorage.setItem('currentSite',site);  
 }
 setCurrentHost(host:string,contentNum:number){
  this.hosts=["Individuals",host];
  localStorage.setItem('hosts', JSON.stringify(this.hosts));
  localStorage.setItem('currentHost',host);  
  console.log(this.hosts);
  this.changeContent(contentNum);
 }
 showIndividuals(){
  this.hosts=["Individuals"];
  this.individualsList.map((item)=>{
    this.hosts.push(item);
  })
  localStorage.setItem('hosts', JSON.stringify(this.hosts));
 }


 changeContent(data:any){
  this.contentList = this.contentList.map(num => num === 1 ? 0 : num);
  this.contentList[data]=1;

}



 

  
}

