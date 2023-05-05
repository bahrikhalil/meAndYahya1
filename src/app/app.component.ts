import { } from '@angular/compiler';
import { Component ,OnInit, ViewChild} from '@angular/core';


//import { event } from './shared/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})

export class AppComponent {
 

  firewalls:boolean=false;
  switchs:boolean=false;
  login:boolean=false;
  src :String="../assets/img/test.png" 

  dropdownList:any= [];
  selectedItems :any= [];
  dropdownSettings:any = {};
  hosts:string[]=[];
  hosts1:string[]=[];
  
  
constructor(){

}
  
  ngOnInit(): void {
   
    
  }
 

  }

   

