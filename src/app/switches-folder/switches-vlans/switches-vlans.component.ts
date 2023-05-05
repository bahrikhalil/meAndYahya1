import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwitchsComponent } from '../switchs/switchs.component';
import { AnyForUntypedForms, FormControl,FormGroup } from '@angular/forms';
import { vlan,vlanInt,trunk, VlanInfo, IntInfo } from '../../shared/switchs-models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { data, DataSet, Network } from 'vis-network/standalone';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import vis from 'vis-network/declarations/index-legacy-bundle';
import { Terminal } from 'xterm';
import { HttpHeaders } from '@angular/common/http';
import { Route, Router, NavigationEnd } from '@angular/router';
import { TerminalService } from '../../services/terminal.service';
import { NetworkTopologyService } from '../../services/network-topology.service';
import { SwitchesGetService } from '../../services/switches-get.service';
import { SwitchesPostService } from '../../services/switches-post.service';
import {ThemePalette} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectionList } from '@angular/material/list';
import { IDropdownSettings } from 'ng-multiselect-dropdown';




interface HostLists {
  [key: string]: String[];
}

@Component({
  selector: 'app-switches-vlans',
  templateUrl: './switches-vlans.component.html',
  styleUrls: ['./switches-vlans.component.scss']
})
export class SwitchesVlansComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  addingVlan=false;
  dropdownList:any= [];
  dropdownListPorts:any=[];
  selectedItemsHosts :any= [];
  selectedItemsPorts :any= [];
  dropdownSettings:any = {};
  selectedVlan:string="";


  ports:string[]=["Gi0/0","Gi0/1","Gi0/2","Gi0/3","Gi0/4","Gi0/5","Gi0/6","Gi0/7","Gi0/8",
                  "Gi0/10","Gi0/11","Gi0/12","Gi0/13","Gi0/14","Gi0/15","Gi0/16","Gi0/17","Gi0/18",
                  "Gi0/19","Gi0/20","Gi0/21","Gi0/22","Gi0/23","Gi0/24",]
  country:String="";
  hosts:String[]=[];
  shownHosts:String[]=[];
  formdata:any;
  formdata1:any;
  vlanInfo:VlanInfo=new VlanInfo;
  currVlanInfo:VlanInfo[]=[];
  currIntInfo:IntInfo[]=[];
  myLoading= false;

  panelOpen = false;
  showvlantable=false;
  openTerm=false;
  vlan:vlan= new vlan();
  vlanInt:vlanInt= new vlanInt();
  trunk:trunk= new trunk();
  headers:any;
  hosts1:String[]=[];;
  arch=true;
  assigningPortsToVlan=false;

  constructor(private topologyService:NetworkTopologyService,
    private route:Router,
    private switchesGetService:SwitchesGetService,
    private switchesPostService:SwitchesPostService,
     ){

    this.hosts = JSON.parse(localStorage.getItem('hosts')!);
    this.hosts1 =this.hosts.slice(1,this.hosts.length);
  }

  ngOnInit(): void {

  
    let i:number=0;
    this.hosts.forEach((curr)=>{
      console.log(curr);    
      this.dropdownList.push({ item_id: i, item_text: curr }) 
      i++;
    })
    this.ports.forEach((curr)=>{
      console.log(curr);    
      this.dropdownListPorts.push({ item_id: i, item_text: curr }) 
      i++;
    })

    this.selectedItemsHosts = [];
    this.selectedItemsPorts = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 8,
      allowSearchFilter: true
    };

    this.formdata= new FormGroup({
      vlanId: new FormControl(""),
      vlanName: new FormControl(""),
      intType: new FormControl(""),
      intId: new FormControl(""),
      hosts: new FormControl(""),
      ports: new FormControl("")
   });
  
   
   this.headers = new HttpHeaders({
    'user': localStorage.getItem("user")!,
    Authorization: "bearer "+ localStorage.getItem("usertoken"),
  });
  localStorage.setItem('subject','vlans');
   this.onHostClickShowVlans(localStorage.getItem("currentHost")!)
  }
  
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }  





saveToStartUpConfig(){
    this.myLoading=true;
    this.switchesPostService.saveToStartUpConfig(()=> this.myLoading=false,this.headers);
  }
 
onSaveAddVlan(data:any){
    
        this.vlan.vlanId=data.vlanId;
        this.vlan.vlanName=data.vlanName;
        this.vlan.hosts= this.selectedItemsHosts;
        // this.myLoading=true;
        // this.switchesPostService.addVlan(this.vlan,()=> {this.myLoading=false;this.onHostClickShowVlans(localStorage.getItem("currentHost")!);},this.headers);
        console.log(this.vlan);
               
         }

onSaveDelVlan(data:any){
    
       this.vlan.vlanId=data.vlanId;
       this.vlan.vlanName=data.vlanName;
       this.vlan.hosts = this.selectedItemsHosts;
       console.log(data);
       
      //  this.myLoading=true;
      //  this.switchesPostService.delVlan(this.vlan,()=> this.myLoading=false,this.headers);
          
 }
 onSaveAssignIntToVlan(data:any){
       this.vlan.vlanId=data.vlanId;
       let ports="";
       let hosts1:string[]=[];

       this.selectedItemsPorts.forEach((curr:any)=>{
       ports= ports.concat(curr.item_text+','); 
       })    
       this.selectedItemsHosts.forEach((curr:any)=>{
        hosts1.push(curr.item_text)
       })

       this.vlan.hosts = hosts1;
       this.vlan.ports = ports.slice(0,length-1);
        console.log(this.vlan);
        
      //  this.myLoading=true;
      //  this.switchesPostService.assignIntToVlan(this.vlan,()=> this.myLoading=false,this.headers);
}

onHostClickShowVlans(data:any){
  if(this.panelOpen==false){
   if(localStorage.getItem(data+" vlanInfo")==null)  {
  this.myLoading=true;
   this.switchesGetService.triggerGetVlans(data,this.headers).subscribe(output =>{
     localStorage.setItem(data+" vlanInfo",JSON.stringify(output));
     this.currVlanInfo=output;
     this.myLoading=false;
     this.addingVlan=false;
   },(error)=>{
     this.myLoading=false;
     this.addingVlan=false;
     alert("there has been an error please try again")
   })
   }
   else{
    this.currVlanInfo=JSON.parse(localStorage.getItem(data+" vlanInfo")!);
    console.log(this.currVlanInfo[0].status);
    console.log("this is else");
    this.addingVlan=false;
   }
 }
 }








}
