package com.aso.repository;

import com.aso.model.Status;
import com.aso.model.dto.StatusDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    @Query("SELECT NEW com.aso.model.dto.StatusDTO(" +
            "s.id, " +
            "s.code, " +
            "s.name " +
            ") " +
            "FROM Status AS s  WHERE s.id = ?1 ")
    StatusDTO findStatusDTOById(Long id);
}
