import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { SwitchsComponent } from '../switchs/switchs.component';
import { AnyForUntypedForms, FormControl,FormGroup } from '@angular/forms';
import { vlan,vlanInt,trunk, VlanInfo, IntInfo } from '../shared/switchs-models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { data, DataSet, Network } from 'vis-network/standalone';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import vis from 'vis-network/declarations/index-legacy-bundle';
import { Terminal } from 'xterm';
import { HttpHeaders } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { TerminalService } from '../services/terminal.service';
import { NetworkTopologyService } from '../services/network-topology.service';

interface Neighbors {
  [key: string]: string[];
}

@Component({
  selector: 'app-per-country-or-group',
  templateUrl: './per-country-or-group.component.html',
  styleUrls: ['./per-country-or-group.component.scss']
})
export class PerCountryOrGroupComponent implements OnInit {

   
  
  country:String="";
  hosts:String[]=[];
  shownHosts:String[]=[];
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
  neigh:Neighbors = {};
  arch=true;

  
  constructor(private topologyService:NetworkTopologyService, private service:BackendService, private route:Router) {
    this.hosts = JSON.parse(localStorage.getItem('hosts')!);
    this.country=this.hosts[0];
    this.shownHosts=this.hosts.slice(1,this.hosts.length);
    
   }


   
  ngOnInit(): void {
   
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: "Bearer "+ localStorage.getItem("usertoken"),
      user: "bahri"
    }); 
    
      this.myLoading=true;
      this.service.getNeighbors(localStorage.getItem("lastSite")!,this.headers,()=>{}).subscribe((data)=>{
      this.myLoading=false;
      this.neigh=data;
      this.topologyService.buildTopology(this.neigh);
     })      
  

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
      
  }

 
  
GetLineCompliance(data:any){
  this.myLoading=true;
  this.service.triggerLineCompliance(data,this.headers).subscribe(()=> this.myLoading=false);
}
GetPortCompliance(data:any){
  this.myLoading=true;
  this.service.triggerPortCompliance(data,this.headers).subscribe((output)=> {
    this.myLoading=false;

  },(error)=>{
    this.myLoading=false;
    alert("there has been an error please try again")
  }
  )
    
  }


onSaveAddVlanInt(data:any){

    this.vlanInt.vlanId=data.vlanId;
    this.vlanInt.subnet=data.subnet;
    this.vlanInt.ipAddress=data.ipAddress;
    this.vlanInt.hosts = JSON.parse(localStorage.getItem('hosts')!);
    this.myLoading=true;
    this.service.addVlanInt(this.vlanInt,()=> this.myLoading=false,this.headers);
    
    
     }
onSaveDelVlanInt(data:any){

      this.vlanInt.vlanId=data.vlanId;
      this.vlanInt.subnet=data.subnet;
      this.vlanInt.ipAddress=data.ipAddress;
      this.vlanInt.hosts = JSON.parse(localStorage.getItem('hosts')!);
      this.myLoading=true;
      this.service.delVlanInt(this.vlanInt,()=> this.myLoading=false,this.headers);
      
       }
onSaveAddVlan(data:any){
    
        this.vlan.vlanId=data.vlanId;
        this.vlan.vlanName=data.vlanName;
        this.vlan.hosts= JSON.parse(localStorage.getItem('hosts')!);
        this.myLoading=true;
        this.service.addVlan(this.vlan,()=> this.myLoading=false,this.headers);
        
         }

onSaveDelVlan(data:any){
    
       this.vlan.vlanId=data.vlanId;
       this.vlan.vlanName=data.vlanName;
       this.vlan.hosts = JSON.parse(localStorage.getItem('hosts')!);
       this.myLoading=true;
       this.service.delVlan(this.vlan,()=> this.myLoading=false,this.headers);
          
 }
 onSaveAssignIntToVlan(data:any){
       this.vlan.vlanId=data.vlanId;
       this.vlan.intId=data.intId;
       this.vlan.intType=data.intType;
       this.vlan.hosts = JSON.parse(localStorage.getItem('hosts')!);
       this.myLoading=true;
       this.service.assignIntToVlan(this.vlan,()=> this.myLoading=false,this.headers);
}


