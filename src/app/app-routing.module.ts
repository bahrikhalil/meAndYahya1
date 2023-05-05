import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SwitchsComponent } from './switches-folder/switchs/switchs.component';
import { FirewallsComponent } from './firewalls-folder/firewalls/firewalls.component';
import { SwitchesVlansComponent } from './switches-folder/switches-vlans/switches-vlans.component';
import { SelectingHostComponent } from './selecting-host/selecting-host.component';
import { TopologyComponent } from './switches-folder/topology/topology.component';
import { SwitchesInterfacesComponent } from './switches-folder/switches-interfaces/switches-interfaces.component';
import { ReportSwitchesComponent } from './switches-folder/report-switches/report-switches.component';
import { SwitchesSystemConfComponent } from './switches-folder/switches-system-conf/switches-system-conf.component';

const routes: Routes = [
 

  {path:"firewalls",component:FirewallsComponent},
  {path:"switchs",component:SwitchsComponent,
     children:[{path:"selectingHost/:subject",component:SelectingHostComponent},
               {path:"vlans/:hosts",component:SwitchesVlansComponent},
               {path:"topology/:hosts",component:TopologyComponent},
               {path:"interfaces/:hosts",component:SwitchesInterfacesComponent},
               {path:"report/:hosts",component:ReportSwitchesComponent},
               {path:"switch-system/:hosts",component:SwitchesSystemConfComponent}
              ]
    },
 
{path:"login",component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
