
import { Component, OnInit } from '@angular/core';
import {NavigationEnd,Router} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { alertObj, issueObj } from '../../shared/switchs-models';
import { NetworkTopologyService } from '../../services/network-topology.service';
import { SwitchesGetService } from '../../services/switches-get.service';
import { SwitchesPostService } from '../../services/switches-post.service';
import { SwitchesVlansComponent } from '../switches-vlans/switches-vlans.component';
import { SwitchesInterfacesComponent } from '../switches-interfaces/switches-interfaces.component';
import { SwitchesSystemConfComponent } from '../switches-system-conf/switches-system-conf.component';
import { ReportSwitchesComponent } from '../report-switches/report-switches.component';
import { CreateReportSwitchesService } from '../../services/create-report-switches.service';
import { vlan,vlanInt,trunk, VlanInfo, IntInfo } from '../../shared/switchs-models';
import { filter } from 'rxjs/operators';




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


  showFiller = true;
  panelOpenState = false;

  itemSelected=false;
  expanded = true;
  myLoading= false;
  contentList=[0,0,0,0,0,0,0,0,0,0];
  individualsList:string[]=[];
  hosts:string[]=[];
  selectedItem:String="";
  hoveredIndex = -1;
  headers:any;
  sites:string[]=["Morocco_switchs","Tunisia_switchs"];
  siteHosts: HostLists={"Tunisia_switchs":[],"Morocco_switchs": [] }
  alertObjList:alertObj[]=[];
  issue:IssueObjList = {};
  issuemap:IssueMap= {};
  neigh:Neighbors = {};
  vlanInfo:VlanInfo=new VlanInfo;
  currVlanInfo:VlanInfo[]=[];
  currIntInfo:IntInfo[]=[];
  selectingHost=false;
  subject:string="";

  constructor(private topologyService:NetworkTopologyService,
    private router:Router,
    private switchesGetService:SwitchesGetService,
    private switchesPostService:SwitchesPostService,
    private reportService:CreateReportSwitchesService
     ){

    this.hosts = JSON.parse(localStorage.getItem('hosts')!);
  }

  ngOnInit(): void {
    
    
   this.headers = new HttpHeaders({
    'user': localStorage.getItem("user")!,
    Authorization: "bearer "+ localStorage.getItem("usertoken"),
  });
   this.subject=this.router.url.split("/")[2]+"/"+this.router.url.split("/")[3];
   this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe((event:any) => {
    console.log('Current URL:', event.url);
    this.selectingHost=!this.selectingHost;    
      localStorage.setItem('subject',event.url.split("/")[2]+"/"+event.url.split("/")[3]);
      this.subject=event.url.split("/")[2]+"/"+event.url.split("/")[3];
      console.log(event.url);      
   
  });
   
   
    Object.entries(this.siteHosts).forEach(([key,value])=>{     
      if(JSON.parse(localStorage.getItem(key)!)==null){   
        this.switchesGetService.getHosts(key.split("_")[0],this.headers,"/api/switchs/post/triggerGetSwitchs/").subscribe(
          (data:string[])=>{
            this.siteHosts[key]=data;
            this.siteHosts[key]= this.siteHosts[key].map(item => item.replace(/"/g, ''));
            localStorage.setItem(key,JSON.stringify(this.siteHosts[key]))
           // this.router.navigate(['/switchs/topology']);
          }, (error)=>{alert("there has been an error please try again")}
          );
          
        } 
        else this.siteHosts[key]=JSON.parse(localStorage.getItem(key)!);
      //  this.router.navigate(['/switchs/topology']);
      });    
     
      
  }

 




getBackUp(){
  this.myLoading=true;
  this.switchesGetService.getBackup([this.router.url.split("/")[3]],()=> this.myLoading=false,this.headers);
}


 setCurrentSite(site:string){
  this.hosts=[site];
  localStorage.setItem('hosts', JSON.stringify(this.hosts));
  //console.log(this.hosts);
  //this.networkTopology()
  localStorage.setItem('currentSite',site);  
 }
selectSubject(subject:string){
  
  localStorage.setItem('subject',subject);
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe((event:any) => {
    console.log('Current URL:', event.url);
    this.selectingHost=!this.selectingHost;    
      localStorage.setItem('subject',event.url.split("/")[2]+"/"+event.url.split("/")[3]);
      this.subject=event.url.split("/")[2]+"/"+event.url.split("/")[3];
      console.log(event.url);      
   
  });
  
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

itemSelect(){
  this.itemSelected=!this.itemSelected;
  console.log(this.itemSelected);
  
}

 

  
}

