import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { SwitchesGetService } from '../services/switches-get.service';
import { SwitchesPostService } from '../services/switches-post.service';



interface HostLists {
  [key: string]: String[];
}

@Component({
  selector: 'app-switches-vlans',
  templateUrl: './switches-vlans.component.html',
  styleUrls: ['./switches-vlans.component.scss']
})
export class SwitchesVlansComponent implements OnInit {

 
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

  arch=true;
  

  constructor(private topologyService:NetworkTopologyService,
    private route:Router,
    private switchesGetService:SwitchesGetService,
    private switchesPostService:SwitchesPostService,
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
      
   this.onHostClickShowVlans("192.168.254.18")
  }
  



addDevice(data:any){
    this.myLoading=true;
    this.switchesPostService.addDevice(data,this.headers).subscribe((data)=>{
      console.log(data);
      this.myLoading=false;  
    },(error)=>{alert("there has been an error please try again")}
    )
  }

saveToStartUpConfig(){
    this.myLoading=true;
    this.switchesPostService.saveToStartUpConfig(()=> this.myLoading=false,this.headers);
  }
 
onSaveAddVlan(data:any){
    
        this.vlan.vlanId=data.vlanId;
        this.vlan.vlanName=data.vlanName;
        this.vlan.hosts= JSON.parse(localStorage.getItem('hosts')!);
        this.myLoading=true;
        this.switchesPostService.addVlan(this.vlan,()=> this.myLoading=false,this.headers);
        
         }

onSaveDelVlan(data:any){
    
       this.vlan.vlanId=data.vlanId;
       this.vlan.vlanName=data.vlanName;
       this.vlan.hosts = JSON.parse(localStorage.getItem('hosts')!);
       this.myLoading=true;
       this.switchesPostService.delVlan(this.vlan,()=> this.myLoading=false,this.headers);
          
 }
 onSaveAssignIntToVlan(data:any){
       this.vlan.vlanId=data.vlanId;
       this.vlan.intId=data.intId;
       this.vlan.intType=data.intType;
       this.vlan.hosts = JSON.parse(localStorage.getItem('hosts')!);
       this.myLoading=true;
       this.switchesPostService.assignIntToVlan(this.vlan,()=> this.myLoading=false,this.headers);
}

onHostClickShowVlans(data:any){
  if(this.panelOpen==false){
   if(localStorage.getItem(data+" vlanInfo")==null)  {
  this.myLoading=true;
   this.switchesGetService.triggerGetVlans(data,this.headers).subscribe(output =>{
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








}
