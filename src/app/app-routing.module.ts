import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { SwitchsComponent } from './switchs/switchs.component';
import { FirewallsComponent } from './firewalls/firewalls.component';
import { PerCountryOrGroupComponent } from './per-country-or-group-switchs/per-country-or-group.component';





const routes: Routes = [
 

  {path:"firewalls",component:FirewallsComponent},
 {path:"switchs",component:SwitchsComponent} ,
{path:"login",component:LoginComponent},
{path:"about",component:AboutComponent},
{path:"per-country-or-group",component:PerCountryOrGroupComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
