import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
import { FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

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
  selector: 'app-switches-system-conf',
  templateUrl: './switches-system-conf.component.html',
  styleUrls: ['./switches-system-conf.component.scss']
})
export class SwitchesSystemConfComponent implements OnInit {

  country:string="";
  hosts:string[]=[];
  shownHosts:string[]=[];
  formdata:any;
  vlanInfo:VlanInfo=new VlanInfo;
  currVlanInfo:VlanInfo[]=[];
  currIntInfo:IntInfo[]=[];
  myLoading= false;
  popupaddvlanint=false;
  popupdelvlanint=false;
  popupassigninttovlan=false;
  popupnoshutdownint=false;
  popupshutdownint=false;
  popupsetbridgepriority=false;
  popupconfigtrunk=false;
  popupaddvlanstotrunk=false;
  popupaddvlan=false;
  popupdelvlan=false;
  panelOpen = false;
  showvlantable=false;
  openTerm=false;
  vlan:vlan= new vlan();
  vlanInt:vlanInt= new vlanInt();
  trunk:trunk= new trunk();
  headers:any;

  constructor(private topologyService:NetworkTopologyService,
    private route:Router,
    private switchesGetService:SwitchesGetService,
    private switchesPostService:SwitchesPostService,
    private reportService:CreateReportSwitchesService
     ){

    this.hosts = JSON.parse(localStorage.getItem('hosts')!);
  }

  ngOnInit(): void {

    this.formdata= new FormGroup({
      ipAddress: new FormControl(""),
      subnet: new FormControl(""),
      vlanId: new FormControl(""),
      vlanName: new FormControl(""),
      intType: new FormControl(""),
      intId: new FormControl(""),
      allowedVlans: new FormControl(""),
      priority: new FormControl(""),
      portType: new FormControl("")

   });
   this.headers = new HttpHeaders({
    'user': localStorage.getItem("user")!,
    Authorization: "Bearer "+ localStorage.getItem("usertoken"),
  });


  this.switchesGetService.triggerSystemCompliance(this.hosts,this.headers).subscribe((data)=>{
    console.log(data);    
  },
  (error)=>{
   console.log(error);
    
  });
  this.switchesGetService.getACL(this.hosts[1],this.headers).subscribe((data)=>{
    console.log(data);   
  },
  (error)=>{
    console.log(error);
    
  });
  }

  onSaveSetBridgePriority(data:any){

    this.trunk.vlanId=data.vlanId;
    this.trunk.priority=data.priority;
    this.trunk.hosts = JSON.parse(localStorage.getItem('hosts')!);
    this.myLoading=true;
    this.switchesPostService.setBridgePriority(this.trunk,()=> this.myLoading=false,this.headers);
  }

  getBackUp(data:any){
    this.myLoading=true;
    this.switchesGetService.getBackup(data,()=> this.myLoading=false,this.headers);
  }
  setGlobalConfig(data:string,hosts:any){
    this.myLoading=true;
    this.switchesPostService.setGlobalConfig(data,hosts,this.headers).subscribe(()=>{
       this.myLoading=false;
  
    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    }
    )
  }

}
