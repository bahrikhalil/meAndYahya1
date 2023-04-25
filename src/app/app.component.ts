import { } from '@angular/compiler';
import { Component ,OnInit, ViewChild} from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { BackendService } from './services/backend.service';
import { FirewallsComponent } from './firewalls/firewalls.component';
import { Routes,RouterModule } from '@angular/router';

//import { event } from './shared/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 

  firewalls:boolean=false;
  switchs:boolean=false;
  login:boolean=false;
  src :String="../assets/img/test.png" 
  
constructor(private service:BackendService){

}
  
  ngOnInit(): void {
    
  }
  


}
