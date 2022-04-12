import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationComponent } from './pages/location/location.component';
import { UsersComponent } from './pages/users/users.component';
import { RolesComponent } from './pages/roles/roles.component';
import { KioskComponent } from './pages/kiosk/kiosk.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializer } from './utility/app.init';
import { KeycloakService } from 'keycloak-angular';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    UsersComponent,
    RolesComponent,
    KioskComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    KeycloakService,{
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
