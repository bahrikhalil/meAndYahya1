import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateReportSwitchesService } from 'src/app/services/create-report-switches.service';
import { NetworkTopologyService } from 'src/app/services/network-topology.service';
import { SwitchesGetService } from 'src/app/services/switches-get.service';
import { SwitchesPostService } from 'src/app/services/switches-post.service';


interface Neighbors {
  [key: string]: string[];
}

@Component({
  selector: 'app-topology',
  templateUrl: './topology.component.html',
  styleUrls: ['./topology.component.scss']
})
export class TopologyComponent implements OnInit {

  hosts:string[]=[];
  myLoading=false;
  headers:any;
  neigh:Neighbors = {};

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

  
   this.networkTopology();
    console.log("ohohoho");
    
  }

  networkTopology(){
    this.myLoading=true;
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

}
