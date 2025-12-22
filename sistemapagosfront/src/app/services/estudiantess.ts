import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Estudiante, Pago } from '../models/estudiantes.model';

@Injectable({
  providedIn: 'root',
})
export class Estudiantess {
  constructor(private http: HttpClient) { }

  public getAllPagos(): Observable<Array<Pago>> {
    return this.http.get<Array<Pago>>(`${environment.backendHost}/pagos`);
  }

  public getAllEstudiantes(): Observable<Array<Estudiante>> {
    return this.http.get<Array<Estudiante>>(`${environment.backendHost}/estudiantes`);
  }
}
