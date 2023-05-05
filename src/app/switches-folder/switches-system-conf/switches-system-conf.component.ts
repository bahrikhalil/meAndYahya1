import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { aclObj, alertObj, issueObj } from '../../shared/switchs-models';
import { NetworkTopologyService } from '../../services/network-topology.service';
import { SwitchesGetService } from '../../services/switches-get.service';
import { SwitchesPostService } from '../../services/switches-post.service';
import { CreateReportSwitchesService } from '../../services/create-report-switches.service';
import { vlan,vlanInt,trunk, VlanInfo, IntInfo } from '../../shared/switchs-models';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';
import { ELOOP } from 'constants';

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
interface ACLList{
  [key: string]: any;
}
interface SysConfParams{
  [key: string]: boolean;
}

@Component({
  selector: 'app-switches-system-conf',
  templateUrl: './switches-system-conf.component.html',
  styleUrls: ['./switches-system-conf.component.scss']
})
export class SwitchesSystemConfComponent implements OnInit {

  dropdownHostsList:any= [];
  dropdownListPorts:any=[];
  selectedItemsHosts :any= [];
  selectedRules:string="";
  dropdownSettings:any = {};

  siteHosts: HostLists={"Tunisia_switchs":[],"Morocco_switchs": [] }
  formdata:any;
  vlanInfo:VlanInfo=new VlanInfo;
  currVlanInfo:VlanInfo[]=[];
  ACLs:ACLList={};
  myLoading= false;
  popupaddvlanint=false;
  disabled=false;
  addingACL=false;
  deletingACL=false;
  selectingACLRules=false;
  isSelectedACLName=true;
  selectedACLName:string="";
  aclArrayLength=["456",1,true]
  
  color: ThemePalette = 'accent'; 
  openTerm=false;
  vlan:vlan= new vlan();
  vlanInt:vlanInt= new vlanInt();
  trunk:trunk= new trunk();
  headers:any;
  currUrl:string="";
  hosts:string[]=[];
 
  systemConfigParams:SysConfParams={"service tcp-keepalives-in":false,"ip source-route":true,"ip bootp server":true,"ip dhcp bootp ignore":true}
  // ip_bootp_server=this.systemConfigParams["ip bootp server"];
  // service_tcp_keepalives_in=this.systemConfigParams["service tcp-keepalives-in"];
  // ip_source_route=this.systemConfigParams["ip source-route"];
  // ip_dhcp_bootp_ignore=this.systemConfigParams["ip dhcp bootp ignore"];

  constructor(private topologyService:NetworkTopologyService,
    private route:Router,
    private switchesGetService:SwitchesGetService,
    private switchesPostService:SwitchesPostService,
    private reportService:CreateReportSwitchesService
     ){

    this.currUrl=this.route.url.split('/')[3];

  }

  ngOnInit(): void {

    this.formdata= new FormGroup({
     aclName:new FormControl("acl1"),
     aclRuleId:new FormControl("tcp"),
     srcAddress:new FormControl("192.168.254.17"),
     srcSubnet:new FormControl("255.255.255.0"),
     dstAddress:new FormControl("any"),
     dstSubnet:new FormControl(""),
     srcPort:new FormControl(""),
     dstPort:new FormControl(""),
     protocol:new FormControl(""),
     action:new FormControl("permit"),
    hosts: new FormControl(""),


   });
   this.headers = new HttpHeaders({
    'user': localStorage.getItem("user")!,
    Authorization: "bearer "+ localStorage.getItem("usertoken"),
  });

  Object.entries(this.siteHosts).forEach(([key,value])=>{     
    if(JSON.parse(localStorage.getItem(key)!)!==null){ 
      let currHostList:string[] =JSON.parse(localStorage.getItem(key)!);
      if(currHostList.indexOf(this.currUrl)!=-1){
        this.dropdownHostsList=currHostList;
      }
    }
  });  


  

this.getSystemCurrentParams();

  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  } 

