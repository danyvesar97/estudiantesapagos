import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiantes.model';
import { Estudiantess } from '../services/estudiantess';

@Component({
  selector: 'app-estudiantes',
  standalone: false,
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css',
})
export class Estudiantes implements OnInit {
  estudiantes!: Array<Estudiante>;
  constructor(private estudianteService: Estudiantess) { }
  ngOnInit(): void {
    this.estudianteService.getAllEstudiantes().subscribe({
      next: value => {
        this.estudiantes = value;
      },
      error: err => {
        console.log('Error fetching estudiantes', err);
      }
    })
  }
}
