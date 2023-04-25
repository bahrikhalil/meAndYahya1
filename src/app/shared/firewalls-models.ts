
export class policy{
  
    name:string="";
    policyid:string="";
    action:string="";
    srcintf:string="";
    dstintf:string="";
    srcaddr:string="";
    dstaddr:string="";
    service:string="";
    schedule:string="";
    status:string="";
    hosts:string[]=[];
    public feedback(name:string,policyid:string,hosts:string[],srcintf:string,dstintf:string,srcaddr:string,dstaddr:string,action:string,service:string,status:string,schedule:string){
         
        this.name=this.name;
        this.policyid= policyid;
        this.action=action;
        this.srcintf=srcintf;
        this.dstintf=dstintf;
        this.srcaddr=srcaddr;
        this.dstaddr=dstaddr;
        this.service=service;
        this.schedule=schedule;
        this.status=status;
        this.hosts=hosts; 
    }
    
  
}

export class AddressObject{

    name:string="";
     comment:string="";
     allow_routing:string="";
     IP:string="";
     IPRange:string="";
     fqdn:string="";
     type:string="";
     member:string[]=[];
     exclude_member:string[]=[];
     category:string="";
     hosts:string[]=[];

    feedback(name:string,comment:string,allow_routing:string,IP:string,IPRange:string,fqdn:string,type:string,member:string[],exclude_member:string[], category:string, hosts:string[]){
           this.name=name;
           this.comment=comment;
           this.allow_routing=allow_routing;
           this.IP=IP;
           this.IPRange=IPRange;
           this.fqdn=fqdn;
           this.type=type;
           this.member=member;
           this.exclude_member=exclude_member;
           this.category=category;
           this.hosts=hosts;
    }
    


}
export class ServiceObject{

     name:string="";
     comment:string="";
     fqdn:string="";
     type:string="";
     member:string[]=[];
     category:string="";
     tcp_portrange:string="";
     udp_portrange:string="";
     hosts:string[]=[];

    feedback(name:string,comment:string,tcp_portrange:string,udp_portrange:string,fqdn:string,type:string,member:string[],category:string, hosts:string[]){
           this.name=name;
           this.comment=comment;
           this.fqdn=fqdn;
           this.type=type;
           this.member=member;
           this.tcp_portrange=tcp_portrange;
           this.udp_portrange=udp_portrange;
           this.category=category;
           this.hosts=hosts;
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
export class timeoutObj{

    timeout:string="";
    hosts:string[]=[];

   alertObj(timeout:string, hosts:string[]){
          this.timeout=timeout;
          this.hosts=hosts;
         
   }  
}