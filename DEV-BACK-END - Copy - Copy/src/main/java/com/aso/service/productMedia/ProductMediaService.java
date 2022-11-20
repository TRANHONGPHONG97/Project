package com.aso.service.productMedia;

import com.aso.model.ProductMedia;
import com.aso.model.dto.ProductMediaDTO;

import java.util.List;
import java.util.Optional;

public interface ProductMediaService {
    Optional<ProductMedia> findById(Long id);

    Iterable<ProductMedia> findAll();

    ProductMedia create(ProductMedia productMedia);

    void delete(ProductMedia productMedia);

    void save(ProductMedia productMedia);

    List<ProductMediaDTO> findAllById(Long id);

    void deleteById(Long id);

    void saveImages(ProductMedia productMedia);
}
