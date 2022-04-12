import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { KioskComponent } from './pages/kiosk/kiosk.component';
import { LocationComponent } from './pages/location/location.component';
import { RolesComponent } from './pages/roles/roles.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path:'kiosk',component:KioskComponent},
  {path:'users',component:UsersComponent},
  {path:'roles',component:RolesComponent},
  {path:'location',component:LocationComponent},
  {path:'',component:AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
