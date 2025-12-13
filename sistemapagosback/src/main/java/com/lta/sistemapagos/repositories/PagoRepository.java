package com.lta.sistemapagos.repositories;

import com.lta.sistemapagos.entities.Pago;
import com.lta.sistemapagos.enums.PagoStatus;
import com.lta.sistemapagos.enums.TypePago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {
    List<Pago> findByCodigoEstudiante(String codigo);
    List<Pago> findByStatus(PagoStatus status);
    List<Pago> findByType(TypePago type);
}
