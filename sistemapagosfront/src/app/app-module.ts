import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminTemplate } from './admin-template/admin-template';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { LoadEstudiantes } from './load-estudiantes/load-estudiantes';
import { LoadPagos } from './load-pagos/load-pagos';
import { Login } from './login/login';
import { Pagos } from './pagos/pagos';
import { Estudiantes } from './estudiantes/estudiantes';
import { Dashboard } from './dashboard/dashboard';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth-guard';

@NgModule({
  declarations: [
    App,
    AdminTemplate,
    Home,
    Profile,
    LoadEstudiantes,
    LoadPagos,
    Login,
    Pagos,
    Estudiantes,
    Dashboard,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    AuthGuard,
  ],
  bootstrap: [App],
})
export class AppModule {}
