import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SwitchsComponent } from './switches-folder/switchs/switchs.component';
import { FirewallsComponent } from './firewalls-folder/firewalls/firewalls.component';






const routes: Routes = [
 

  {path:"firewalls",component:FirewallsComponent},
 {path:"switchs",component:SwitchsComponent} ,
{path:"login",component:LoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
