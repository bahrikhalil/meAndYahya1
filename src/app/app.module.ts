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

import { AboutComponent } from './about/about.component';

import{MatIconModule} from '@angular/material/icon';
import { SwitchsComponent } from './switchs/switchs.component';
import { FirewallsComponent } from './firewalls/firewalls.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { PerCountryOrGroupComponent } from './per-country-or-group-switchs/per-country-or-group.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes }   from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';






@NgModule({
  declarations: [
    AppComponent,
    
       LoginComponent,
      
       AboutComponent,  SwitchsComponent, FirewallsComponent,PerCountryOrGroupComponent, 
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
