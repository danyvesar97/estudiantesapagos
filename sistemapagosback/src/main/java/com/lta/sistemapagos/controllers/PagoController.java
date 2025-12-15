package com.lta.sistemapagos.controllers;

import com.lta.sistemapagos.entities.Estudiante;
import com.lta.sistemapagos.entities.Pago;
import com.lta.sistemapagos.enums.PagoStatus;
import com.lta.sistemapagos.enums.TypePago;
import com.lta.sistemapagos.repositories.EstudianteRepository;
import com.lta.sistemapagos.repositories.PagoRepository;
import com.lta.sistemapagos.services.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
public class PagoController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private PagoRepository pagoRepository;

    @Autowired
    private PagoService pagoService;

    @GetMapping("/estudiantes")
    public List<Estudiante> listarEstudiantes() {
        return estudianteRepository.findAll();
    }

    @GetMapping("/estudiantes/{codigo}")
    public Estudiante listarEstudiantesPorCodigo(@PathVariable String codigo) {
        return estudianteRepository.findByCodigo(codigo);
    }

    @GetMapping("/estudiantesPorPrograma")
    public List<Estudiante> listarEstudiantesPorPrograma(@RequestParam String programa) {
        return estudianteRepository.findByProgramaId(programa);
    }

    @GetMapping("/pagos")
    public List<Pago> listarPagos() {
        return pagoRepository.findAll();
    }

    @GetMapping("/pagos/{id}")
    public Pago listarPagoPorId(@PathVariable Long id) {
        return pagoRepository.findById(id).get();
    }

    @GetMapping("/estudiantes/{codigo}/pagos")
    public List<Pago> listarPagosPorCodigoEstudiante(@PathVariable String codigo) {
        return pagoRepository.findByEstudianteCodigo(codigo);
    }

    @GetMapping("/pagosPorStatus")
    public List<Pago> listarPagosPorStatus(@RequestParam PagoStatus status) {
        return pagoRepository.findByStatus(status);
    }

    @GetMapping("/pagos/porTipo")
    public List<Pago> listarPagosPorTipo(@RequestParam TypePago type) {
        return pagoRepository.findByType(type);
    }

    @PutMapping("/pagos/{pagoId}/actualizarPago")
    public Pago actualizarStatusDePago(@PathVariable Long pagoId, @RequestParam PagoStatus status) {
        return pagoService.actualizarPagoPorStatus(pagoId, status);
    }

    @PostMapping(path = "/pagos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Pago guardarPago(@RequestParam("file") MultipartFile file, double cantidad, TypePago type, LocalDate date, String codigoEstudiante) throws IOException {
        return pagoService.savePago(file, cantidad, type, date, codigoEstudiante);
    }

    @GetMapping(value = "/pagoFile/{pagoId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] listarArchivoDePagoPorId(@PathVariable Long pagoId) throws IOException {
        return pagoService.getArchivoPorId(pagoId);
    }
}
