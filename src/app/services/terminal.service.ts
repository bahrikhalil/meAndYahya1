import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { baseUrl } from '../shared/baseUrl';

declare var SockJS: new (arg0: string) => any;
declare var Stomp: { over: (arg0: any) => any; };

@Injectable({
  providedIn: 'root'
})
export class TerminalService {


  headers: HttpHeaders = new HttpHeaders;
 
  constructor( private http:HttpClient) { }

  connect(address:string,user:string) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: "Bearer " +localStorage.getItem("usertoken"),
    });
  
    let msg:string[]=[];
    
    const serverUrl = baseUrl+'/ws/'+user+'/'+address;
    const ws = new SockJS(serverUrl);
  
    let stompClient = Stomp.over(ws);
    let term:Terminal = new Terminal();
    const that = this;
    
  
      stompClient.connect({'address': address,'user':user}, function(frame: any) {
      that.http.post(baseUrl+"/api/switchs/get/authenticateWebSocket",{},{'headers':that.headers}).subscribe(()=>{      
        stompClient.subscribe('/message/'+user, (response:any) => {
          if(response.body){
            msg.push(response.body);
            console.log(msg);     
            term.write(msg[msg.length-1]);
          }       
        });
        that.openTerm(user+'/'+address,term,stompClient);
      },
      (error)=>{
        stompClient.disconnect(function() {
          console.log('WebSocket connection closed');
        });
        
      })
      });
    
    
  
  }
  
  printMessage(term:Terminal){
    term.write('\b \b');
    
  }
  
  openTerm(dest:string,term:Terminal,stompClient:any){
  
     const elementToClone = document.getElementById('xterm')!;
     const popupWindow = window.open('', '', 'width=800,height=470')!;
     popupWindow.document.write('<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="../../assets/xterm.css"></head><body>');
     popupWindow.document.body.appendChild(elementToClone.cloneNode(true));
    
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(popupWindow.document.getElementById('xterm')!);
    
    const that = this;
    let command:string="";
    term.onData(async (data: string) => 
   {
    
  if(data.endsWith("\r")){
    
  
    if(command!=""){  
      console.log("------------------")
      this.sendMessage(command,dest,stompClient);   
      command="";
    } 
    else if(data.charCodeAt(data.length-1)==127){
      term.write("\b \b");
     
    }
    else{
      this.sendMessage("c",dest,stompClient);
    }
  }
   
  else {
    term.write(data);
    command+=data;
  
  }
  });
  // this.term.onKey((key,ev) => {
  //   const code = key.key.charCodeAt(0);
  //   if(code == 127){   //Backspace
        
  //       this.command=this.command.slice(0,-1);
  //      this.command= this.command.replace("\b \b","");
  
  //   }
  // });
  
  }
  
  sendMessage(message:string,dest:string,stompClient:any) {
  stompClient.send('/app/backend/'+dest ,{}, message);
  
  }
  
  
  
  

 
  }
  
  


