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
import { FormGroup, FormControl } from '@angular/forms';

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
  selector: 'app-switches-interfaces',
  templateUrl: './switches-interfaces.component.html',
  styleUrls: ['./switches-interfaces.component.scss']
})
export class SwitchesInterfacesComponent implements OnInit {

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

   this.onHostClickShowInt(localStorage.getItem("currentHost")!);
  }

  onSaveAddVlanInt(data:any){

    this.vlanInt.vlanId=data.vlanId;
    this.vlanInt.subnet=data.subnet;
    this.vlanInt.ipAddress=data.ipAddress;
    this.vlanInt.hosts = JSON.parse(localStorage.getItem('hosts')!);
    this.myLoading=true;
    this.switchesPostService.addVlanInt(this.vlanInt,()=> this.myLoading=false,this.headers);
    
    
     }
onSaveDelVlanInt(data:any){

      this.vlanInt.vlanId=data.vlanId;
      this.vlanInt.subnet=data.subnet;
      this.vlanInt.ipAddress=data.ipAddress;
      this.vlanInt.hosts = JSON.parse(localStorage.getItem('hosts')!);
      this.myLoading=true;
      this.switchesPostService.delVlanInt(this.vlanInt,()=> this.myLoading=false,this.headers);
      
       }

       onSaveConfigTrunk(data:any){

        this.trunk.intId=data.intId;
        this.trunk.intType=data.intType;
        this.trunk.allowedVlans=data.allowedVlans;
        this.trunk.hosts= JSON.parse(localStorage.getItem('hosts')!);
        this.myLoading=true;
        this.switchesPostService.configTrunk(this.trunk,()=> this.myLoading=false,this.headers);
      }
      onSaveAddVlansToTrunk(data:any){
      
        this.trunk.intId=data.intId;
        this.trunk.intType=data.intType;
        this.trunk.allowedVlans=data.allowedVlans;
        this.trunk.hosts = JSON.parse(localStorage.getItem('hosts')!);
        this.myLoading=true;
        this.switchesPostService.addVlansToTrunk(this.trunk,()=> this.myLoading=false,this.headers);
      }

      onSaveNoShutDownInt(data:any){

        this.vlanInt.vlanId=data.vlanId;
        this.vlanInt.hosts= JSON.parse(localStorage.getItem('hosts')!);
        this.myLoading=true;
        this.switchesPostService.NoShutDownInt(this.vlanInt,()=> this.myLoading=false,this.headers);
      }
      onSaveShutDownInt(data:any){
      
        this.vlanInt.vlanId=data.vlanId;
        this.vlanInt.hosts = JSON.parse(localStorage.getItem('hosts')!);
        this.myLoading=true;
        this.switchesPostService.ShutDownInt(this.vlanInt,()=> this.myLoading=false,this.headers);
        
      
      }
      onHostClickShowInt(data:any){
        if(this.panelOpen==false){
        if (localStorage.getItem(data+" IntInfo")==null){
        this.myLoading=true;
        this.switchesGetService.triggerGetIntInfo(data,this.headers).subscribe(output =>{
          localStorage.setItem(data+" IntInfo",JSON.stringify(output));
          this.currIntInfo=output;
            this.myLoading=false; 
      
          },(error)=>{
            this.myLoading=false;
            alert("there has been an error please try again")
          }
          )
           }  
         else{
          this.currIntInfo=JSON.parse(localStorage.getItem(data+" IntInfo")!);  
          console.log('4');
          this.myLoading=false;
              
         }
        }
      }
}
