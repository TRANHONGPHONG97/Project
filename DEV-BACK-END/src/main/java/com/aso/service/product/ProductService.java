package com.aso.service.product;


import com.aso.model.Product;
import com.aso.model.dto.ProductDTO;
import com.aso.model.dto.ProductListDTO;
import com.aso.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface ProductService extends IGeneralService<Product> {

    List<ProductListDTO> findAllProductListDTO();
    List<ProductListDTO> findAllProductListDTOModeration();

    List<ProductDTO> findAllProductsDTO();

    List<ProductDTO> getProductsDTOModeratedByCreatedBy(String createdBy);

    List<ProductDTO> findAllProductsDTOAuctions();

    List<ProductDTO> findAllProductsDTOTheShop();
    List<ProductDTO> findAllProductsDTOTrash();

    Boolean existsByTitle(String title);

    void softDelete(Product product);
    List<ProductDTO> findAllBySearchTitle(String title);

    List<ProductDTO> findAllBySearchSlug(String slug);

    Optional<ProductDTO> findProductDTOBySlug (String slug);

    Optional<Product> findBySlug(String slug);


    Optional<Product> findProductBySlug(String slug);
    List<ProductDTO> findAllProductDTOByAvailable(String available);

    Page<ProductDTO> findAllProducts(Pageable pageable);
    Page<ProductDTO> findAllProductss(Pageable pageable, @Param("keyword") String keyword);
    ResponseEntity<Page<ProductDTO>> findAll(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
    List<ProductDTO> isSlug();
    List<ProductDTO> findTopProductBySold();
}
