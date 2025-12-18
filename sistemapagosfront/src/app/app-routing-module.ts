import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminTemplate} from './admin-template/admin-template';
import {Home} from './home/home';
import {Login} from './login/login';
import {LoadEstudiantes} from './load-estudiantes/load-estudiantes';
import {LoadPagos} from './load-pagos/load-pagos';
import {Dashboard} from './dashboard/dashboard';
import {Estudiantes} from './estudiantes/estudiantes';
import {Pagos} from './pagos/pagos';
import {Profile} from './profile/profile';

const routes: Routes = [
  {path: "", component: Login},
  {path: "home", component: Home},
  {path: "login", component: Login},
  {
    path: "admin", component: AdminTemplate, children: [
      {path: "profile", component: Profile},
      {path: "loadEstudiantes", component: LoadEstudiantes},
      {path: "loadPagos", component: LoadPagos},
      {path: "dashboard", component: Dashboard},
      {path: "estudiantes", component: Estudiantes},
      {path: "pagos", component: Pagos}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