onSaveConfigTrunk(data:any){

  this.trunk.intId=data.intId;
  this.trunk.intType=data.intType;
  this.trunk.allowedVlans=data.allowedVlans;
  this.trunk.hosts= JSON.parse(localStorage.getItem('hosts')!);
  this.myLoading=true;
  this.service.configTrunk(this.trunk,()=> this.myLoading=false,this.headers);
}
onSaveAddVlansToTrunk(data:any){

  this.trunk.intId=data.intId;
  this.trunk.intType=data.intType;
  this.trunk.allowedVlans=data.allowedVlans;
  this.trunk.hosts = JSON.parse(localStorage.getItem('hosts')!);
  this.myLoading=true;
  this.service.addVlansToTrunk(this.trunk,()=> this.myLoading=false,this.headers);
 // this.myLoading=false;
}
onSaveSetBridgePriority(data:any){

  this.trunk.vlanId=data.vlanId;
  this.trunk.priority=data.priority;
  this.trunk.hosts = JSON.parse(localStorage.getItem('hosts')!);
  this.myLoading=true;
  this.service.setBridgePriority(this.trunk,()=> this.myLoading=false,this.headers);
}


onSaveNoShutDownInt(data:any){

  this.vlanInt.vlanId=data.vlanId;
  this.vlanInt.hosts= JSON.parse(localStorage.getItem('hosts')!);
  this.myLoading=true;
  this.service.NoShutDownInt(this.vlanInt,()=> this.myLoading=false,this.headers);
}
onSaveShutDownInt(data:any){

  this.vlanInt.vlanId=data.vlanId;
  this.vlanInt.hosts = JSON.parse(localStorage.getItem('hosts')!);
  this.myLoading=true;
  this.service.ShutDownInt(this.vlanInt,()=> this.myLoading=false,this.headers);
  

}

onHostClickShowVlans(data:any){
 if(this.panelOpen==false){
  if(localStorage.getItem(data+" vlanInfo")==null)  {
 this.myLoading=true;
  this.service.triggerGetVlans(data,this.headers).subscribe(output =>{
    localStorage.setItem(data+" vlanInfo",JSON.stringify(output));
    this.currVlanInfo=output;
    this.myLoading=false;

  },(error)=>{
    this.myLoading=false;
    alert("there has been an error please try again")
  })
  }
  else{
   this.currVlanInfo=JSON.parse(localStorage.getItem(data+" vlanInfo")!);
   console.log(this.currVlanInfo[0].status);
   console.log("this is else");
   
  }
}
}
onHostClickShowInt(data:any){
  if(this.panelOpen==false){
  if (localStorage.getItem(data+" IntInfo")==null){
    this.myLoading=true;
  this.service.triggerGetIntInfo(data,this.headers).subscribe(output =>{
    localStorage.setItem(data+" IntInfo",JSON.stringify(output));
    this.currIntInfo=output;
      this.myLoading=false; 

    },(error)=>{
      this.myLoading=false;
      alert("there has been an error please try again")
    }
    )
     }
console.log(this.currIntInfo);

}  
   else{
    this.currIntInfo=JSON.parse(localStorage.getItem(data+" IntInfo")!);  
    console.log('4');
    this.myLoading=false;
        
   }
  }
  getBackUp(data:any){
    this.myLoading=true;
    this.service.getBackup(data,()=> this.myLoading=false,this.headers);
  }


saveToStartUpConfig(){
  this.myLoading=true;
  this.service.saveToStartUpConfig(()=> this.myLoading=false,this.headers);
}

onPopAddVlanInt(){
    this.popupaddvlanint=!this.popupaddvlanint;
 }
onPopDelVlanInt(){
  this.popupdelvlanint=!this.popupdelvlanint;
}
onPopAddVlan(){
  this.popupaddvlan=!this.popupaddvlan;
}
onPopDelVlan(){
  this.popupdelvlan=!this.popupdelvlan;
}
onPopAssignIntToVlan(){
  this.popupassigninttovlan=!this.popupassigninttovlan;
}
onPopConfigTrunk(){
  this.popupconfigtrunk=!this.popupconfigtrunk;
}
onPopAddVlansToTrunk(){
  this.popupaddvlanstotrunk=!this.popupaddvlanstotrunk;
}
onPopSetBridgePriority(){
  this.popupsetbridgepriority=!this.popupsetbridgepriority    ;
}
onPopNoShutDownInt(){
  this.popupnoshutdownint=!this.popupnoshutdownint;
}
onPopShutDownInt(){
  this.popupshutdownint=!this.popupshutdownint;
}


}
