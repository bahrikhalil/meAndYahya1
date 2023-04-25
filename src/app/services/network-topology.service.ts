import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import { BackendService } from './backend.service';
import { TerminalService } from './terminal.service';

interface Neighbors {
  [key: string]: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NetworkTopologyService {
  
hosts:String[]=[];  

constructor(private termService:TerminalService, private service:BackendService) {
  this.hosts = JSON.parse(localStorage.getItem('hosts')!);
 }

buildTopology(neigh:Neighbors){
  
  let architectureElements =[{id:"",label:"",image:''}];
  let architectureEdges = [{id:0,from:"",to:""}]
  architectureElements.pop();
  architectureEdges.pop();
  var j=0;
  var isConnected:Boolean = false;
  
  Object.entries(neigh).forEach(([key,value])=>{
    let curr = {id:key,label:key,image:'/assets/img/switch.png'};
    architectureElements.push(curr);
    value.forEach((element)=>{
      isConnected=false;
       architectureEdges.forEach((element1)=>{
        if(((element1.from==curr.id) && (element1.to=element)) || ((element1.from==element) && (element1.to=curr.id))){
          console.log("already connected");   
          isConnected=true;    
        }
       })
       if(!isConnected){
        j++;
        architectureEdges.push({id:j,from:curr.id,to:element})
       }
    })             
  })    
   
const nodes = new DataSet(architectureElements);
const edges = new DataSet(architectureEdges);

// Create the network visualization
const container = document.getElementById("network")!;
const data1 = { nodes, edges };
const options = {

layout:{randomSeed: 1},

nodes: {
  shape: 'image',
  size: 30,
  borderWidth: 0,
  font: { size: 16 }
},
edges: {
  width: 8,
  color: '#ccc'
}
};
const network = new Network(container, data1, options);
network.on('click', (event) => {
var nodesId:number = event.nodes[0]; 
const node= nodes.get(nodesId);

if(node!= undefined && node.label!=undefined){
var key= node.label;
this.hosts=["Individuals"];
let address=key.split("\n")[0];
this.hosts.push(address);
this.termService.connect(address,localStorage.getItem('user')!);
localStorage.setItem('hosts', JSON.stringify(this.hosts));
}  
});
}
 
}
