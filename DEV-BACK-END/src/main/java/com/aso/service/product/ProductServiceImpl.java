package com.aso.service.product;


import com.aso.model.Product;
import com.aso.model.dto.ProductDTO;
import com.aso.model.dto.ProductListDTO;
import com.aso.repository.ProductMediaRepository;
import com.aso.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService{
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMediaRepository productMediaRepository;

    @Override
    public List<Product> findAll() {
//        return productRepository.findAll();
        return null;
    }

    @Override
    public List<ProductListDTO> findAllProductListDTO() {
        return productRepository.findAllProductListDTO();
    }

    @Override
    public List<ProductListDTO> findAllProductListDTOModeration() {
        return productRepository.findAllProductListDTOModeration();
    }

    @Override
    public List<ProductDTO> findAllProductsDTO() {
        return productRepository.findAllProductsDTO();
    }

    @Override
    public List<ProductDTO> getProductsDTOModeratedByCreatedBy(String createdBy) {
        return productRepository.getProductsDTOModeratedByCreatedBy ( createdBy );
    }

    @Override
    public List<ProductDTO> findAllProductsDTOAuctions() {
        return productRepository.findAllProductsDTOAuctions ();
    }

    @Override
    public List<ProductDTO> findAllProductsDTOTheShop() {
        return productRepository.findAllProductsDTOTheShop ();
    }

    @Override
    public List<ProductDTO> findAllProductsDTOTrash() {
        return null;
    }

    @Override
    public Boolean existsByTitle(String title) {
        return productRepository.existsByTitle(title);
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public void removeById(Product product) {

    }

    @Override
    public Product getById(Long id) {
        return null;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void delete(Product id) {
        productRepository.deleteById(id);
    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public void softDelete(Product product) {
        product.setDeleted(true);
        productRepository.save(product);
    }

    @Override
    public List<ProductDTO> findAllBySearchTitle(String title) {
        return productRepository.findAllBySearchTitle(title);
    }
//    @Override
//    public Optional<ProductDTO> findProductDTOBySlug(String slug) {
//        return productRepository.findProductDTOBySlug(slug);
//    }

    //@Override
    public List<ProductDTO> findAllBySearchSlug(String slug) {
        return productRepository.findAllBySearchSlug(slug);
    }
    @Override
    public Optional<ProductDTO> findProductDTOBySlug(String slug) {
        return productRepository.findProductDTOBySlug(slug);
    }

    @Override
    public Optional<Product> findBySlug(String slug) {
        return productRepository.findBySlug ( slug );
    }

    @Override
    public Optional<Product> findProductBySlug(String slug) {
        return productRepository.findProductBySlug(slug);
    }

    @Override
    public List<ProductDTO> findAllProductDTOByAvailable(String available) {
        return productRepository.findAllProductDTOByAvailable(available);
    }

    @Override
    public Page<ProductDTO> findAllProducts(Pageable pageable) {
        return productRepository.findAllProducts(pageable);
    }

    @Override
    public Page<ProductDTO> findAllProductss(Pageable pageable, @Param("keyword") String keyword) {
        return productRepository.findAllProductss(pageable, keyword);
    }

    @Override
    public ResponseEntity<Page<ProductDTO>> findAll( Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<>(productRepository.findAllProducts(PageRequest.of(
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending()
                )
        ), HttpStatus.OK);
    }

    @Override
    public List<ProductDTO> isSlug() {
        return productRepository.isSlug();
    }

    @Override
    public List<ProductDTO> findTopProductBySold() {
        return productRepository.findTopProductBySold();
    }
}
