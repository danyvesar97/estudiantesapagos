package com.lta.sistemapagos.services;

import com.lta.sistemapagos.entities.Estudiante;
import com.lta.sistemapagos.entities.Pago;
import com.lta.sistemapagos.enums.PagoStatus;
import com.lta.sistemapagos.enums.TypePago;
import com.lta.sistemapagos.repositories.EstudianteRepository;
import com.lta.sistemapagos.repositories.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PagoService {
    @Autowired
    private PagoRepository pagoRepository;
    @Autowired
    private EstudianteRepository estudianteRepository;
    /* Guardar un pago con archivo adjunto en la ruta del directorio personal del usuario del SO */
    public Pago savePago(MultipartFile file, double cantidad, TypePago type, LocalDate date, String codigoEstudiante) throws IOException {
        Path folderPath = Paths.get(System.getProperty("user.home"), "enset-data", "pagos");
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString();
        // Crear un path para el archivo PDF que se guardará en enset-data/pagos
        Path filePath = Paths.get(System.getProperty("user.home"), "enset-data", "pagos", fileName + ".pdf");
        // file.getInputStream() obtiene el flujo de datos del archivo subido
        // Files.copy() copia el archivo al path especificado
        Files.copy(file.getInputStream(), filePath);
        Estudiante estudiante = estudianteRepository.findByCodigo(codigoEstudiante);
        Pago pago = Pago.builder()
                .type(type)
                .status(PagoStatus.CREADO)
                .fecha(date)
                .estudiante(estudiante)
                .cantidad(cantidad)
                .file(filePath.toUri().toString())
                .build();
        return pagoRepository.save(pago);
    }

    public byte[] getArchivoPorId(Long pagoId) throws IOException {
        /*
            pago.getFile() devuelve una cadena con el URI del archivo guardado
            URI.create() convierte la cadena en un objeto URI
            Path.of() convierte el URI en un objeto Path
            Files.readAllBytes() lee el contenido del archivo en la ruta especificada y lo devuelve como un array de bytes
         */
        Pago pago = pagoRepository.findById(pagoId).get();
        return Files.readAllBytes(Path.of(URI.create(pago.getFile())));
    }

    public Pago actualizarPagoPorStatus(Long Id, PagoStatus status) {
        Pago pago = pagoRepository.findById(Id).get();
        pago.setStatus(status);
        return pagoRepository.save(pago);
    }
}
