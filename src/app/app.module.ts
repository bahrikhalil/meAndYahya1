import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';


import{MatIconModule} from '@angular/material/icon';
import { SwitchsComponent } from './switches-folder/switchs/switchs.component';
import { FirewallsComponent } from './firewalls-folder/firewalls/firewalls.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes }   from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SwitchesVlansComponent } from './switches-folder/switches-vlans/switches-vlans.component';
import { SwitchesInterfacesComponent } from './switches-folder/switches-interfaces/switches-interfaces.component';
import { SwitchesSystemConfComponent } from './switches-folder/switches-system-conf/switches-system-conf.component';
import { PolicysComponent } from './firewalls-folder/policys/policys.component';
import { ServiceObjectsComponent } from './firewalls-folder/service-objects/service-objects.component';
import { AddressObjectsComponent } from './firewalls-folder/address-objects/address-objects.component';
import { ReportSwitchesComponent } from './switches-folder/report-switches/report-switches.component';
import { ReportFirewallsComponent } from './firewalls-folder/report-firewalls/report-firewalls.component';
import { FirewallsSystemConfComponent } from './firewalls-folder/firewalls-system-conf/firewalls-system-conf.component';






@NgModule({
  declarations: [
    AppComponent,
    
       LoginComponent,
      ReportSwitchesComponent,
    SwitchsComponent, FirewallsComponent, SwitchesVlansComponent, SwitchesInterfacesComponent, SwitchesSystemConfComponent, PolicysComponent, ServiceObjectsComponent, AddressObjectsComponent, ReportSwitchesComponent, ReportFirewallsComponent, FirewallsSystemConfComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
  MatProgressSpinnerModule,
  RouterModule.forRoot([])

  ],
  exports: [MatExpansionModule],
  providers: [
   
  
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
