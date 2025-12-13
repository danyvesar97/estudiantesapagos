package com.lta.sistemapagos.dtos;

import com.lta.sistemapagos.enums.TypePago;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewPagoDto {
    private double cantidad;
    private TypePago type;
    private LocalDate date;
    private String codigoEstudiante;
}