  getSystemCurrentParams(){

    if(localStorage.getItem(this.route.url.split('/')[3]+ "systemConfigParams")==null)  {
   this.myLoading=true;
   this.switchesGetService.triggerSystemCompliance(["Individuals",this.route.url.split('/')[3]],this.headers).subscribe((data)=>{
     
    Object.entries(data).forEach((key)=>{
      Object.entries(key[1].split("and")).forEach((curr)=>{
        console.log(curr[1]);      
        if(curr[1].lastIndexOf("tcp-keepalives")!=-1) this.systemConfigParams["service tcp-keepalives-in"]=true;
        if(curr[1].lastIndexOf("source-route")!=-1) this.systemConfigParams["ip source-route"]=false;
        if(curr[1].lastIndexOf("bootp server")!=-1) this.systemConfigParams["ip bootp server"]=false;
        if(curr[1].lastIndexOf("bootp ignore")!=-1) this.systemConfigParams["ip dhcp bootp ignore"]=true;      
       })      
      })
    localStorage.setItem(this.route.url.split('/')[3]+"systemConfigParams",JSON.stringify(this.systemConfigParams));
    this.myLoading=false; 
    this.getSystemCurrentACLs();  
    
  },
  (error)=>{
   console.log("couldnt get system params");
   this.getSystemCurrentACLs(); 
   this.myLoading=false;
    
  });
}
else {
  this.systemConfigParams=JSON.parse(localStorage.getItem(this.route.url.split('/')[3]+"systemConfigParams")!);
  this.getSystemCurrentACLs();

}
  
  }

  getSystemCurrentACLs(){
    if(localStorage.getItem(this.route.url.split('/')[3]+ "ACLs")==null)  {
    this.myLoading=true;
    this.switchesGetService.getACL(["Individuals",this.route.url.split('/')[3]],this.headers).subscribe((data)=>{
      console.log(data);

      localStorage.setItem(this.route.url.split('/')[3]+"ACLs",JSON.stringify(data));
      this.ACLs=data; 
      this.myLoading=false; 
    },
    (error)=>{
      console.log("error");
      this.myLoading=false;
    });
  }
  else {
    this.ACLs=JSON.parse(localStorage.getItem(this.route.url.split('/')[3]+ "ACLs")!);
  }
  }

  onSaveSetBridgePriority(data:any){

    this.trunk.vlanId=data.vlanId;
    this.trunk.priority=data.priority;
    this.trunk.hosts = JSON.parse(localStorage.getItem('hosts')!);
    this.myLoading=true;
    this.switchesPostService.setBridgePriority(this.trunk,()=> this.myLoading=false,this.headers);
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
  delACL(aclRuleId:string,aclName:string){
    this.myLoading=true;
    if(aclRuleId[aclRuleId.length-1]==',') aclRuleId.replace(',','')
    let aclRule:aclObj=new aclObj();
    aclRule.aclName=aclName;
    aclRule.aclRuleId=aclRuleId;
    aclRule.hosts=["Individuals",this.route.url.split('/')[3]];
    
    this.switchesPostService.delACL(aclRule,this.headers).subscribe((data:any)=>{
      localStorage.removeItem(this.route.url.split('/')[3]+"ACLs");  
      this.myLoading=false;
      this.getSystemCurrentACLs();
      this.selectingACLRules=false;
    },
    
    (error)=> {
      console.log("error");
      this.selectingACLRules=false;
      this.myLoading=false;
      
    })
  }

  addACL(aclRule1:any){
     this.myLoading=true;
    let aclRule:aclObj=new aclObj();
    aclRule.aclName=aclRule1.aclName;
    aclRule.aclRuleId=aclRule1.aclRuleId;
    aclRule.action=aclRule1.action;
    aclRule.protocol=aclRule1.protocol;
    aclRule.srcAddress=aclRule1.srcAddress;
    aclRule.dstAddress=aclRule1.dstAddress;
    aclRule.srcPort=aclRule1.srcPort;
    aclRule.dstPort=aclRule1.dstPort;
    aclRule.srcSubnet=aclRule1.srcSubnet;
    aclRule.dstSubnet=aclRule1.dstSubnet;
    aclRule.hosts=this.selectedItemsHosts;
 
    console.log(aclRule.aclName);
    
    this.switchesPostService.addACL(aclRule,this.headers).subscribe((data:any)=>{
      localStorage.removeItem(this.route.url.split('/')[3]+"ACLs");  
      this.myLoading=false;
      this.getSystemCurrentACLs();
    },
    
    (error)=> {
      console.log("error");
      this.myLoading=false;
    })
  }

  selectRule(ruleId:string,aclName:string){
    if(this.selectedRules.indexOf(ruleId)!=-1) this.selectedRules= this.selectedRules.replace(ruleId+',','')
    else this.selectedRules= this.selectedRules.concat(ruleId+',');

    if(this.selectedACLName!=aclName) this.selectedRules=ruleId+","
    this.selectedACLName=aclName;
    
    console.log(this.selectedACLName);
    
    console.log(this.selectedRules);
    
  }
  
  objectEntries(obj: {[k: string]: any}) {
    return Object.entries(obj);
  }
  
}
