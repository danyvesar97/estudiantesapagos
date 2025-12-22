import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { Estudiantess } from '../services/estudiantess';

@Component({
  selector: 'app-pagos',
  standalone: false,
  templateUrl: './pagos.html',
  styleUrl: './pagos.css',
})
export class Pagos {
  public pagos: any;
  public dataSource: any;
  public displayedColumns = ['id', 'fecha', 'cantidad', 'type', 'status', 'nombre'];

  /*
    @ViewChild: Decorador que permite acceder a un componente hijo del DOM
  */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private estudianteService: Estudiantess) {}

  ngOnInit(): void {
    this.estudianteService.getAllPagos().subscribe({
      next: (data) => {
        this.pagos = data;
        this.dataSource = new MatTableDataSource(this.pagos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log('Hubo un error!', error);
      },
    });
  }
}
