export class register_user{
    name:string="";
    username:string=""; 
    password:string="";
    public user(nom:string,email:string,pwd:string){
        this.name=nom;
        this.username=email; 
        this.password=pwd; 
    }
}


  export  class log_user{
      username:string=""; 
      password:string=""; 
      public log_user(email:string,paswd:string){
        this.password=paswd; 
        this.username=email; 
      }
            
  }
  

export class vlanInt{

    ipAddress:string="";
    subnet:string="";  
    vlanId:String="";

    hosts:String[]=[];
    public feedback(ipAddress:string,subnet:string,vlanId:String,hosts:String[]){
        this.ipAddress=ipAddress;  
        this.subnet=subnet; 
        this.vlanId=vlanId ; 
        this.hosts=hosts; 

    }
}

export class vlan{
  
    vlanId:String="";
    vlanName:String="";

    intType:String="";
    intId:String="";
    hosts:String[]=[];
    public feedback(vlanId:String,hosts:String[],vlanName:String,intId:String,intType:String){
       this.vlanName=vlanName; 
        this.vlanId=vlanId ; 
        this.intId= intId;
        this.intType=intType;
        this.hosts=hosts; 

    }
}
export class trunk{
  
    allowedVlans:String="";
    vlanId:String="";
    priority:String="";
    intType:String="";
    intId:String="";
    hosts:String[]=[];
    public feedback(intId:String,hosts:String[],intType:String,allowedVlans:String,vlanId:String,priority:String){
         
        this.intId= intId;
        this.vlanId=vlanId;
        this.priority=priority;
        this.intType=intType;
        this.allowedVlans=allowedVlans;
        this.hosts=hosts; 
    }
  
}
export class VlanInfo{
  
    status:String="";
    id:String="";
    name:String="";
    ports:String[]=[];
    public feedback(vlanStatus:String,vlanPorts:String[],vlanId:String,vlanName:String){
         
        this.status=vlanStatus;
        this.id=vlanId;
        this.name=vlanName;
        this.ports=vlanPorts;

    
}
}
export class IntInfo{
  
    status:String="";
    intName:String="";
    ipv4:String="";
    lineProtocol:String="";
    portType:String="";
    allowedVlans:String="";

    public feedback(status:String,intName:String,ipv4:String,lineProtocol:String,mode:String,allowedVlans:String){
         
        this.status=status;
        this.intName
        this.ipv4=ipv4;
        lineProtocol=lineProtocol;
        this.portType=mode;
        this.allowedVlans=allowedVlans;

    
}
}
export class alertObj{

    subjectType:string="";
    subjectName:string="";
    comment:string="";
    status:string="";
    hosts:string="";

   alertObj(subjectType:string,subjectName:string, comment:string,status:string, hosts:string){
          this.subjectType=subjectType;
          this.subjectName=this.subjectName;
          this.comment=comment;
          this.hosts=hosts;
          this.status=status;
   }  
}
export class issueObj{

    line:string="";
    port_name:string="";
    id:string="";
    issue:string="";
    
   issueObj(line:string, issue:string,port_name:string,id:string){
          this.line=line;
          this.port_name=port_name;
          this.issue=issue;
          this.id=id;
         
   }  
}

export class aclObj{

     aclName:string="";
     aclRuleId:string="";
     srcAddress:string="";
     srcSubnet:string="";
     dstAddress:string="";
     dstSubnet:string="";
     srcPort:string="";
     dstPort:string="";
     protocol:string="";
     action:string="";
     hosts:string[]=[];
    
   issueObj(aclName:string, aclRuleId:string,srcAddress:string,dstAddress:string,srcSubnet:string,dstSubnet:string,srcPort:string,dstPort:string, protocol:string, action:string){
         this.aclName=aclName;
         this.aclRuleId=aclRuleId;
         this.srcAddress=srcAddress;
         this.dstAddress=dstAddress;
         this.srcSubnet=srcSubnet;
         this.dstSubnet=dstSubnet;
         this.srcPort=srcPort;
         this.dstPort=dstPort;
         this.protocol=protocol;
         this.action=action 
        
         
   }  
}

