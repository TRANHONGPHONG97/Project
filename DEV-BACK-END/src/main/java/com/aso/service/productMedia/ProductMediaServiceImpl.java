package com.aso.service.productMedia;

import com.aso.model.Product;
import com.aso.model.ProductMedia;
import com.aso.model.dto.ProductMediaDTO;
import com.aso.repository.ProductMediaRepository;
import com.aso.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductMediaServiceImpl implements ProductMediaService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMediaRepository productMediaRepository;

    @Override
    public Optional<ProductMedia> findById(Long id) {
        return productMediaRepository.findById(id);
    }

    @Override
    public Iterable<ProductMedia> findAll() {
        return productMediaRepository.findAll();
    }

    @Override
    public ProductMedia create(ProductMedia productMedia) {
        return productMediaRepository.save(productMedia);
    }

    @Override
    public void delete(ProductMedia productMedia) {
        productMediaRepository.delete(productMedia);
    }

    @Override
    public void save(ProductMedia productMedia) {
        Long id = productRepository.findTopById();
        Optional<Product> product = productRepository.findById(id);
        product.get().setImage(productMedia.getFileUrl());
        productRepository.save(product.get());
        productMedia.setProduct(product.get());
        productMediaRepository.save(productMedia);
    }

    @Override
    public List<ProductMediaDTO> findAllById(Long id) {
        return productMediaRepository.findAllById(id);
    }

    @Override
    public void deleteById(Long id) {
        productMediaRepository.deleteById(id);
    }

    @Override
    public void saveImages(ProductMedia productMedia) {
        productMediaRepository.save(productMedia);
    }


}
