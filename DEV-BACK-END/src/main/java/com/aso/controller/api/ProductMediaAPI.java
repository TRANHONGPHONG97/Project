package com.aso.controller.api;


import com.aso.model.dto.ProductMediaDTO;
import com.aso.service.productMedia.ProductMediaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/productmedia")
public class ProductMediaAPI {
    @Autowired
    private ProductMediaServiceImpl productMediaService;

    @GetMapping("/{productId}")
    public ResponseEntity<?> doMedia(@PathVariable Long productId) {
        List<ProductMediaDTO> productMediaDTO = productMediaService.findAllById(productId);
        return new ResponseEntity<>(productMediaDTO, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<?> doCreate(@RequestBody ProductMediaDTO productMediaDTO) {
        productMediaDTO.setTs(new Date().getTime());
        productMediaService.save(productMediaDTO.toProductMedia());
        return new ResponseEntity<>(productMediaDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> doDelete(@PathVariable Long id) {
        productMediaService.deleteById(id);
        return new ResponseEntity<>("Đã xóa thành công!", HttpStatus.OK);
    }
}
