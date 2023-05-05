import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
import { CreateReportSwitchesService } from '../../services/create-report-switches.service';
import { vlan,vlanInt,trunk, VlanInfo, IntInfo } from '../../shared/switchs-models';
import { MatIconModule } from '@angular/material/icon';

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
  selector: 'app-report-switches',
  templateUrl: './report-switches.component.html',
  styleUrls: ['./report-switches.component.scss']
})
export class ReportSwitchesComponent implements OnInit {

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
      Authorization: "bearer "+ localStorage.getItem("usertoken"),
    });
    
   this.createReport(this.hosts);
   
   
   
  }
  createReport(data:any){
  
    if(localStorage.getItem(this.route.url.split('/')[3]+ "alertObjList")==null){
    this.myLoading=true;
    this.reportService.createReport(data,this.headers).then((alertObjects)=>{
        console.log(alertObjects);
        this.alertObjList=alertObjects;   
        localStorage.setItem(this.route.url.split('/')[3]+ "alertObjList",JSON.stringify(this.alertObjList));  
        this.myLoading=false;   
        
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    })
    }
    else{
      this.alertObjList=JSON.parse(localStorage.getItem(this.route.url.split('/')[3]+ "alertObjList")!);
    }
   }

   redirectToFix(subjectType:string){

      console.log(this.route.url.split('/')[3]);
      
      if(subjectType=="system" || subjectType=="ACL"){
       this.route.navigate(['switchs/switch-system'+'/'+this.route.url.split('/')[3]]).catch((error)=>{
        console.log("error");
        
       });
      }
    
      else if(subjectType='interface'){
        this.route.navigate(['switchs/interfaces/'+'/'+this.route.url.split('/')[3]]).catch((error)=>{
          console.log("error");
          
        });
      }
   }

  

}
