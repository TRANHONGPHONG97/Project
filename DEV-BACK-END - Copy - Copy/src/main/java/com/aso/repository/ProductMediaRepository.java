package com.aso.repository;

import com.aso.model.ProductMedia;
import com.aso.model.dto.ProductMediaDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductMediaRepository extends JpaRepository<ProductMedia, Long>  {

    @Query("SELECT NEW com.aso.model.dto.ProductMediaDTO(" +
            "pm.id," +
            "pm.fileUrl " +
            ") FROM ProductMedia AS pm WHERE pm.product.id = ?1")
    List<ProductMediaDTO> findAllById(Long id);

//    @Query("DELETE FROM ProductMedia WHERE id = ?1")
//    Optional<ProductMediaDTO> dele(Long id);
}
