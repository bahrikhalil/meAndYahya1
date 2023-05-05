import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwitchesGetService } from '../services/switches-get.service';

interface HostLists {
  [key: string]: string[];
}

@Component({
  selector: 'app-selecting-host',
  templateUrl: './selecting-host.component.html',
  styleUrls: ['./selecting-host.component.scss']
})
export class SelectingHostComponent implements OnInit {

  siteHosts: HostLists={"Tunisia_switchs":[],"Morocco_switchs": [] };
  navigated:boolean=true;
  hosts:string[]=[];
  currentSite:string="Morocco_switchs";
  selectingHost=true;
  subject:string="";
  myLoading=false;
  headers:any;

  constructor(private route:Router,private switchesGetService:SwitchesGetService,) {
    this.hosts = JSON.parse(localStorage.getItem('hosts')!);
    
    
   }

  ngOnInit(): void {
    this.subject=this.route.url.split("/")[3];
    console.log(this.subject);
    this.headers = new HttpHeaders({
      'user': localStorage.getItem("user")!,
      Authorization: "bearer "+ localStorage.getItem("usertoken"),
    });
    

    
    Object.entries(this.siteHosts).forEach(([key,value])=>{        
    this.siteHosts[key]=JSON.parse(localStorage.getItem(key)!);
      });    
      console.log(this.subject);
      
      
  }
  
  returnSubjectContent(host:string){
    console.log(this.route.url.split('/')[3]);
    
    if(this.route.url.split('/')[3]=="individual-backup-file"){
        this.myLoading=true;
        this.switchesGetService.getBackup(["Individuals",host],()=> this.myLoading=false,this.headers);     
    }
    else{
      console.log("this is else");
      console.log(this.subject);
      
      this.route.navigate(['/switchs/'+this.route.url.split('/')[3]+"/"+host])
    }
  }
    
  }

